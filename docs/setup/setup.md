# Setup

To keep the docs short and concise, the docs will use example names and identifiers. It is up to you to replace all examples accordingly when setting up this project for yourself.

## 01. Domain name

cost: `depends on the domain`

Sign up for a [**NameCheap**](https://www.namecheap.com/) account if you do not already have one and acquire an "internal" domain name from the site.

```
erogen.host // e.g. if your public domain name is "erogen.com"
```

_Domains like `.host`, `.systems`, `.admin` are typically cheap (around 9-15\$ a year) and are suitable for use as an internal-facing domain name._

## 02. Email-forwarding

cost: `free`

Setup a "catch-all" email-forwarding rule on your internal domain name from step 1 to a single email address. See instructions [here](https://www.namecheap.com/support/knowledgebase/article.aspx/308/2214/how-to-set-up-free-email-forwarding).

_Organize the target email address's inbox accordingly, esp. if it's your personal one. Most modern email clients have "smart folder" features, use them to redirect/organize emails redirected from those addresses._

## 03. AWS parent account

cost: `free`

Currently AWS is the primary cloud service provider for this project. Sign up for an account using `cloudadmin.master@erogen.host`. This account will be the billing account.

Complete the signup flow and save your login credentials with [**Bitwarden**](https://bitwarden.com/) or your password manager of choice. Do the same with the other member accounts listed in step 5.

## 04. AWS organization units

cost: `free`

Set up an [**AWS Organization**](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_introduction.html) via the AWS console, with the following OU tree structure:

```
Root
  \
   \__ Operations
         \
          \__ Environments
```

The master account should reside in the root OU.

## 05. AWS member accounts

cost: `free`

Sign up for the remaining AWS member accounts with the following preference:

| Name                | Email                             | OU           |
| ------------------- | --------------------------------- | ------------ |
| **erogen-bastion**  | `cloudadmin.bastion@erogen.host`  | Operations   |
| **erogen-audit**    | `cloudadmin.audit@erogen.host`    | Operations   |
| **erogen-delivery** | `cloudadmin.delivery@erogen.host` | Operations   |
| **erogen-dev**      | `cloudadmin.dev@erogen.host`      | Environments |
| **erogen-test**     | `cloudadmin.test@erogen.host`     | Environments |
| **erogen-stage**    | `cloudadmin.stage@erogen.host`    | Environments |
| **erogen-prod**     | `cloudadmin.prod@erogen.host`     | Environments |


**Important Note**: Create the member accounts from the master account's AWS console (under the Organizations section), as opposed to creating them as standalone AWS accounts.

**Other Notes**:
* Enter the account name in "full name*" field prompt, not your personal name.
* Leave the role name as the default, i.e. `OrganizationAccountAccessRole`.

For each of the account you've created, login to the newly-created account from a different browser (or in private/incognito mode) with the designated email and complete the [**"forgot-password" account activation flow**](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_accounts_access.html#orgs_manage_accounts_access-as-root). Leave the master account logged in on your main browser/session.

*It is likely AWS would've imposed an initial limit on the amount of AWS member accounts you can create to 1. If so, open a support case to increase the limit. It'll typically take 1-2 working days for it to take effect.*

## 06. Resource provisioning

cost: `free`

The hard, tedious part is over. 80% of the remaining setup steps will be automatable...

**WORK IN PROGRESS**
