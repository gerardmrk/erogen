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
