package cloud

// Environment describes a cloud environment
type Environment struct {
	ID          string `json:"id" yaml:"id" toml:"id"`
	Name        string `json:"name" yaml:"name" toml:"name"`
	Description string `json:"description" yaml:"description" toml:"description"`
	AWSRegion   string `json:"aws_region" yaml:"aws_region" toml:"aws_region"`
	AWSRoleARN  string `json:"aws_role_arn" yaml:"aws_role_arn" toml:"aws_role_arn"`

	runtimes []*Runtime
}

// Runtimes returns a list of runtimes that resides in this environment.
func (e *Environment) Runtimes() []*Runtime {
	return e.runtimes
}
