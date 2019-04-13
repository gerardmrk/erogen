package passwordhash

/*

Password-hashing package. Uses Argon2.

see -> https://github.com/P-H-C/phc-winner-argon2

*/

import (
	"bufio"
	"bytes"
	"crypto/rand"
	"crypto/subtle"
	"encoding/base64"
	"errors"
	"fmt"

	"golang.org/x/crypto/argon2"
)

// Hasher attributes
var (
	HasherID      = "argon2id"
	HasherVersion = argon2.Version
)

var (
	// ErrInvalidHashFormat is returned when the given encoded hash is not
	// parseable according to the enforced hash format.
	ErrInvalidHashFormat = errors.New("password: invalid hash format")
	// ErrIncompatibleVersion is returned if the version is different from the
	// current Argon 2 version.
	ErrIncompatibleVersion = errors.New("password: incompatible argon2 version")
	// ErrInvalidHashID is returned if the hasher name is not the same as HasherID
	ErrInvalidHashID = errors.New("password: invalid hash ID")
	// ErrInvalidHashVersion is returned if the version is non-parseable
	ErrInvalidHashVersion = errors.New("password: invalid hash version")
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

// EncodeString is a convenience wrapper around Encode that accepts
// a string and returns the encoded hash as a string.
func EncodeString(password string, params *HasherParams) (string, error) {
	encoded, err := Encode([]byte(password), params)
	if err != nil {
		return "", err
	}
	return string(encoded), nil
}

// Encode returns the encoded hash and others for the given password with the specified settings.
// Outputs an encoded hash in the following format:
//
// "$argon2i$v=[version]$m=[memory],t=[iterations],p=[parallelism]$[salt]$[key]"
//
func Encode(password []byte, params *HasherParams) ([]byte, error) {
	encoded := bytes.NewBufferString(fmt.Sprintf(
		"$%s$v=%d$m=%d,t=%d,p=%d",
		HasherID,
		HasherVersion,
		params.Memory,
		params.Iterations,
		params.Parallelism,
	))

	salt, err := genSalt(params.SaltLength)
	if err != nil {
		return nil, err
	}

	key := argon2.IDKey(
		password,
		salt,
		params.Iterations,
		params.Memory,
		params.Parallelism,
		params.KeyLength,
	)

	encodedSalt := make([]byte, base64.RawStdEncoding.EncodedLen(len(salt)))
	base64.RawStdEncoding.Encode(encodedSalt, salt)
	_, _ = encoded.WriteString("$")
	_, _ = encoded.Write(encodedSalt)

	encodedKey := make([]byte, base64.RawStdEncoding.EncodedLen(len(key)))
	base64.RawStdEncoding.Encode(encodedKey, key)
	_, _ = encoded.WriteString("$")
	_, _ = encoded.Write(encodedKey)

	return encoded.Bytes(), nil
}

// salt returns a randomly generated salt with the specified length.
// This is exposed for advanced usage; it's preferable to use the Hash()
// or HashString() functions instead.
func genSalt(ln uint32) (salt []byte, err error) {
	salt = make([]byte, ln)
	if _, err := rand.Read(salt); err != nil {
		return nil, err
	}
	return
}

// DecodeString is a convenience wrapper around Decode
// but accepts and returns a string(s) instead of byte values.
func DecodeString(encoded string) (params *HasherParams, salt string, key string, err error) {
	params, bsalt, bkey, err := Decode([]byte(encoded))
	if err != nil {
		return
	}
	salt, key = string(bsalt), string(bkey)
	return
}

// Decode decodes the given byte slice into a password hash.
func Decode(encoded []byte) (params *HasherParams, salt []byte, key []byte, err error) {
	scr := bufio.NewScanner(bytes.NewReader(encoded))
	scr.Split(func(data []byte, atEOF bool) (advance int, token []byte, err error) {
		if atEOF && len(data) == 0 {
			return 0, nil, nil
		}
		i := bytes.IndexByte(data, '$')
		if i == 0 {
			return 1, nil, nil
		}
		if i == -1 {
			return len(data), data[0:len(data)], nil
		}
		return i + 1, data[0:i], nil
	})

	i, tokens := 0, make([][]byte, 5)
	for scr.Scan() {
		// fill slice instead of appending to prevent
		// reallocation and new slice creation each loop.
		tokens[i] = scr.Bytes()
		i++
	}

	if i != 5 {
		return nil, nil, nil, ErrInvalidHashFormat
	}
	if string(tokens[0]) != HasherID {
		return nil, nil, nil, ErrInvalidHashID
	}
	var version int
	if _, err = fmt.Sscanf(string(tokens[1]), "v=%d", &version); err != nil {
		return nil, nil, nil, ErrInvalidHashVersion
	}
	if version != HasherVersion {
		return nil, nil, nil, ErrIncompatibleVersion
	}

	p := &HasherParams{}

	if _, err = fmt.Sscanf(
		string(tokens[2]),
		"m=%d,t=%d,p=%d",
		&p.Memory,
		&p.Iterations,
		&p.Parallelism,
	); err != nil {
		return nil, nil, nil, err
	}

	salt = make([]byte, base64.RawStdEncoding.DecodedLen(len(tokens[3])))
	if _, err = base64.RawStdEncoding.Decode(salt, tokens[3]); err != nil {
		return nil, nil, nil, err
	}
	p.SaltLength = uint32(len(salt))

	key = make([]byte, base64.RawStdEncoding.DecodedLen(len(tokens[4])))
	if _, err = base64.RawStdEncoding.Decode(key, tokens[4]); err != nil {
		return nil, nil, nil, err
	}
	p.KeyLength = uint32(len(key))

	params = p
	return
}

// CheckPasswordString is a convenience wrapper around CheckPassword
// but accepts both password and the encoded hash as a string.
func CheckPasswordString(password, encoded string) (match bool, err error) {
	return CheckPassword([]byte(password), []byte(encoded))
}

// CheckPassword compares the given password with the given hash
// and returns true if matches.
func CheckPassword(password, encoded []byte) (match bool, err error) {
	params, salt, key, err := Decode(encoded)
	if err != nil {
		return false, err
	}

	derivedKey := argon2.IDKey(
		password,
		salt,
		params.Iterations,
		params.Memory,
		params.Parallelism,
		params.KeyLength,
	)

	if subtle.ConstantTimeCompare(key, derivedKey) == 1 {
		return true, nil
	}

	return false, nil
}
