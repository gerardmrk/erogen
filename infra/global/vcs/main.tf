provider "gitlab" {
  token = "${var.access_token}"
}

resource "gitlab_group" "main" {
  name        = "${lower(var.name)}"
  path        = "${lower(var.name)}_org"
  description = "${title(var.name)} Group"

  lfs_enabled            = true
  visibility_level       = "private"
  request_access_enabled = false
}

resource "gitlab_project" "main" {
  name        = "${lower(var.name)}"
  description = "${title(var.name)} Monorepo"

  namespace_id     = "${gitlab_group.main.id}"
  visibility_level = "private"

  wiki_enabled           = true
  issues_enabled         = true
  snippets_enabled       = true
  merge_requests_enabled = true
  approvals_before_merge = 1
}

resource "null_resource" "local_vcs_init" {
  triggers = {
    repo_id = "${gitlab_project.main.id}"
  }

  provisioner "local-exec" {
    command = ""
  }
}
