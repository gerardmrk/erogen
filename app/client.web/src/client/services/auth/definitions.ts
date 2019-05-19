// prettier-ignore
export interface IAuthService {
  login(params: LoginParams): LoginResp;

  logout(): void;

  register(params: RegisterParams): void;

  verifyEmailVToken(userId: string, token: string): void;

  verifyMobileVCode(userId: string, code: string): void;

  verifyMFACode(code: string): void;

  enableMFA(): void;

  requestPasswordReset(email: string): void;

  verifyPasswordResetToken(userId: string, token: string): void;

  resetPassword(newPassword: string): void;

  changeEmail(userId: string, currentEmail: string, newEmail: string): void;

  changeOrAddMobile(newMobile: string): void;

  changePassword(currentPassword: string, newPassword: string): void;

  answerSecurityQuestion(questionId: string, answer: string): void;
}

export interface BaseAuthResp {
  success: boolean;
  code: number;
  message?: string;
}

export interface LoginParams {
  alias: string;
  password: string;
  remember: boolean;
}

export interface LoginResp extends BaseAuthResp {
  mfaRequired: boolean;
  authKeys: AuthKeys;
}

export interface RegisterParams {
  username: string;
  email: string;
  password: string;
}

export type AuthKeys = {
  idToken?: string;
  accessToken: string;
  refreshToken?: string;
};
