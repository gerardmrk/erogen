package main

import (
	"fmt"

	"github.com/gerardmrk/erogen/pkg/password"
)

func main() {
	params := &password.HasherParams{
		Memory:      64 * 1024,
		Iterations:  3,
		Parallelism: 2,
		SaltLength:  16,
		KeyLength:   32,
	}

	hash, err := password.Hash([]byte("wewlad123"), params)
	if err != nil {
		panic(err)
	}
	fmt.Println(string(hash))
}
