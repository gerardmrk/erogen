package user

import (
	userpb "github.com/gerardmrk/erogen/proto/user"
)

type User struct {
	ID string
	Email string
	Username string
	Password string
}

type UserStore interface {
	User(id string) (*User, error)
}

type UserRepo interface {
	Find(id string) (User, error)
	FindByAlias(aType userpb.UserAliasType, aValue string) (User, error)
	Update() error
}