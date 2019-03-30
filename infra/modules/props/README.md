# Props Module

Credits to the [**Cloud Posse**](https://cloudposse.com/)'s [Terraform Null Label](https://github.com/cloudposse/terraform-null-label) module, which is what this module is based off of.

This module generates consistent label names and attributes for provisioned resources.

## Format

```
[namespace]-[stage]-[context]-[attribute(s)]
```

## Examples

- `[erogen]-[dev]-[loggingservice]-[web]`
- `[erogen]-[dev]-[loggingservice]-[iam-allow-login]`
- `[ero]-[uat]-[crm-escrow]-[producer]`
- `[ero]-[uat]-[crm-escrow]-[consumer]`
- `[ero]-[uat]-[crm-escrow]-[queue]`
- `[ero]-[uat]-[crm-escrow]-[queue-iam]`
