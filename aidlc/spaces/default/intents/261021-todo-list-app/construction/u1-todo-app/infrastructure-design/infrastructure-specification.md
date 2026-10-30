# Infrastructure Specification — u1-todo-app

## Sources

- [logical-components](../nfr-design/logical-components.md)
- [performance-design](../nfr-design/performance-design.md)
- [security-design](../nfr-design/security-design.md)
- [functional-spec](../functional-design/functional-spec.md)

---

## Deployment

| Facet | Choice | Rationale |
|---|---|---|
| Compute model | None — static browser app | No server; runs from local filesystem. No hosting, no container, no serverless function. |
| Networking topology | None — local file delivery | Opened via `file://` or a local dev server. No ingress, no egress, no VPC. |
| Storage strategy | Browser localStorage (built-in) | Single-user persistence via the browser's native key-value store. No cloud storage. |
| Environments | Local only — no dev/staging/prod | team.md: "No deployment. This is a learning project; we run it locally." |
| IaC approach | None | No cloud resources to provision. |
| Resource sizing | N/A | Browser-local; bounded by the user's device. |

---

## Infrastructure Services

| Service | Role | Configuration | Notes |
|---|---|---|---|
| localStorage | Persistence | Browser-native; key "tasks"; ~15 KB typical payload | Only infrastructure component. Failure handled by in-memory fallback in StorageLayer. |

No databases, caches, queues, CDN, DNS, or load balancers are required. The app is fully self-contained in the browser.

---

## Shared Infrastructure

Not applicable — single unit, single deployment target (the browser), no shared cloud resources.

---

## Assumptions & Open Questions

None. Infrastructure scope is minimal by design (C1: no backend or server; team.md: no deployment).
