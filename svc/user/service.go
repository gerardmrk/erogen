package main

import (
	"context"
	"gitlab.com/erogen_org/erogen/proto/user"
)

func main() {

}

type UserService struct{}

func (svc *UserService) Login(ctx context.Context, request *user.LoginRequest) (response *user.LoginResponse, error) {
	panic("implement me")
}

func (svc *UserService) Register(context.Context, *RegisterRequest) (*RegisterResponse, error) {
	panic("implement me")
}

func (svc *UserService) ForgotPassword(context.Context, *ForgotPasswordRequest) (*ForgotPasswordResponse, error) {
	panic("implement me")
}

func (UserService) ResetPassword(context.Context, *ResetPasswordRequest) (*ResetPasswordResponse, error) {
	panic("implement me")
}

func (UserService) ValidateToken(context.Context, *ValidateTokenRequest) (*ValidateTokenResponse, error) {
	panic("implement me")
}

func (UserService) ChangeEmail(context.Context, *ChangeEmailRequest) (*ChangeEmailResponse, error) {
	panic("implement me")
}

func (UserService) ChangeUsername(context.Context, *ChangeUsernameRequest) (*ChangeUsernameResponse, error) {
	panic("implement me")
}

func (UserService) ChangePassword(context.Context, *ChangePasswordRequest) (*ChangePasswordResponse, error) {
	panic("implement me")
}

func (UserService) VerifySecurityQA(context.Context, *VerifySecurityQARequest) (*VerifySecurityQAResponse, error) {
	panic("implement me")
}

func (UserService) Update(context.Context, *UpdateRequest) (*UpdateResponse, error) {
	panic("implement me")
}

func (UserService) Delete(context.Context, *DeleteRequest) (*UpdateResponse, error) {
	panic("implement me")
}

func (UserService) User(context.Context, *UserRequest) (*UserResponse, error) {
	panic("implement me")
}

func (UserService) Users(*UsersRequest, UserService_UsersServer) error {
	panic("implement me")
}
