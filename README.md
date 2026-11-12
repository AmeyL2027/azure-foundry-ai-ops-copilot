# OpsPilot — Azure Foundry AI Operations Copilot

A portfolio-grade **work-in-progress** for incident investigation, evidence gathering and approval-gated remediation design. Built with React + TypeScript and Node.js + Express.

> **Status:** Milestone 1 starter implementation. The UI, API, synthetic incidents, deterministic investigation engine, tests, and optional Azure OpenAI-compatible model adapter are implemented. Claude integration, real RAG, Entra ID, database persistence, human approvals and cloud deployment are planned—not implemented.

## Features

- Browse three synthetic incidents: VM provisioning timeout, HTTP 429 spike, JWT expiration.
- Inspect incident logs, signals and runbook matches.
- Run deterministic evidence-backed investigations locally without cloud credentials.
- Optionally call an Azure OpenAI-compatible Foundry deployment for structured investigation.
- Remediation is disabled (`403`); no production actions.
- Validate investigation output using Zod and run unit tests.

## Quick start

Requires Node.js 20+.

```bash
npm install
cp server/.env.example server/.env
npm run dev -w server
# In another terminal:
npm run dev -w web
```

Open http://localhost:5173. API health check: http://localhost:4000/api/health.

```bash
npm test
npm run build
```

## Optional Foundry integration

The current adapter uses Azure OpenAI chat completions, **not Claude Messages API**. Configure `server/.env`:

```dotenv
MODEL_PROVIDER=azure-openai
AZURE_OPENAI_ENDPOINT=https://YOUR-RESOURCE.openai.azure.com
AZURE_OPENAI_DEPLOYMENT=YOUR-DEPLOYMENT
AZURE_OPENAI_API_VERSION=2024-10-21
AZURE_OPENAI_API_KEY=YOUR-SECRET
```

Use a compatible deployment. Never commit secrets.

## API

| Method | Path | Description |
|---|---|---|
| GET | `/api/health` | Status and provider |
| GET | `/api/incidents` | Incident list |
| GET | `/api/incidents/:id` | Incident and synthetic logs |
| GET | `/api/runbooks` | Synthetic runbooks |
| POST | `/api/incidents/:id/investigate` | Structured diagnosis |
| POST | `/api/incidents/:id/actions/:action` | Always blocked (403) |

## Safety and reliability

- Synthetic data only; no authentication, persistent audit trail or real remediation.
- Model requests have 12-second timeouts and bounded 429/503 retries.
- Provider errors are sanitized; model output is schema-checked but may still be incorrect.
- This is an educational demonstration, not a production-ready system.

## Roadmap

- [x] React dashboard, Node.js API, synthetic incidents and runbooks
- [x] Deterministic investigation and optional Azure OpenAI-compatible adapter
- [x] Initial tests and GitHub Actions workflow
- [ ] Claude through Microsoft Foundry
- [ ] Azure AI Search RAG and citations
- [ ] Entra ID, RBAC and Key Vault
- [ ] Approval workflow and audited remediation simulator
- [ ] Application Insights and Azure deployment

See [architecture](docs/ARCHITECTURE.md). MIT license.