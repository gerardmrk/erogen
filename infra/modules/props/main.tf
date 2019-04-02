# CONFIG
locals {
  invalid_chars = "/[\\s-_.!#@]/"
}

# clean and parse properties
locals {
  namespace   = "${trimspace(chomp(var.namespace))}"
  environment = "${trimspace(chomp(var.environment))}"
  stage       = "${trimspace(chomp(var.stage))}"
  context     = "${trimspace(chomp(var.context))}"
  attribute   = "${replace(trimspace(chomp(join(" ", distinct(compact(flatten(var.attribute)))))), local.invalid_chars, " ")}"
  tags        = "${zipmap(split("+++", replace(title(join("+++", keys(var.tags))), "/[\\s]/", "")), values(var.tags))}"
}

# values formatted according to the user's settings
locals {
  formatted_prop = {
    snakecase = [
      "${replace(lower(local.namespace), local.invalid_chars, "${var.conf_squash_values == "true" ? "" : "_"}")}",
      "${replace(lower(local.environment), local.invalid_chars, "${var.conf_squash_values == "true" ? "" : "_"}")}",
      "${replace(lower(local.stage), local.invalid_chars, "${var.conf_squash_values == "true" ? "" : "_"}")}",
      "${replace(lower(local.context), local.invalid_chars, "${var.conf_squash_values == "true" ? "" : "_"}")}",
      "${replace(lower(local.attribute), local.invalid_chars, "${var.conf_squash_values == "true" ? "" : "_"}")}",
    ]

    spinalcase = [
      "${replace(lower(local.namespace), local.invalid_chars, "${var.conf_squash_values == "true" ? "" : "-"}")}",
      "${replace(lower(local.environment), local.invalid_chars, "${var.conf_squash_values == "true" ? "" : "-"}")}",
      "${replace(lower(local.stage), local.invalid_chars, "${var.conf_squash_values == "true" ? "" : "-"}")}",
      "${replace(lower(local.context), local.invalid_chars, "${var.conf_squash_values == "true" ? "" : "-"}")}",
      "${replace(lower(local.attribute), local.invalid_chars, "${var.conf_squash_values == "true" ? "" : "-"}")}",
    ]

    camelcase = [
      "${replace(lower(local.namespace), local.invalid_chars, "")}",
      "${replace(title(local.environment), local.invalid_chars, "")}",
      "${replace(title(local.stage), local.invalid_chars, "")}",
      "${replace(title(local.context), local.invalid_chars, "")}",
      "${replace(title(local.attribute), local.invalid_chars, "")}",
    ]

    pascalcase = [
      "${replace(title(local.namespace), local.invalid_chars, "")}",
      "${replace(title(local.environment), local.invalid_chars, "")}",
      "${replace(title(local.stage), local.invalid_chars, "")}",
      "${replace(title(local.context), local.invalid_chars, "")}",
      "${replace(title(local.attribute), local.invalid_chars, "")}",
    ]
  }
}

# set the ID variants
locals {
  id = {
    snakecase = "${replace(
        join("_", compact(local.formatted_prop["snakecase"])),
        "/[^\\w]/",
        "_")
    }"

    spinalcase = "${replace(
        join("-", compact(local.formatted_prop["spinalcase"])),
        "/[^A-Za-z0-9-]/",
        "-")
    }"

    camelcase = "${replace(
        join("", compact(local.formatted_prop["camelcase"])),
        "/[^A-Za-z0-9]/",
        "")
    }"

    pascalcase = "${replace(
        join("", compact(local.formatted_prop["pascalcase"])),
        "/[^A-Za-z0-9]/",
        "")
    }"
  }
}

# set the tags
locals {
  output_id          = "${local.id[var.conf_delimiter_type]}"
  output_namespace   = "${local.namespace}"
  output_environment = "${local.environment}"
  output_stage       = "${local.stage}"
  output_context     = "${local.context}"
  output_attribute   = "${distinct(compact(flatten(var.attribute)))}"

  output_tags = "${merge(local.tags, map(
      "Name", "${local.output_id}",
      "Namespace", "${local.output_namespace == "" ? "-" : local.output_namespace}",
      "Environment", "${local.output_environment == "" ? "-" : local.output_environment}",
      "Stage", "${local.output_stage == "" ? "-" : local.output_stage}",
      "Context", "${local.output_context == "" ? "-" : local.output_context}",
      "Attribute", "${join(",", local.output_attribute)}"
  ))}"
}
