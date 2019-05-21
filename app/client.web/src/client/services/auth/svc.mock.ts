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
} from "@client/__fixtures__/mock";
import { recordMock } from "@client/__fixtures__/mock-recorder";
import { FunctionKeys } from "utility-types";

@recordMock()
export class MockAuthService implements IAuthService, IMock<MockAuthService> {
  public constructor() {}

  /*****************************************************************************
   * Recorder methods
   ****************************************************************************/

  public returns: ReturnsMap<IAuthService, FunctionKeys<IAuthService>> = new Map(); // prettier-ignore
  public throws: ThrowsMap<IAuthService, FunctionKeys<IAuthService>> = new Map(); // prettier-ignore
  public recorded: RecordedMap<IAuthService, FunctionKeys<IAuthService>> = new Map(); // prettier-ignore

  public resetAll() {
    this.returns.clear();
    this.throws.clear();
    this.recorded.clear();
  }

  public resetFor(n: FunctionKeys<IAuthService>) {
    this.returns.delete(n);
    this.throws.delete(n);
    this.recorded.delete(n);
  }

  public throwFor(n: FunctionKeys<IAuthService>, err: Error) {
    this.throws.set(n, err);
  }

  public returnFor(n: FunctionKeys<IAuthService>, ret: any) {
    this.returns.set(n, ret);
  }

  /*****************************************************************************
   * Actual methods
   ****************************************************************************/

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
