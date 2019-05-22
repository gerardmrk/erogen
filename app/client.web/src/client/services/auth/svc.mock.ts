import {
  IAuthService,
  LoginParams,
  LoginResp,
  RegisterParams,
} from "./definitions";
import {
  IMock,
  RecordedMap,
  ThrowsMap,
  ReturnsMap,
  RecordableName,
} from "@client/__fixtures__/mock";
import { recordMock } from "@client/__fixtures__/mock-recorder";

@recordMock()
export class MockAuthService implements IAuthService, IMock<MockAuthService> {
  public constructor() {}

  /*****************************************************************************
   * Recorder methods
   ****************************************************************************/

  public returns: ReturnsMap<IAuthService, RecordableName<IAuthService>> = new Map(); // prettier-ignore
  public throws: ThrowsMap<IAuthService, RecordableName<IAuthService>> = new Map(); // prettier-ignore
  public records: RecordedMap<IAuthService, RecordableName<IAuthService>> = new Map(); // prettier-ignore

  public resetAll() {
    this.returns.clear();
    this.throws.clear();
    this.records.clear();
  }

  public resetFor(n: RecordableName<IAuthService>) {
    this.returns.delete(n);
    this.throws.delete(n);
    this.records.delete(n);
  }

  public throwFor(n: RecordableName<IAuthService>, err: Error) {
    this.throws.set(n, err);
  }

  public returnFor(n: RecordableName<IAuthService>, ret: any) {
    this.returns.set(n, ret);
  }

  public recorded(n: RecordableName<IAuthService>) {
    return this.records.get(n) || { count: 0, args: [], rets: [] };
  }

  /*****************************************************************************
   * Actual methods
   ****************************************************************************/

  public async login(params: LoginParams): Promise<LoginResp> {
    return {
      code: 200,
      success: true,
      mfaRequired: false,
      authKeys: { accessToken: "###" },
    };
  }

  public async logout(): Promise<void> {
    return;
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
}
