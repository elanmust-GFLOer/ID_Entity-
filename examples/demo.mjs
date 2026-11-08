import { evaluateDelegation } from "../src/policy.mjs";
import { validEvidence } from "../src/model.mjs";
import { entities, grant, request, evidence, now } from "./fixtures.mjs";
const state = { entities, grant, request, now };
console.log(JSON.stringify({
  mode: "OFFLINE_SYNTHETIC_LAB",
  match: evaluateDelegation(state),
  expired: evaluateDelegation({ ...state, now: grant.expiresAt }),
  revoked: evaluateDelegation({ ...state,
    grant: { ...grant, revokedAt: "2026-11-07T12:04:00.000Z" } }),
  controlChanged: evaluateDelegation({ ...state,
    entities: [entities[0], { ...entities[1], controlEpoch: 2 }] }),
  evidence: { structurallyValid: validEvidence(evidence), record: evidence },
  warning: "No authenticated identity, actual execution, signature, XP or tool authority."
}, null, 2));
