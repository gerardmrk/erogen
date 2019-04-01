# Erogen

**Work In Progress.**

This is a fake organization created as an excuse to experiment with automation and stuff.

See [setup instructions](docs/setup/setup.md) for details.

## Cloud Layout

```
├── Master
│
└── [Operations]
    │
    ├── IAM Services
    ├── Audit Services
    ├── Delivery Services
    │
    └── [Environments]
        │
        ├── [Development Cluster]
        │   │
        │   └── Sandbox Runtime
        │
        ├── [Test Cluster]
        │   │
        │   ├── E2E Runtime
        │   └── SIT Runtime
        │
        ├── [Staging Cluster]
        │   │
        │   ├── Perf Runtime
        │   └── UAT Runtime
        │
        └── [Production Cluster]
            │
            └── Live Runtime
```
