variable "namespace" {
  type        = "string"
  description = "Name or abbreviation of the project/solution/product/organization."
}

variable "environment" {
  type        = "string"
  description = "Environment of the resources."
  default     = ""
}

variable "stage" {
  type        = "string"
  description = "Stage/phase of the resources."
  default     = ""
}

variable "context" {
  type        = "string"
  description = "Name of the service/stack/group in which the resources belongs."
  default     = ""
}

variable "attribute" {
  type        = "list"
  description = "The attribute(s) of these particular resources in the context."
  default     = []
}

variable "tags" {
  type        = "map"
  description = "Additional resource tags to attach to the resources."
  default     = {}
}

variable "conf_delimiter_type" {
  type        = "string"
  description = "The generated name delimiter, one of: spinalcase, snakecase, camelcase, pascalcase"
  default     = "snakecase"
}

variable "conf_squash_values" {
  type        = "string"                                                     // TODO: v0.12 upgrade allows bool
  description = "Whether to remove separators from property values as well."
  default     = "false"
}
