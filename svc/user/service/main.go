package main

import (
	"fmt"
	"github.com/gerardmrk/erogen/svc/user/cache/boltdb"
	"github.com/gerardmrk/erogen/svc/user/database/postgres"
	"log"
	"os"
	"strconv"
	"strings"
)

// Database settings
var (
	DBHost     = "localhost"
	DBPort     = 5432
	DBUsername = "admin-local"
	DBPassword = "admin-local"
	DBDatabase = "erogen"
	DBSSLMode  = "disable"
)

func init() {
	if envDBHost := os.Getenv("EROGEN_USERDB_HOST"); envDBHost != "" {
		DBHost = strings.TrimSpace(envDBHost)
	}
	if envDBPort := os.Getenv("EROGEN_USERDB_PORT"); envDBPort != "" {
		port, _ := strconv.ParseInt(envDBPort, 10, 0)
		DBPort = int(port)
	}
	if envDBUsername := os.Getenv("EROGEN_USERDB_USERNAME"); envDBUsername != "" {
		DBUsername = strings.TrimSpace(envDBUsername)
	}
	if envDBPassword := os.Getenv("EROGEN_USERDB_PASSWORD"); envDBPassword != "" {
		DBPassword = envDBPassword
	}
	if envDBDatabase := os.Getenv("EROGEN_USERDB_DATABASE"); envDBDatabase != "" {
		DBDatabase = strings.TrimSpace(envDBDatabase)
	}
	if envDBSSLMode := os.Getenv("EROGEN_USERDB_SSLMODE"); envDBSSLMode != "" {
		DBSSLMode = strings.TrimSpace(envDBSSLMode)
	}
}

func main() {

	db := postgres.NewDB(&postgres.DBConfig{
		Host:     DBHost,
		Port:     DBPort,
		UserName: DBUsername,
		Password: DBPassword,
		Database: DBDatabase,
		SSLMode:  DBSSLMode,
	})

	defer func() {
		if err := db.Close(); err != nil {
			log.Fatal(err)
		}
	}()

	cache := boltdb.NewCache()

	userDB := postgres.NewUserDB(db, cache)
	u, err := userDB.User()
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println(u)
}
