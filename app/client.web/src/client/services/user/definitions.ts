import {
  AccountSettings,
  ProfileSettings,
  BillingSettings,
} from "@client/store/state.user/models";

export interface IUserService {
  get(): Promise<{
    profile: ProfileSettings;
    account: AccountSettings;
    billing: BillingSettings;
  }>;

  getProfile(): Promise<ProfileSettings>;

  updateProfile(): Promise<ProfileSettings>;

  getAccount(): Promise<AccountSettings>;

  updateAccount(): Promise<AccountSettings>;

  getBilling(): Promise<BillingSettings>;

  updateBilling(): Promise<BillingSettings>;
}
