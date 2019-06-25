// prettier-ignore
export interface IAuthService {
  login(params: LoginParams): Promise<LoginResp>;

  logout(): Promise<void>;

  register(params: RegisterParams): Promise<void>;

  verifyEmailVToken(userId: string, token: string): Promise<void>;

  verifyMobileVCode(userId: string, code: string): Promise<void>;

  verifyMFACode(code: string): Promise<void>;

  enableMFA(): Promise<void>;

  requestPasswordReset(email: string): Promise<void>;

  verifyPasswordResetToken(userId: string, token: string): Promise<void>;

  resetPassword(newPassword: string): Promise<void>;

  changeEmail(userId: string, currentEmail: string, newEmail: string): Promise<void>;

  changeOrAddMobile(newMobile: string): Promise<void>;

  changePassword(currentPassword: string, newPassword: string): Promise<void>;

  answerSecurityQuestion(questionId: string, answer: string): Promise<void>;

  checkUsernameExists(username: string): Promise<boolean>;
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
