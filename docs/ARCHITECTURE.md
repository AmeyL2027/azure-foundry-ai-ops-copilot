# Architecture and trust boundaries

React dashboard → Express API → deterministic incident investigator or optional Azure OpenAI-compatible model. Synthetic incident and runbook fixtures are kept in code. The API exposes read-only inspection and analysis routes; remediation endpoints return 403. Never use real credentials in client code. Current version has no authentication, persistence, RAG or real cloud actions. Planned work: Entra ID, scoped retrieval, Claude Messages API adapter, approval-gated simulated actions, audit logs, telemetry and Azure deployment.
