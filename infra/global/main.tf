module "infra_state" {
  source = "./infra_state"

  namespace       = "${local.project_name}"
  additional_tags = "${local.additional_tags}"
}

module "infra_iam" {
  source = "./infra_iam"

  namespace       = "${local.project_name}"
  additional_tags = "${local.additional_tags}"

  environments = "${var.environments}"

  state_env_path_prefix = "envs"
  state_logs_arn        = "${module.infra_state.logs["service_arn"]}"
  state_mutex_arn       = "${module.infra_state.mutex["service_arn"]}"
  state_storage_arn     = "${module.infra_state.storage["service_arn"]}"
}
