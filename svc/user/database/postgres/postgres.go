package postgres

import (
	"database/sql"

	usvc "github.com/gerardmrk/erogen/svc/user"
)

type UserDB struct {
	db    *sql.DB
	cache usvc.UserStore
}

func NewUserDB(db *sql.DB, cache usvc.UserStore) *UserDB {
	return &UserDB{
		db:    db,
		cache: cache,
	}
}

func (udb *UserDB) User(id string) (*usvc.User, error) {
	statement := `SELECT * FROM user_accounts WHERE id = $1`
	row := udb.db.QueryRow(statement, id)
	switch err := row.Scan(); err {
	case sql.ErrNoRows:
		return nil, nil
	case nil:
		return nil, nil
	default:
		panic(err)
	}
}
