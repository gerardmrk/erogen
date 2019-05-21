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
    throw new Error("Method not implemented.");
  }

  logout(): void {
    throw new Error("Method not implemented.");
  }

  register(params: RegisterParams): void {
    throw new Error("Method not implemented.");
  }

  verifyEmailVToken(userId: string, token: string): void {
    throw new Error("Method not implemented.");
  }

  verifyMobileVCode(userId: string, code: string): void {
    throw new Error("Method not implemented.");
  }

  verifyMFACode(code: string): void {
    throw new Error("Method not implemented.");
  }

  enableMFA(): void {
    throw new Error("Method not implemented.");
  }

  requestPasswordReset(email: string): void {
    throw new Error("Method not implemented.");
  }

  verifyPasswordResetToken(userId: string, token: string): void {
    throw new Error("Method not implemented.");
  }

  resetPassword(newPassword: string): void {
    throw new Error("Method not implemented.");
  }

  changeEmail(userId: string, currentEmail: string, newEmail: string): void {
    throw new Error("Method not implemented.");
  }

  changeOrAddMobile(newMobile: string): void {
    throw new Error("Method not implemented.");
  }

  changePassword(currentPassword: string, newPassword: string): void {
    throw new Error("Method not implemented.");
  }

  answerSecurityQuestion(questionId: string, answer: string): void {
    throw new Error("Method not implemented.");
  }
}
