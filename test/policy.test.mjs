import test from "node:test";
import assert from "node:assert/strict";
import { evaluateDelegation } from "../src/policy.mjs";
import { time, validEntity, validGrant, validEvidence } from "../src/model.mjs";
import * as fixture from "../examples/fixtures.mjs";
const fresh = () => structuredClone({
  entities: fixture.entities, grant: fixture.grant, request: fixture.request, now: fixture.now
});
test("matching fixture has no authority", () => {
  assert.deepEqual(evaluateDelegation(fresh()), {
    decision: "ALLOW_SIMULATION", reason: "exact-fixture-match", authority: false
  });
});
for (const [name, change, reason] of [
  ["expiry boundary", s => { s.now = s.grant.expiresAt; }, "expired-grant"],
  ["future grant", s => { s.now = "2026-11-07T11:59:59.999Z"; }, "grant-not-yet-valid"],
  ["revocation", s => { s.grant.revokedAt = "2026-11-07T12:04:00.000Z"; }, "revoked-grant"],
  ["future revocation", s => { s.grant.revokedAt = "2026-11-07T12:20:00.000Z"; }, "revoked-grant"],
  ["controller changed", s => { s.entities[1].controllerId = "urn:id-entity:lab:person-002"; }, "controller-mismatch"],
  ["delegate epoch changed", s => { s.entities[1].controlEpoch = 2; }, "stale-control-epoch"],
  ["issuer epoch changed", s => { s.entities[0].controlEpoch = 2; }, "stale-control-epoch"],
  ["agent suspended", s => { s.entities[1].status = "suspended"; }, "inactive-entity"],
  ["issuer suspended", s => { s.entities[0].status = "suspended"; }, "inactive-entity"],
  ["unknown issuer", s => { s.grant.issuerId = "urn:id-entity:lab:unknown"; }, "unknown-entity"],
  ["unknown delegate", s => { s.grant.delegateId = "urn:id-entity:lab:unknown"; }, "unknown-entity"],
  ["duplicate id", s => { s.entities.push({ ...s.entities[0] }); }, "duplicate-entity-id"],
  ["agent subdelegation", s => { s.grant.issuerId = s.entities[1].id; }, "unsupported-role"],
  ["service delegate", s => { s.entities[1].kind = "service"; s.entities[1].controllerId = null; }, "unsupported-role"],
  ["wrong delegate", s => { s.request.delegateId = "urn:id-entity:lab:agent-002"; }, "delegate-mismatch"],
  ["wrong task", s => { s.request.taskId = "urn:id-entity:lab:task-002"; }, "task-mismatch"],
  ["wrong resource", s => { s.request.resource = "fixture:public-document:002"; }, "scope-mismatch"],
  ["wallet signing", s => { s.request.action = "wallet.sign"; }, "invalid-request"],
  ["wildcard scope", s => { s.grant.resource = "*"; }, "invalid-grant"],
  ["unknown grant field", s => { s.grant.admin = true; }, "invalid-grant"],
  ["unknown request field", s => { s.request.admin = true; }, "invalid-request"],
  ["unknown entity field", s => { s.entities[1].trusted = true; }, "invalid-entities"],
  ["zero epoch", s => { s.grant.delegateEpoch = 0; }, "invalid-grant"],
  ["missing revoke state", s => { delete s.grant.revokedAt; }, "invalid-grant"],
  ["excessive lab TTL", s => { s.grant.expiresAt = "2026-11-07T13:00:00.001Z"; }, "invalid-grant"],
  ["empty validity", s => { s.grant.expiresAt = s.grant.issuedAt; }, "invalid-grant"],
  ["noncanonical UTC", s => { s.now = "2026-11-07T12:05:00+00:00"; }, "invalid-clock"],
  ["malformed entities", s => { s.entities = null; }, "invalid-entities"],
  ["null grant", s => { s.grant = null; }, "invalid-grant"]
]) test(name, () => {
  const s = fresh(); change(s);
  assert.deepEqual(evaluateDelegation(s), { decision: "DENY", reason, authority: false });
});
test("missing/malformed outer input is denied", () => {
  for (const v of [undefined, null, [], "text", 1]) assert.equal(evaluateDelegation(v).decision, "DENY");
});
test("inclusive start and last millisecond", () => {
  for (const now of [fixture.grant.issuedAt, "2026-11-07T12:29:59.999Z"])
    assert.equal(evaluateDelegation({ ...fresh(), now }).decision, "ALLOW_SIMULATION");
});
test("organization principal is supported", () => {
  const s = fresh(); s.entities[0].kind = "organization";
  assert.equal(evaluateDelegation(s).decision, "ALLOW_SIMULATION");
});
test("invalid calendar dates and types are rejected", () => {
  for (const v of ["2026-02-30T12:00:00.000Z", "", null, {}, 0, "2026-11-07"])
    assert.equal(time(v), null);
});
test("malformed and self-controlled entities are rejected", () => {
  for (const v of [null, [], {}, { ...fixture.entities[0], id: "email@example.test" },
    { ...fixture.entities[1], controllerId: fixture.entities[1].id }])
    assert.equal(validEntity(v), false);
});
test("malformed grant times and epochs are rejected", () => {
  for (const patch of [{ revokedAt: "bad" }, { revokedAt: "2026-11-07T11:00:00.000Z" },
    { issuedAt: "bad" }, { issuerEpoch: NaN }, { delegateEpoch: 1.5 }])
    assert.equal(validGrant({ ...fixture.grant, ...patch }), false);
});
test("evidence remains unverified synthetic non-authority", () => {
  assert.equal(validEvidence(fixture.evidence), true);
  for (const patch of [{ authority: true }, { verification: "verified" },
    { provenance: "independent" }, { evidenceRef: "https://example.test/private" },
    { claim: "real-work-proven" }, { signature: "invented" }])
    assert.equal(validEvidence({ ...fixture.evidence, ...patch }), false);
});
test("no caller mutation and no replay-prevention claim", () => {
  const s = fresh(), original = structuredClone(s);
  assert.deepEqual(evaluateDelegation(s), evaluateDelegation(s));
  assert.deepEqual(s, original);
});
