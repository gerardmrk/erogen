output "id" {
  description = "The VPC ID."
  value       = "${aws_vpc.main.id}"
}

output "default_resource_ids" {
  description = "IDs of default VPC resources. It is not recommended to reference these IDs but they are exported just in case."

  value = {
    network_acl    = "${aws_default_network_acl.main.id}"
    route_table    = "${aws_default_route_table.main.id}"
    security_group = "${aws_default_security_group.main.id}"
  }
}

output "subnet_ids" {
  description = "Map of VPC subnet ID lists."

  value = {
    private = ["${aws_subnet.private.*.id}"]
    public  = ["${aws_subnet.public.*.id}"]
  }
}

# output "route_table_ids" {
#   description = "Map of VPC route table IDs"

#   value = {
#     private = "${aws_route_table.private.id}"
#     public  = "${aws_route_table.public.id}"
#   }
# }

output "av_zones" {
  description = "List of AWS availability zone names."
  value       = ["${data.aws_availability_zones.main.names}"]
}
