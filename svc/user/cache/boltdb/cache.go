package boltdb

import (
	"github.com/boltdb/bolt"
)

func NewCache(dbFile string) *bolt.DB {
	db, err := bolt.Open(dbFile, 0600, nil)
	if err != nil {
		panic(err)
	}

	return db
}
