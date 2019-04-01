variable "project_name" {
  type        = "string"
  description = "Project name."
}

variable "stage_name" {
  type        = "string"
  description = "Stage name."
}

variable "additional_tags" {
  type        = "map"
  description = "Additional resource tags to attach to resources in this module."
  default     = {}
}
