# Erogen

**Work In Progress.**

See [**setup instructions**](docs/setup/setup.md) for details.

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

## Description (fluff)

Like most normal people, I create fake organizations during my spare time to play around with the Hashicorp Stack and numerous other tools in the ecosystem.

They're a drag to setup because of the amount of manual steps involved in coordinating multiple PaaS, SaaS, and IaaS resources, as well as other structures and tools before I have a fully complete, production-like compute cluster, service mesh, service + user IAM, CI pipeline, seamless SCM and VCS, and a proper local dev environment.

I'm inherently unable to start and work with the bare minimum because I'm stupid (cos I can't Keep It Simple, Stupid) and always over-engineer. By the time I'm ready to get my feet wet it's already Sunday evening.

Tearing down the resources each time after the fun's over is just as tedious as the setup process, and I tend to have leftover local and remote resources due to forgetfulness (and laziness). The clutter builds up and it becomes frustrating.

Not anymore, getting down to business to automate this once and for all, from start to end, from setup to teardown, where I can afford to. This repo will serve as a base boilerplate for any of my future fake fortune 500s, with the goal of clicking and typing as few things as possible to create a multi-tenanted multi-cloud multi-region highly-available highly-scalable distributed microservices architecture with a vendor-agnostic stack that isn't Kubernetes.

This is primarily for personal use, but feel free to take a look if you feel like throwing away your weekends too. This project will reach a "usable" state, but never a "complete" state; I will continue to over-engineer and micro-optimize this code till I die (or get a new girlfriend). I may even recreate the repo if I feel the project structure is wrong.

## Disclaimer

To future potential employers or headhunters stalking my account:

Despite best efforts, my commit messages in any given repo will start to degrade overtime, and eventually devolve into single-character messages like "x". This isn't a reflection of my work ethics and dev practices in a professional working environment; I write commit messages with 2 or more characters when working in a team.
