package password

import (
	"bytes"
	"crypto/rand"
	"encoding/base64"
	"fmt"

	"golang.org/x/crypto/argon2"
)

// HasherParams contains settings for the password hasher.
type HasherParams struct {
	// Amount of memory used by the algorithm.
	Memory uint32
	// Number of passes over the memory.
	Iterations uint32
	// Number of threads to use.
	Parallelism uint8
	// Length of the generated salt.
	SaltLength uint32
	// Length of the generated key.
	KeyLength uint32
}

// Hash returns the hash for the given password with the specified settings.
func Hash(password []byte, params *HasherParams) ([]byte, error) {
	hash := bytes.NewBufferString(fmt.Sprintf(
		"$argon2id$v=%d$m=%d,t=%d,p=%d",
		argon2.Version,
		params.Memory,
		params.Iterations,
		params.Parallelism,
	))

	salt, err := Salt(params.SaltLength)
	if err != nil {
		return nil, err
	}
	encodedSalt := make([]byte, base64.StdEncoding.EncodedLen(len(salt)))
	base64.RawStdEncoding.Encode(encodedSalt, salt)
	_, _ = hash.WriteString("$")
	_, _ = hash.Write(encodedSalt)

	key, err := Key(password, params)
	if err != nil {
		return nil, err
	}
	encodedKey := make([]byte, base64.StdEncoding.EncodedLen(len(key)))
	base64.RawStdEncoding.Encode(encodedKey, key)
	_, _ = hash.WriteString("$")
	_, _ = hash.Write(encodedKey)

	return hash.Bytes(), nil
}

// HashString is a convenience wrapper around Hash()
// that accepts and returns a string.
func HashString(password string, params *HasherParams) (string, error) {
	hash, err := Hash([]byte(password), params)
	if err != nil {
		return "", err
	}
	return string(hash), err
}

// Key returns an Argon2 generated ID key from the given password
// and a randomly generated salt.
// This is exposed for advanced usage; it's preferable to use the Hash()
// or HashString() functions instead.
func Key(password []byte, params *HasherParams) (key []byte, err error) {
	salt, err := Salt(params.SaltLength)
	if err != nil {
		return
	}
	key = argon2.IDKey(
		password,
		salt,
		params.Iterations,
		params.Memory,
		params.Parallelism,
		params.KeyLength,
	)
	return
}

// KeyString is a convenience wrapper around Key()
// that accepts and returns an ID key string.
// This is exposed for advanced usage; it's preferable to use the Hash()
// or HashString() functions instead.
func KeyString(password string, params *HasherParams) (string, error) {
	key, err := Key([]byte(password), params)
	if err != nil {
		return "", err
	}
	return string(key), nil
}

// Salt returns a randomly generated salt with the specified length.
// This is exposed for advanced usage; it's preferable to use the Hash()
// or HashString() functions instead.
func Salt(ln uint32) (salt []byte, err error) {
	salt = make([]byte, ln)
	if _, err := rand.Read(salt); err != nil {
		return nil, err
	}
	return
}

// SaltString is a convenience wrapper around Salt()
// that returns a Salt string.
// This is exposed for advanced usage; it's preferable to use the Hash()
// or HashString() functions instead.
func SaltString(ln uint32) (string, error) {
	buf, err := Salt(ln)
	if err != nil {
		return "", err
	}
	return string(buf), nil
}
