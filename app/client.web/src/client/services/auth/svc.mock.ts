import {
  IAuthService,
  LoginParams,
  LoginResp,
  RegisterParams,
} from "./definitions";
import { IMockService } from "../definitions";

export class MockAuthService implements IAuthService, IMockService {
  public constructor() {}

  public resetMocks() {}

  public login(params: LoginParams): LoginResp {
    throw new Error("Method not implemented.");
  }

  public logout(): void {
    throw new Error("Method not implemented.");
  }

  public register(params: RegisterParams): void {
    throw new Error("Method not implemented.");
  }

  public verifyEmailVToken(userId: string, token: string): void {
    throw new Error("Method not implemented.");
  }

  public verifyMobileVCode(userId: string, code: string): void {
    throw new Error("Method not implemented.");
  }

  public verifyMFACode(code: string): void {
    throw new Error("Method not implemented.");
  }

  public enableMFA(): void {
    throw new Error("Method not implemented.");
  }

  public requestPasswordReset(email: string): void {
    throw new Error("Method not implemented.");
  }

  public verifyPasswordResetToken(userId: string, token: string): void {
    throw new Error("Method not implemented.");
  }

  public resetPassword(newPassword: string): void {
    throw new Error("Method not implemented.");
  }

  public changeEmail(
    userId: string,
    currentEmail: string,
    newEmail: string,
  ): void {
    throw new Error("Method not implemented.");
  }

  public changeOrAddMobile(newMobile: string): void {
    throw new Error("Method not implemented.");
  }

  public changePassword(currentPassword: string, newPassword: string): void {
    throw new Error("Method not implemented.");
  }

  public answerSecurityQuestion(questionId: string, answer: string): void {
    throw new Error("Method not implemented.");
  }
}
