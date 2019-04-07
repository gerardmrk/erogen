package repository

import (
	"github.com/gerardmrk/erogen/svc/user/database/postgres"
)

type UserRepo struct {
	DB postgres.UserDB
}
