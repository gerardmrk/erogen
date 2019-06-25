import {
  IAuthService,
  LoginParams,
  LoginResp,
  RegisterParams,
} from "./definitions";
export * from "./definitions";

export class AuthService implements IAuthService {
  public constructor() {}

  public async login(params: LoginParams): Promise<LoginResp> {
    throw new Error("Method not implemented.");
  }

  public async logout(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  public async register(params: RegisterParams): Promise<void> {
    throw new Error("Method not implemented.");
  }

  public async verifyEmailVToken(userId: string, token: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  public async verifyMobileVCode(userId: string, code: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  public async verifyMFACode(code: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  public async enableMFA(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  public async requestPasswordReset(email: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  public async verifyPasswordResetToken(
    userId: string,
    token: string,
  ): Promise<void> {
    throw new Error("Method not implemented.");
  }

  public async resetPassword(newPassword: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  public async changeEmail(
    userId: string,
    currentEmail: string,
    newEmail: string,
  ): Promise<void> {
    throw new Error("Method not implemented.");
  }

  public async changeOrAddMobile(newMobile: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  public async changePassword(
    currentPassword: string,
    newPassword: string,
  ): Promise<void> {
    throw new Error("Method not implemented.");
  }

  public async answerSecurityQuestion(
    questionId: string,
    answer: string,
  ): Promise<void> {
    throw new Error("Method not implemented.");
  }

  public async checkUsernameExists(username: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}
