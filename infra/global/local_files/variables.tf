variable "namespace" {
  type        = "string"
  description = "The namespace for resources in this module. Ideally the organization name or abbreviation"
}

variable "additional_tags" {
  type        = "map"
  description = "Additional resource tags to attach to this module's resources."
  default     = {}
}
