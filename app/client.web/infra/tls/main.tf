resource "tls_private_key" "root" {
  algorithm   = "ECDSA"
  ecdsa_curve = "P521"
}

resource "tls_self_signed_cert" "root" {
  key_algorithm   = "ECDSA"
  private_key_pem = "${tls_private_key.root.private_key_pem}"

  validity_period_hours = 26280
  early_renewal_hours   = 8760

  is_ca_certificate = true

  allowed_uses = [
    "key_encipherment",
    "digital_signature",
    "server_auth",
    "client_auth",
    "cert_signing",
  ]

  subject {
    common_name         = "${var.org_name} Root CA"
    organization        = "${var.org_name}"
    organizational_unit = "${var.org_unit} Certificate Authority"
    locality            = "${var.org_addr_locality}"
    province            = "${var.org_addr_province}"
    country             = "${var.org_addr_country}"
  }
}
