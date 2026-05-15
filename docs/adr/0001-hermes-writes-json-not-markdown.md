# Hermes writes JSON at canonical paths; dashboard never parses Markdown

The dashboard data layer reads structured data from the safety GitHub repo via the GitHub Contents API. Hermes was initially writing Markdown tables (`action-items/action-items.md`, `worker-registry/worker-registry.md`, etc.) but the dashboard was designed to parse JSON. Rather than build a Markdown table parser into the dashboard, we updated Hermes to write canonical JSON files at fixed paths. The dashboard's `getRepoFile(path)` utility does a single `JSON.parse()` — no format negotiation, no Markdown dependency.

## Considered Options

**Parse Markdown in the dashboard** — Hermes keeps writing `.md` files; the dashboard scrapes the tables. Rejected: Markdown table parsing is brittle, Hermes's table schema could change silently, and it creates a hidden coupling between the dashboard and Hermes's prose format.

**Seed JSON manually** — Keep Hermes writing Markdown but manually place JSON files in the repo for demo day. Rejected: live Hermes data would be ignored, creating two sources of truth.

## Canonical file paths Hermes must write

| File | Content |
|---|---|
| `hazard-register.json` | Array of hazard records (see schema below) |
| `training-matrix.json` | Array of worker + certification records |
| `action-items.json` | Array of action item records |
| `workers.json` | Array of worker records |
| `sops/[slug].md` | SOP documents (Markdown — read as raw text) |
| `weekly-summaries/[YYYY-WW].md` | Weekly summary files (Markdown — read as raw text) |

## JSON schemas

### hazard-register.json
```json
[
  {
    "id": "HZ-001",
    "description": "string",
    "severity": "high" | "medium" | "low",
    "status": "open" | "closed",
    "location": "string",
    "date": "YYYY-MM-DD",
    "controls": ["string"],
    "actionItems": ["ACT-001"]
  }
]
```

### training-matrix.json
```json
[
  {
    "workerId": "string",
    "workerName": "string",
    "certifications": [
      {
        "name": "string",
        "expiryDate": "YYYY-MM-DD" | null,
        "status": "current" | "expiring" | "expired" | "not-held"
      }
    ]
  }
]
```

### action-items.json
```json
[
  {
    "id": "ACT-001",
    "source": "HZ-001",
    "description": "string",
    "priority": "high" | "medium" | "low",
    "status": "open" | "closed",
    "dueDate": "YYYY-MM-DD",
    "assignedTo": "string",
    "createdDate": "YYYY-MM-DD"
  }
]
```

### workers.json
```json
[
  {
    "id": "string",
    "name": "string",
    "role": "string",
    "status": "active" | "inactive",
    "startDate": "YYYY-MM-DD"
  }
]
```

## Consequences

The dashboard cannot display live Hermes data until Hermes is updated to write JSON at these paths. Until then, demo seed files at these exact paths must be placed in the repo manually.
