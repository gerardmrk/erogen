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

  public login(params: LoginParams): LoginResp {
    throw new Error("Method not implemented.");
  }

  public logout(): void {
    return;
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
