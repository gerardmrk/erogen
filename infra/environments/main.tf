data "terraform_remote_state" "global" {}

module "vpc" {
  source = "../modules/networking/vpc"

  namespace       = "ero"
  environment     = "dev"
  additional_tags = "${local.additional_tags}"
}
