import { SCHEMA } from "../src/model.mjs";
export const now = "2026-11-07T12:05:00.000Z";
export const entities = [
  { schema: SCHEMA, id: "urn:id-entity:lab:person-001", kind: "person",
    status: "active", controlEpoch: 1, controllerId: null },
  { schema: SCHEMA, id: "urn:id-entity:lab:agent-001", kind: "agent",
    status: "active", controlEpoch: 1, controllerId: "urn:id-entity:lab:person-001" }
];
export const grant = {
  schema: SCHEMA, id: "urn:id-entity:lab:grant-001",
  issuerId: entities[0].id, delegateId: entities[1].id, issuerEpoch: 1, delegateEpoch: 1,
  taskId: "urn:id-entity:lab:task-001", action: "document.summarize",
  resource: "fixture:public-document:001", issuedAt: "2026-11-07T12:00:00.000Z",
  expiresAt: "2026-11-07T12:30:00.000Z", revokedAt: null
};
export const request = {
  schema: SCHEMA, delegateId: entities[1].id, taskId: grant.taskId,
  action: grant.action, resource: grant.resource
};
export const evidence = {
  schema: SCHEMA, id: "urn:id-entity:lab:evidence-001", taskId: grant.taskId,
  producerId: entities[1].id, evidenceRef: "fixture:evidence:summary-001",
  observedAt: now, claim: "summary-produced-in-fixture",
  provenance: "synthetic", verification: "unverified", authority: false
};
