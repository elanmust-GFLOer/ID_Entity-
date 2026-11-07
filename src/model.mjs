/** Synthetic references only: neither authenticated identities nor credentials. */
export const SCHEMA = "id-entity.lab.v0.1";
const idPattern = /^urn:id-entity:lab:[a-z0-9][a-z0-9-]{0,63}$/;
export const isId = v => typeof v === "string" && idPattern.test(v);
const epoch = v => Number.isSafeInteger(v) && v > 0;
const exact = (v, fields) => v !== null && typeof v === "object" && !Array.isArray(v) &&
  Object.keys(v).length === fields.length && fields.every(k => Object.hasOwn(v, k));
export function time(v) {
  if (typeof v !== "string" || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(v)) return null;
  const n = Date.parse(v);
  return Number.isFinite(n) && new Date(n).toISOString() === v ? n : null;
}
export function validEntity(v) {
  return exact(v, ["schema","id","kind","status","controlEpoch","controllerId"]) &&
    v.schema === SCHEMA && isId(v.id) &&
    ["person","organization","agent","service"].includes(v.kind) &&
    ["active","suspended"].includes(v.status) && epoch(v.controlEpoch) &&
    (v.kind === "agent" ? isId(v.controllerId) && v.controllerId !== v.id : v.controllerId === null);
}
const resource = v => typeof v === "string" && /^fixture:public-document:[a-z0-9-]{1,64}$/.test(v);
export function validGrant(v) {
  if (!exact(v, ["schema","id","issuerId","delegateId","issuerEpoch","delegateEpoch",
    "taskId","action","resource","issuedAt","expiresAt","revokedAt"])) return false;
  const start = time(v.issuedAt), end = time(v.expiresAt), revoked = time(v.revokedAt);
  return v.schema === SCHEMA && [v.id,v.issuerId,v.delegateId,v.taskId].every(isId) &&
    epoch(v.issuerEpoch) && epoch(v.delegateEpoch) && v.action === "document.summarize" &&
    resource(v.resource) && start !== null && end !== null && end > start &&
    end - start <= 3600000 &&
    (v.revokedAt === null || (revoked !== null && revoked >= start));
}
export function validRequest(v) {
  return exact(v, ["schema","delegateId","taskId","action","resource"]) &&
    v.schema === SCHEMA && isId(v.delegateId) && isId(v.taskId) &&
    v.action === "document.summarize" && resource(v.resource);
}
export function validEvidence(v) {
  return exact(v, ["schema","id","taskId","producerId","evidenceRef","observedAt",
    "claim","provenance","verification","authority"]) &&
    v.schema === SCHEMA && [v.id,v.taskId,v.producerId].every(isId) &&
    typeof v.evidenceRef === "string" && /^fixture:evidence:[a-z0-9-]{1,64}$/.test(v.evidenceRef) &&
    time(v.observedAt) !== null && v.claim === "summary-produced-in-fixture" &&
    v.provenance === "synthetic" && v.verification === "unverified" && v.authority === false;
}
