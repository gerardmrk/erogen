import {
  IAuthService,
  LoginParams,
  LoginResp,
  RegisterParams,
} from "./definitions";
import { sleep } from "@client/utils/sleep";

export class StaticAuthService implements IAuthService {
  public constructor() {}

  public async login(params: LoginParams): Promise<LoginResp> {
    await sleep(1000);
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

  public async logout(): Promise<void> {
    await sleep(415);
    return;
  }

  public async register(params: RegisterParams): Promise<void> {
    await sleep(1000);
    return;
  }

  public async verifyEmailVToken(userId: string, token: string): Promise<void> {
    return;
  }

  public async verifyMobileVCode(userId: string, code: string): Promise<void> {
    return;
  }

  public async verifyMFACode(code: string): Promise<void> {
    return;
  }

  public async enableMFA(): Promise<void> {
    return;
  }

  public async requestPasswordReset(email: string): Promise<void> {
    return;
  }

  public async verifyPasswordResetToken(
    userId: string,
    token: string,
  ): Promise<void> {
    return;
  }

  public async resetPassword(newPassword: string): Promise<void> {
    return;
  }

  public async changeEmail(
    userId: string,
    currentEmail: string,
    newEmail: string,
  ): Promise<void> {
    return;
  }

  public async changeOrAddMobile(newMobile: string): Promise<void> {
    return;
  }

  public async changePassword(
    currentPassword: string,
    newPassword: string,
  ): Promise<void> {
    return;
  }

  public async answerSecurityQuestion(
    questionId: string,
    answer: string,
  ): Promise<void> {
    return;
  }
}
