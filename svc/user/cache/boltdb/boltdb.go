package boltdb

import (
	usvc "github.com/gerardmrk/erogen/svc/user"
)

// UserCache is a BoltDB implementation of usvc.UserStore
type UserCache struct{}

// NewUserCache returns a new UserCache instance
func NewUserCache() *UserCache {
	return &UserCache{}
}

func (u *UserCache) User(id string) (*usvc.User, error) {
	return &usvc.User{}, nil
}
