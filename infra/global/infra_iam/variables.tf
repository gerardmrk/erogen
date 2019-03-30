variable "environments" {
  type        = "list"                                                          # TODO: [v0.12 upgrade] stricter types
  description = "list of environments to create the various IAM resources for."
}

variable "state_env_path_prefix" {
  type        = "string"
  description = "The env path prefix for the environments and runtimes."
}

variable "state_logs_arn" {
  type        = "string"
  description = "ARN of the state logs service."
}

variable "state_storage_arn" {
  type        = "string"
  description = "ARN of the state storage service."
}

variable "state_mutex_arn" {
  type        = "string"
  description = "ARN of the state mutex service."
}

variable "namespace" {
  type        = "string"
  description = "The namespace for resources in this module. Ideally the organization name or abbreviation"
}

variable "additional_tags" {
  type        = "map"
  description = "Additional resource tags to attach to this module's resources."
  default     = {}
}
