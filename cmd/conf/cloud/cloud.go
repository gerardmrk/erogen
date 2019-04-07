package cloud

import "errors"

type CloudConfig struct {
	envList     []*Environment
	opsList     []*Operations
	runtimeList []*Runtime

	envs     map[string]*Environment
	ops      map[string]*Operations
	runtimes map[string]*Runtime
}

func (c *CloudConfig) Environment(id string) (env *Environment, err error) {
	env, ok := c.envs[id]
	if !ok {
		err = errors.New("Invalid environment ID")
	}
	return
}

func (c *CloudConfig) Environments() []*Environment {
	return c.envList
}

func (c *CloudConfig) Runtime(id string) (r *Runtime, err error) {
	r, ok := c.runtimes[id]
	if !ok {
		err = errors.New("Invalid runtime ID")
	}
	return
}

func (c *CloudConfig) Runtimes() []*Runtime {
	return c.runtimeList
}
