# ==================================================================================================
# Meta
# ==================================================================================================
module "props" {
  source = "../../modules/props"

  namespace = "${var.namespace}"
  context   = "infra"
  tags      = "${var.additional_tags}"
}

module "prov_props" {
  source = "../../modules/props"

  attribute = ["Provisioner"]
  namespace = "${module.props.namespace}"
  context   = "${module.props.context}"
  tags      = "${module.props.tags}"
}

module "state_acc_props" {
  source = "../../modules/props"

  attribute = ["StateAccessor"]
  namespace = "${module.props.namespace}"
  context   = "${module.props.context}"
  tags      = "${module.props.tags}"
}

data "aws_caller_identity" "bastion" {}

# ==================================================================================================
# IAM_GROUP: provisioners
# ==================================================================================================
resource "aws_iam_group" "provisioners" {
  count = "${length(var.environments)}"
  name  = "${module.prov_props.id_pascal_c}s@${upper(lookup(var.environments[count.index], "name"))}"
}

resource "aws_iam_group_policy_attachment" "assume_provisioner_role" {
  count      = "${length(var.environments)}"
  group      = "${aws_iam_group.provisioners.*.name[count.index]}"
  policy_arn = "${aws_iam_policy.allow_group_to_assume_prov_role.*.arn[count.index]}"
}

resource "aws_iam_group_policy_attachment" "state_access" {
  count      = "${length(var.environments)}"
  group      = "${aws_iam_group.provisioners.*.name[count.index]}"
  policy_arn = "${aws_iam_policy.state_access.*.arn[count.index]}"
}

# ==================================================================================================
# IAM_POLICY: assume role for provisioner
# ==================================================================================================
resource "aws_iam_policy" "allow_group_to_assume_prov_role" {
  count       = "${length(var.environments)}"
  name        = "AllowAssumeRoleFor${title(module.prov_props.attribute[0])}s@${upper(lookup(var.environments[count.index], "name"))}"
  description = "Allow assume role for '${lookup(var.environments[count.index], "full_name")}' account."
  policy      = "${data.aws_iam_policy_document.allow_group_to_assume_prov_role.*.json[count.index]}"
}

data "aws_iam_policy_document" "allow_group_to_assume_prov_role" {
  count = "${length(var.environments)}"

  statement {
    sid       = "AllowAssumeRoleFor${title(lookup(var.environments[count.index], "name"))}${title(module.prov_props.attribute[0])}s"
    effect    = "Allow"
    actions   = ["sts:AssumeRole"]
    resources = ["${lookup(var.environments[count.index], "aws_role_arn")}"]
  }
}

# ==================================================================================================
# IAM_POLICY: state access
# ==================================================================================================
resource "aws_iam_policy" "state_access" {
  count       = "${length(var.environments)}"
  name        = "AllowStateAccessFor${title(module.prov_props.attribute[0])}s@${upper(lookup(var.environments[count.index], "name"))}"
  description = "Allow state access to '${var.state_env_path_prefix}/${lookup(var.environments[count.index], "full_name")}' path."
  policy      = "${data.aws_iam_policy_document.state_access.*.json[count.index]}"
}

data "aws_iam_policy_document" "state_access" {
  count = "${length(var.environments)}"

  statement {
    sid       = "AllowStateMutexAccess"
    effect    = "Allow"
    actions   = ["dynamodb:GetItem", "dynamodb:PutItem", "dynamodb:DeleteItem"]
    resources = ["${var.state_mutex_arn}"]
  }

  statement {
    sid       = "AllowAccessStateAndLogsStorage"
    effect    = "Allow"
    actions   = ["s3:ListBucket"]
    resources = ["${var.state_logs_arn}", "${var.state_storage_arn}"]
  }

  statement {
    sid     = "AllowReadWriteStateAndLogs"
    effect  = "Allow"
    actions = ["s3:GetObject", "s3:PutObject"]

    resources = [
      "${var.state_logs_arn}",
      "${var.state_storage_arn}/${var.state_env_path_prefix}/${lookup(var.environments[count.index], "full_name")}",
    ]
  }
}
