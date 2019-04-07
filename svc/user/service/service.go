package main

import (
	"github.com/gerardmrk/erogen/pkg/passwordhash"
	authpb "github.com/gerardmrk/erogen/proto/auth"
	userpb "github.com/gerardmrk/erogen/proto/user"
	userSVC "github.com/gerardmrk/erogen/svc/user"
	"golang.org/x/net/context"
)

type UserRPC struct {
	repo       userSVC.UserRepo
	authClient authpb.AuthServiceClient
}

func (rpc *UserRPC) Login(ctx context.Context, req *userpb.LoginRequest) (*userpb.LoginResponse, error) {
	user, err := rpc.repo.FindByAlias(req.GetAliasType(), req.GetAlias())
	if err != nil {
		return nil, err
	}

	validPassword, err := passwordhash.CheckPasswordString(req.GetPassword(), user.Password)
	if err != nil {
		return nil, err
	}

	resp := new(userpb.LoginResponse)
	resp.Success = validPassword

	if req.IncludeTokens == true {
		// TODO: consul connect
		tokens, err := rpc.authClient.Tokens(ctx, &authpb.TokensRequest{
			UserId:         user.ID,
			IncludeIdToken: true,
		})

		if err != nil {
			return nil, err
		}
		resp.Payload = &userpb.LoginResponse_TokenPayload{
			IdToken:      tokens.IdToken,
			AccessToken:  tokens.AccessToken,
			RefreshToken: tokens.RefreshToken,
			TokenType:    tokens.TokenType,
			Scope:        tokens.Scope,
			ExpiresIn:    tokens.ExpiresIn,
		}
	}

	return resp, nil
}

func (rpc *UserRPC) Register(ctx context.Context, req *userpb.RegisterRequest) (*userpb.RegisterResponse, error) {
	panic("implement me")
}

func (rpc *UserRPC) ForgotPassword(ctx context.Context, req *userpb.ForgotPasswordRequest) (*userpb.ForgotPasswordResponse, error) {
	panic("implement me")
}

func (rpc *UserRPC) ResetPassword(ctx context.Context, req *userpb.ResetPasswordRequest) (*userpb.ResetPasswordResponse, error) {
	panic("implement me")
}

func (rpc *UserRPC) ValidateToken(ctx context.Context, req *userpb.ValidateTokenRequest) (*userpb.ValidateTokenResponse, error) {
	panic("implement me")
}

func (rpc *UserRPC) ChangeEmail(ctx context.Context, req *userpb.ChangeEmailRequest) (*userpb.ChangeEmailResponse, error) {
	panic("implement me")
}

func (rpc *UserRPC) ChangeUsername(ctx context.Context, req *userpb.ChangeUsernameRequest) (*userpb.ChangeUsernameResponse, error) {
	panic("implement me")
}

func (rpc *UserRPC) ChangePassword(ctx context.Context, req *userpb.ChangePasswordRequest) (*userpb.ChangePasswordResponse, error) {
	panic("implement me")
}

func (rpc *UserRPC) VerifySecurityQA(ctx context.Context, req *userpb.VerifySecurityQARequest) (*userpb.VerifySecurityQAResponse, error) {
	panic("implement me")
}

func (rpc *UserRPC) Update(ctx context.Context, req *userpb.UpdateRequest) (*userpb.UpdateResponse, error) {
	panic("implement me")
}

func (rpc *UserRPC) Delete(ctx context.Context, req *userpb.DeleteRequest) (*userpb.UpdateResponse, error) {
	panic("implement me")
}

func (rpc *UserRPC) User(ctx context.Context, req *userpb.UserRequest) (*userpb.UserResponse, error) {
	panic("implement me")
}

func (rpc *UserRPC) Users(req *userpb.UsersRequest, srv userpb.UserService_UsersServer) error {
	panic("implement me")
}
