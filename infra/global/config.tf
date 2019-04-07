provider "aws" {
  region     = "${var.aws_region}"
  secret_key = "${var.aws_secret_key}"
  access_key = "${var.aws_access_key}"
}

locals {
  namespace      = "${var.name}"
  namespace_abrv = "${var.name_abbreviation}"

  common_tags = {
    Scope      = "global"
    CostCenter = "technology/dev"
  }
}

# OPS ACCOUNTS
locals {
  operations = {
    bastion = {
      name         = "bastion"
      description  = "user-level identity and access MGMT."
      aws_region   = "${lookup(var.ops_conf["bastion"], "aws_region")}"
      aws_role_arn = "${lookup(var.ops_conf["bastion"], "aws_role_arn")}"
    }

    audit = {
      name         = "audit"
      description  = "Observability, aka Hotel Audit. Metrics, tracing, logging etc."
      aws_region   = "${lookup(var.ops_conf["audit"], "aws_region")}"
      aws_role_arn = "${lookup(var.ops_conf["audit"], "aws_role_arn")}"
    }

    delivery = {
      name         = "delivery"
      description  = "Continuous integration and delivery pipeline."
      aws_region   = "${lookup(var.ops_conf["delivery"], "aws_region")}"
      aws_role_arn = "${lookup(var.ops_conf["delivery"], "aws_role_arn")}"
    }
  }

  environments = {
    dev = {
      name         = "dev"
      full_name    = "development"
      description  = "Cost-effective, non-HA cluster for development."
      aws_region   = "${lookup(var.envs_conf["dev"], "aws_region")}"
      aws_role_arn = "${lookup(var.envs_conf["dev"], "aws_role_arn")}"
    }

    test = {
      name         = "test"
      full_name    = "test"
      description  = "Cost-effective, non-HA cluster for testing. Runtimes here should be automated and torn down after completion."
      aws_region   = "${lookup(var.envs_conf["test"], "aws_region")}"
      aws_role_arn = "${lookup(var.envs_conf["test"], "aws_role_arn")}"
    }

    stage = {
      name         = "stage"
      full_name    = "staging"
      description  = "Exact replica of production. Runtimes that must mirror live runtime for reproducibility reasons should reside here."
      aws_region   = "${lookup(var.envs_conf["stage"], "aws_region")}"
      aws_role_arn = "${lookup(var.envs_conf["stage"], "aws_role_arn")}"
    }

    prod = {
      name         = "prod"
      full_name    = "production"
      description  = "Production environment. This is where the live runtime should reside, and the disaster-recovery runtime to if exists."
      aws_region   = "${lookup(var.envs_conf["prod"], "aws_region")}"
      aws_role_arn = "${lookup(var.envs_conf["prod"], "aws_role_arn")}"
    }
  }
}
