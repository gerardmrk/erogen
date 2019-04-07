package postgres

import (
	"database/sql"
	"fmt"
	"time"

	migrate "github.com/golang-migrate/migrate/v4"
	pgmigrate "github.com/golang-migrate/migrate/v4/database/postgres"
	_ "github.com/golang-migrate/migrate/v4/source/file"
	_ "github.com/lib/pq"
)

// Valid SSL Modes
const (
	SSLModeDisable    = "disable"     // No SSL
	SSLModeRequire    = "require"     // Always SSL (skip verification)
	SSLModeVerifyCA   = "verify-ca"   // Always SSL (verify cert signed by trusted CA)
	SSLModeVerifyFull = "verify-full" // Always SSL (verify cert signed by trusted CA, and server host name matches one in cert)
)

type DBConfig struct {
	Host            string
	Port            int
	UserName        string
	Password        string
	Database        string
	SSLMode         string
	MaxOpenConns    int
	MaxIdleConns    int
	MaxConnLifetime time.Duration

	MigrationsDirPath string
	MigrationsRunStep int
}

// NewDB returns a new UserDB with a connected DB. If MigrationsDirPath
// is specified, migrations will be applied as well.
func NewDB(conf *DBConfig) *sql.DB {
	if conf.SSLMode == "" {
		conf.SSLMode = "disable"
	} else {
		if conf.SSLMode != SSLModeDisable &&
			conf.SSLMode != SSLModeRequire &&
			conf.SSLMode != SSLModeVerifyCA &&
			conf.SSLMode != SSLModeVerifyFull {
			panic("Invalid conf.SSLMode specified")
		}
	}

	if conf.MaxIdleConns > 0 &&
		(conf.MaxOpenConns > 0 && conf.MaxIdleConns > conf.MaxOpenConns) {
		panic("conf.MaxIdleConns cannot be more than conf.MaxOpenConns")
	}

	connStr := fmt.Sprintf(
		"postgres://%s:%s@%s:%d/%s?sslmode=%s",
		conf.UserName, conf.Password, conf.Host, conf.Port, conf.Database, conf.SSLMode,
	)

	db, err := sql.Open("postgres", connStr)
	if err != nil {
		panic(err)
	}

	if conf.MaxOpenConns > 0 {
		db.SetMaxOpenConns(conf.MaxOpenConns)
	}

	if conf.MaxIdleConns > 0 {
		db.SetMaxIdleConns(conf.MaxIdleConns)
	}

	if conf.MaxConnLifetime > 0 {
		db.SetConnMaxLifetime(conf.MaxConnLifetime)
	}

	if err = db.Ping(); err != nil {
		panic(err)
	}

	if conf.MigrationsDirPath != "" {
		driver, err := pgmigrate.WithInstance(db, &pgmigrate.Config{})
		if err != nil {
			panic(err)
		}
		mg, err := migrate.NewWithDatabaseInstance(
			"file:///"+conf.MigrationsDirPath,
			"postgres", driver,
		)
		defer func() {
			errSrc, errDB := mg.Close();
			if errSrc != nil {
				panic(errSrc)
			}
			if errDB != nil {
				panic(errDB)
			}
		}()

		if conf.MigrationsRunStep > 0 {
			if err := mg.Steps(conf.MigrationsRunStep); err != nil {
				panic(err)
			}
		} else {
			if err := mg.Up(); err != nil {
				panic(err)
			}
		}
	}

	return db
}



