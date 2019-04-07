package cloud

// Runtime represents an environment runtime
type Runtime struct {
	ID          string `json:"id" yaml:"id" toml:"id"`
	Name        string `json:"name" yaml:"name" toml:"name"`
	Description string `json:"description" yaml:"description" toml:"description"`
	EnvName     string `json:"env" yaml:"env" toml:"env"`
	Phase       uint8  `json:"phase" yaml:"phase" toml:"phase"`
	LongRunning bool   `json:"long_running" yaml:"long_running" toml:"long_running"`

	awsRoleArn string
	awsRegion  string
}

// AWSRegion returns the AWS Region code of its parent environment.
func (r *Runtime) AWSRegion() string {
	return r.awsRegion
}

// AWSRoleARN returns the AWS IAM Role ARN associated with its parent environment.
func (r *Runtime) AWSRoleARN() string {
	return r.awsRoleArn
}
