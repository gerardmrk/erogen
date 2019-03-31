# Erogen

**Work In Progress.**

This is a fake organization created as an excuse to play around with tools in my free time that can help satiate my unhealthy obsession with control and automation.

## Cloud Layout

```
├── Bastion Service
│
├── Environments
│   │
│   ├── Development Cluster
│   │   └── Sandbox Runtime
│   │
│   ├── Test Cluster
│   │   ├── E2E Runtime
│   │   └── SIT Runtime
│   │
│   ├── Staging Cluster
│   │   ├── Perf Runtime
│   │   └── UAT Runtime
│   │
│   └── Production Cluster
│       ├── Live Runtime
│       └── Standby
│
└── Operations
    │
    ├── Audit Services
    │
    ├── Delivery Services
    │
    └── IAM Services
```
