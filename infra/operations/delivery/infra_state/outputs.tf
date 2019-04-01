output "storage" {
  value = {
    service_id  = "${aws_s3_bucket.state_storage.id}"
    service_arn = "${aws_s3_bucket.state_storage.arn}"
  }
}

output "logs" {
  value = {
    service_id  = "${aws_s3_bucket.state_logs.id}"
    service_arn = "${aws_s3_bucket.state_logs.arn}"
  }
}

output "mutex" {
  value = {
    service_id  = "${aws_dynamodb_table.state_mutex.id}"
    service_arn = "${aws_dynamodb_table.state_mutex.arn}"
  }
}
