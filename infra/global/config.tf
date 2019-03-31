provider "aws" {
  region     = "${var.aws_region}"
  secret_key = "${var.aws_secret_key}"
  access_key = "${var.aws_access_key}"
}

locals {
  project_name = "${var.name}"

  additional_tags = {
    Scope      = "global"
    CostCenter = "technology/dev"
  }
}

# OPS ACCOUNTS
locals {
  operations = {
    iam = {
      name         = "iam"
      description  = "Service-level identity and access MGMT."
      aws_region   = "${lookup(var.ops_confs["iam"], "aws_region")}"
      aws_role_arn = "${lookup(var.ops_confs["iam"], "aws_role_arn")}"
    }

    audit = {
      name         = "audit"
      description  = "Observability, aka Hotel Audit. Metrics, tracing, logging etc."
      aws_region   = "${lookup(var.ops_confs["audit"], "aws_region")}"
      aws_role_arn = "${lookup(var.ops_confs["audit"], "aws_role_arn")}"
    }

    delivery = {
      name         = "delivery"
      description  = "Continuous integration and delivery pipeline."
      aws_region   = "${lookup(var.ops_confs["delivery"], "aws_region")}"
      aws_role_arn = "${lookup(var.ops_confs["delivery"], "aws_role_arn")}"
    }
  }
}
