import {
  IAuthService,
  LoginParams,
  LoginResp,
  RegisterParams,
} from "./definitions";
export * from "./definitions";

export class AuthService implements IAuthService {
  public constructor() {}

  login(params: LoginParams): LoginResp {
    return {
      success: true,
      code: 200,
      mfaRequired: false,
      authKeys: {
        idToken: "###",
        accessToken: "###",
        refreshToken: "###",
      },
    };
  }

  logout(): void {
    return;
  }

  register(params: RegisterParams): void {
    return;
  }

  verifyEmailVToken(userId: string, token: string): void {
    return;
  }

  verifyMobileVCode(userId: string, code: string): void {
    return;
  }

  verifyMFACode(code: string): void {
    return;
  }

  enableMFA(): void {
    return;
  }

  requestPasswordReset(email: string): void {
    return;
  }

  verifyPasswordResetToken(userId: string, token: string): void {
    return;
  }

  resetPassword(newPassword: string): void {
    return;
  }

  changeEmail(userId: string, currentEmail: string, newEmail: string): void {
    return;
  }

  changeOrAddMobile(newMobile: string): void {
    return;
  }

  changePassword(currentPassword: string, newPassword: string): void {
    return;
  }

  answerSecurityQuestion(questionId: string, answer: string): void {
    return;
  }
}
