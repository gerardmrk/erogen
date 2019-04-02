variable "namespace" {
  type        = "string"
  description = "The namespace for resources in this module. Ideally the organization name or abbreviation"
  default     = ""
}

variable "environment" {
  type        = "string"
  description = "Environment of this VPC"
  default     = ""
}

variable "stage" {
  type        = "string"
  description = "Runtime / environment stage of this VPC"
  default     = ""
}

variable "additional_tags" {
  type        = "map"
  description = "Additional resource tags to attach to this module's resources."
  default     = {}
}
