# See https://www.terraform.io/docs/backends/types/s3.html
#

module "props" {
  source = "../../modules/props"

  namespace = "${var.namespace}"
  context   = "infra_state"
  tags      = "${var.additional_tags}"
}

module "mutex_props" {
  source = "../../modules/props"

  attribute = ["mutex"]
  namespace = "${module.props.namespace}"
  context   = "${module.props.context}"
  tags      = "${module.props.tags}"
}

module "logs_props" {
  source = "../../modules/props"

  attribute = ["logs"]
  namespace = "${module.props.namespace}"
  context   = "${module.props.context}"
  tags      = "${module.props.tags}"
}

module "storage_props" {
  source = "../../modules/props"

  attribute = ["storage"]
  namespace = "${module.props.namespace}"
  context   = "${module.props.context}"
  tags      = "${module.props.tags}"
}

data "aws_caller_identity" "bastion" {}

resource "aws_dynamodb_table" "state_mutex" {
  name = "${module.mutex_props.id}"

  hash_key       = "LockID"
  billing_mode   = "PAY_PER_REQUEST"
  stream_enabled = false
  tags           = "${module.mutex_props.tags}"

  attribute {
    name = "LockID"
    type = "S"
  }

  lifecycle {
    prevent_destroy = false
  }
}

resource "aws_s3_bucket" "state_logs" {
  bucket = "${module.logs_props.id_spinal_c}"
  tags   = "${module.logs_props.tags}"

  acl           = "log-delivery-write"
  force_destroy = true

  lifecycle_rule {
    id      = "${module.logs_props.id}"
    tags    = "${module.logs_props.tags}"
    prefix  = "/state-storage-access"
    enabled = true

    transition {
      days          = 30
      storage_class = "STANDARD_IA"
    }

    expiration {
      days = 60
    }
  }

  lifecycle {
    prevent_destroy = false
  }
}

resource "aws_s3_bucket" "state_storage" {
  bucket = "${module.storage_props.id_spinal_c}"
  tags   = "${module.storage_props.tags}"

  acl           = "private"
  force_destroy = true

  versioning {
    enabled = true
  }

  logging {
    target_bucket = "${aws_s3_bucket.state_logs.id}"
    target_prefix = "/state-storage-access"
  }

  lifecycle {
    prevent_destroy = false
  }
}

resource "aws_s3_bucket_policy" "state_storage" {
  bucket = "${aws_s3_bucket.state_storage.id}"
  policy = "${data.aws_iam_policy_document.state_storage.json}"
}

data "aws_iam_policy_document" "state_storage" {
  statement {
    sid       = "AllowAccessStateStorage"
    effect    = "Allow"
    actions   = ["s3:ListBucket"]
    resources = ["${aws_s3_bucket.state_storage.arn}"]

    principals {
      type        = "AWS"
      identifiers = ["arn:aws:iam::${data.aws_caller_identity.bastion.account_id}:root"]
    }
  }

  statement {
    sid       = "DenyPublicReadACL"
    effect    = "Deny"
    actions   = ["s3:PutObject", "s3:PutObjectAcl", "s3:PutObjectVersionAcl"]
    resources = ["${aws_s3_bucket.state_storage.arn}/*"]

    principals {
      type        = "AWS"
      identifiers = ["*"]
    }

    condition {
      test     = "StringEquals"
      variable = "s3:x-amz-acl"

      values = [
        "public-read",
        "public-read-write",
        "authenticated-read",
      ]
    }
  }

  statement {
    sid       = "DenyPublicReadGrant"
    effect    = "Deny"
    actions   = ["s3:PutObject", "s3:PutObjectAcl", "s3:PutObjectVersionAcl"]
    resources = ["${aws_s3_bucket.state_storage.arn}/*"]

    principals {
      type        = "AWS"
      identifiers = ["*"]
    }

    condition {
      test     = "StringLike"
      variable = "s3:x-amz-grant-read"

      values = [
        "*http://acs.amazonaws.com/groups/global/AllUsers*",
        "*http://acs.amazonaws.com/groups/global/AuthenticatedUsers*",
      ]
    }
  }

  statement {
    sid       = "DenyPublicListACL"
    effect    = "Deny"
    actions   = ["s3:PutBucketAcl"]
    resources = ["${aws_s3_bucket.state_storage.arn}"]

    principals {
      type        = "AWS"
      identifiers = ["*"]
    }

    condition {
      test     = "StringEquals"
      variable = "s3:x-amz-acl"

      values = [
        "public-read",
        "public-read-write",
        "authenticated-read",
      ]
    }
  }

  statement {
    sid       = "DenyPublicListGrant"
    effect    = "Deny"
    actions   = ["s3:PutBucketAcl"]
    resources = ["${aws_s3_bucket.state_storage.arn}"]

    principals {
      type        = "AWS"
      identifiers = ["*"]
    }

    condition {
      test     = "StringLike"
      variable = "s3:x-amz-grant-read"

      values = [
        "*http://acs.amazonaws.com/groups/global/AllUsers*",
        "*http://acs.amazonaws.com/groups/global/AuthenticatedUsers*",
      ]
    }
  }
}
