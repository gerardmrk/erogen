export type AccountSettings = {
  email: string;
};

export type ProfileSettings = {
  username: string;
  profilePicUrl: string;
};

export type BillingSettings = {};

export type User = {
  profile: ProfileSettings;
  account: AccountSettings;
  billing: BillingSettings;
};
