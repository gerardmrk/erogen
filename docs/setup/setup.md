# Setup

For brevity and simplicity, the docs will use example names and identifiers.

Replace all examples according to your own preferences.

## 01. Domain name

cost: `depends on the domain`

Acquire an internal domain name from **NameCheap**:

```
erogen.host // e.g. if your public domain name is "erogen.com"
```

_"Internal" domains like `.host`, `.systems`, `.admin` are typically cheap (around 9-15\$ a year)._

## 02. Email-forwarding

cost: `free for NameCheap`

Setup a "catch-all" email-forwarding rule on your internal domain name from step 1 to a single email address. See instructions [here](https://www.namecheap.com/support/knowledgebase/article.aspx/308/2214/how-to-set-up-free-email-forwarding).

_Organize the target email address's inbox accordingly, esp. if it's your personal one. Most modern email clients have "smart folder" features, use them to redirect/organize emails redirected from those addresses._

## 03. AWS bastion account

cost: `free`

Currently AWS is the primary cloud service provider for this project. Sign up for an account using `cloudadmin.bastion.host`. This will be the bastion account.

## 04. AWS Organization

cost: `free`

Set up an AWS organization via the AWS console.

- Email addresses for Cloud Service Provider accounts:
  - **Operations** accounts:
    - bastion: `cloudadmin.bastion@erogen.host`
    - iam: `cloudadmin.iam@erogen.host`
    - audit: `cloudadmin.audit@erogen.host`
    - delivery: `cloudadmin.delivery@erogen.host`
  - **Environment** accounts:
    - development: `cloudadmin.dev@erogen.host`
    - test: `cloudadmin.test@erogen.host`
    - staging: `cloudadmin.stage@erogen.host`
    - production: `cloudadmin.production@erogen.host`
- CSP accounts:
  - bastion: `erogen-bastion`
  - iam

## 03. CSP Accounts

## Prerequisites

- An internal domain name. E.G. if your public domain name is `erogen.com`, `erogen.host` would be a suitable internal domain name.
- Email addresses linked to your internal domain name.
