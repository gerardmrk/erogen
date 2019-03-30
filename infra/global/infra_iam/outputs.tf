output "group_names" {
  value = ["${aws_iam_group.provisioners.*.name}"]
}
