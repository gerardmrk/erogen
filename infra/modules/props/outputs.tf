output "id" {
  value = "${local.output_id}"
}

output "namespace" {
  value = "${local.output_namespace}"
}

output "environment" {
  value = "${local.output_environment}"
}

output "stage" {
  value = "${local.output_stage}"
}

output "context" {
  value = "${local.output_context}"
}

output "attribute" {
  value = "${local.output_attribute}"
}

output "tags" {
  value = "${local.output_tags}"
}

output "conf_delimiter_type" {
  value = "${var.conf_delimiter_type}"
}

output "conf_squash_values" {
  value = "${var.conf_squash_values}"
}

output "id_snake_c" {
  value = "${local.id["snakecase"]}"
}

output "id_spinal_c" {
  value = "${local.id["spinalcase"]}"
}

output "id_camel_c" {
  value = "${local.id["camelcase"]}"
}

output "id_pascal_c" {
  value = "${local.id["pascalcase"]}"
}
