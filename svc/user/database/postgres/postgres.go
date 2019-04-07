package postgres

import (
	"github.com/gerardmrk/erogen/svc/user/cache/boltdb"
)

// implements user store
type UserDB struct {
	cache boltdb.UserCache
}