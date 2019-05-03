# The default values here are NOT sane defaults but are
# defined as is for local dev setup efficiency, coupled with the fact
# that this is really only intended for local development; you should NOT
# use self-signed certs in production.

variable "org_name" {
  description = "Organization name on the root cert."
  default     = "Local Dev"
}

variable "org_unit" {
  description = "Organization unit on the root cert."
  default     = "Cert Auth Department"
}

variable "org_addr_street" {
  description = "Organization street address lines on the root cert."
  default     = ["129 West Customs Street"]
}

variable "org_addr_locality" {
  description = "Organization locality on the root cert."
  default     = "Auckland City"
}

variable "org_addr_province" {
  description = "Organization ISO subdivision code on the root cert."

  # Auckland
  default = "AUK"
}

variable "org_addr_postcode" {
  description = "Organization postal code on the root cert."

  # Auckland CBD
  default = "1010"
}

variable "org_addr_country" {
  description = "Organization ISO country code in the root cert."

  # New Zealand
  default = "NZ"
}
