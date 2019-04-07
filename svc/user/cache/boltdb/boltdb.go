package boltdb

import (
	usvc "github.com/gerardmrk/erogen/svc/user"
)

// UserCache is a BoltDB implementation of usvc.UserStore
type UserCache struct {}

// NewCache returns a new UserCache instance
func NewCache() *UserCache {
	return &UserCache{}
}

func (u *UserCache) User() (*usvc.User, error) {
	return &usvc.User{}, nil
}