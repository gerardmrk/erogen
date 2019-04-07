package postgres

import (
	"database/sql"
	usvc "github.com/gerardmrk/erogen/svc/user"
)

type UserDB struct {
	db *sql.DB
	cache usvc.UserStore
}

func NewUserDB(db *sql.DB, cache usvc.UserStore) *UserDB {
	return &UserDB{
		db:db,
		cache:cache,
	}
}

func (udb *UserDB) User() (*usvc.User, error) {
	return &usvc.User{}, nil
}

