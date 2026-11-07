import { time, validEntity, validGrant, validRequest } from "./model.mjs";
const deny = reason => Object.freeze({ decision: "DENY", reason, authority: false });

/**
 * Pure, stateless fixture evaluation. Caller supplies ALL state and clock.
 * NEVER use the result as a credential, tool gate, signer approval or XP proof.
 * One hop; exact task/action/resource; no replay protection or authentication.
 */
export function evaluateDelegation(input) {
  if (!input || typeof input !== "object" || Array.isArray(input)) return deny("invalid-input");
  const { entities, grant, request, now } = input;
  const instant = time(now);
  if (instant === null) return deny("invalid-clock");
  if (!Array.isArray(entities) || !entities.every(validEntity)) return deny("invalid-entities");
  if (new Set(entities.map(e => e.id)).size !== entities.length) return deny("duplicate-entity-id");
  if (!validGrant(grant)) return deny("invalid-grant");
  if (!validRequest(request)) return deny("invalid-request");
  const issuer = entities.find(e => e.id === grant.issuerId);
  const agent = entities.find(e => e.id === grant.delegateId);
  if (!issuer || !agent) return deny("unknown-entity");
  if (!["person","organization"].includes(issuer.kind) || agent.kind !== "agent") return deny("unsupported-role");
  if (issuer.status !== "active" || agent.status !== "active") return deny("inactive-entity");
  if (agent.controllerId !== issuer.id) return deny("controller-mismatch");
  if (issuer.controlEpoch !== grant.issuerEpoch || agent.controlEpoch !== grant.delegateEpoch)
    return deny("stale-control-epoch");
  // Even a future revokedAt in caller-supplied state is conservatively denied.
  if (grant.revokedAt !== null) return deny("revoked-grant");
  if (instant < time(grant.issuedAt)) return deny("grant-not-yet-valid");
  if (instant >= time(grant.expiresAt)) return deny("expired-grant");
  if (request.delegateId !== agent.id) return deny("delegate-mismatch");
  if (request.taskId !== grant.taskId) return deny("task-mismatch");
  if (request.action !== grant.action || request.resource !== grant.resource) return deny("scope-mismatch");
  return Object.freeze({ decision: "ALLOW_SIMULATION", reason: "exact-fixture-match", authority: false });
}
