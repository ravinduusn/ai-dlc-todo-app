# Unit of Work — Dependency DAG

## Sources

- [components](../domain-design/components.md)
- [requirements](../requirements-analysis/requirements.md)

---

## Dependency Graph

With a single unit, the dependency graph is trivially a single node with no edges.

```
[U1: u1-todo-app]
```

<!-- Text fallback: One unit node with no dependencies. U1 (Todo App) has no upstream unit dependencies. -->

**Parallel development opportunities:** None applicable (single unit, single developer).

**Integration points:** All three components (StorageLayer, TaskDomain, UILayer) integrate within U1. There are no inter-unit integration contracts.

---

## Machine-Readable Edge Block

```yaml
units:
  - name: u1-todo-app
    kind: ui
    depends_on: []
```

---

## Notes

This is a single-unit topology (Q1: C — one build pass). The component-level
dependency ordering within the unit (StorageLayer → TaskDomain → UILayer) is
an **intra-unit implementation sequence**, not a unit DAG edge. Delivery
Planning (stage 2.9) will sequence the single Bolt for this unit; with only
one unit, the sequence is determined by the intra-unit implementation order
noted in `unit-of-work.md`.

## Assumptions & Open Questions

- [assumption] A single unit is correct for this solo learning project with no team parallelism requirement. [Q1: C, team-practices]
- [assumption] No skeleton-on applies (team.md: Walking Skeleton: No). The single unit is built in full. [team-practices]
