package passwordhash_test

import (
	"testing"

	"github.com/gerardmrk/erogen/pkg/passwordhash"
)

func TestEncode(t *testing.T) {
	tests := []struct {
		password string
		params   *passwordhash.HasherParams
	}{
		{
			"N0r+hDAk0+@",
			&passwordhash.HasherParams{
				Memory:      255,
				Iterations:  3,
				Parallelism: 4,
				SaltLength:  16,
				KeyLength:   32,
			},
		},
		{
			"mi$$i55ippi^Riv3r",
			&passwordhash.HasherParams{
				Memory:      1024,
				Iterations:  2,
				Parallelism: 2,
				SaltLength:  12,
				KeyLength:   30,
			},
		},
		{
			"0k1ah0ma_Ci+y",
			&passwordhash.HasherParams{
				Memory:      64 * 1024,
				Iterations:  5,
				Parallelism: 8,
				SaltLength:  20,
				KeyLength:   40,
			},
		},
	}

	for _, tst := range tests {
		enc, err := passwordhash.Encode([]byte(tst.password), tst.params)
		if err != nil {
			t.Fatal(err)
		}

	}
}
