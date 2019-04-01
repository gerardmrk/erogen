variable "name" {
  type = "string"

  description = <<EOF
  Name of the project/product/solution/organization. This will be used for
  resource-tagging where applicable, and also for resource name prefixing. Use
  an abbreviation instead if the name is too long, as Cloud Providers impose a
  character limit on certain resource names.
EOF
}

variable "aws_region" {
  type = "string"

  description = <<EOF
Default AWS region code for the root (bastion) account.

All AWS resources declared in 'global' will be deployed to this region where
the resource is region-specific. Be wary of cost differences per region.
EOF
}

variable "aws_access_key" {
  type = "string"

  description = <<EOF
  AWS access key ID for the root (bastion) account.

  The owner of these credentials must have permission to assume the roles
  specified in `var.environments`.
EOF
}

variable "aws_secret_key" {
  type = "string"

  description = <<EOF
  AWS secret access key for the root (bastion) account.

  The owner of these credentials must have permission to assume the roles
  specified in `var.environments`.
EOF
}

variable "gitlab_access_token" {
  type = "string"

  description = <<EOF
GitLab access token. The token must have the necessary permissions to:
- create a GitLab Group.
- create a GitLab Group Project.
- create multiple GitLab Users.
EOF
}

variable "ops_conf" {
  type = "map" # TODO: [v0.12 upgrade] able to specify stricter type.

  description = <<EOF
A map of objects in the format:
  |  {
  |     iam = { aws_role_arn, aws_region }
  |     audit = { aws_role_arn, aws_region }
  |     delivery = { aws_role_arn, aws_region }
  |  }

These are AWS accounts with dev operations responsibilities. While the business
enviroments and runtimes can be fluid, the ops accounts are fixed; the specified
accounts must exists.
EOF
}

variable "envs_conf" {
  type = "map" # TODO: [v0.12 upgrade] able to specify stricter type.

  description = <<EOF
A map of objects in the format:
  |  {
  |     dev = { aws_role_arn, aws_region }
  |     test = { aws_role_arn, aws_region }
  |     stage = { aws_role_arn, aws_region }
  |     prod = { aws_role_arn, aws_region }
  |  }

Environments are represented as individual AWS Accounts, each 
containing a main compute cluster, whereas runtimes are groups of services
running on the said cluster, differentiated by unique resource/service names.

This makes it cost-effective as opposed to each runtime having their own clusters.
E.G. the dev env may hold the sandbox runtime, while the stage env contains the
SIT, E2E, and UAT runtimes.
EOF
}

variable "runtimes" {
  type = "list" # TODO: [v0.12 upgrade] able to specify stricter type.

  description = <<EOF
A map of objects in the format:
  | [{
  |    name         = string # runtime name in short form.
  |    full_name    = string # full name of the runtime.
  |    description  = string # runtime's description.
  |    env          = string # the environment where this runtime resides.
  |    phase        = number # the order of this runtime in CI/CD.
  |    long_running = bool   # whether the runtime's resources are long-lived.
  | }]

Business runtimes. The [runtime].env must correspond to an existing env
declared in `local.environments`. Runtimes can share the same 'phase' to denote
that they can be run in parallel.

Environments can have multiple runtimes. Ergo, multiple runtimes can belong to
the same environment. If it's desirable to only have one runtime per env, a
1:1 mapping between environment and runtime can be done instead.
EOF
}
