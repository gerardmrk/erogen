export type AccountSettings = {
  id: string;
  email: string;
};

export type ProfileSettings = {
  username: string;
  displayPicUrl: string | undefined;
};

export type BillingSettings = {};

export type User = {
  profile: ProfileSettings;
  account: AccountSettings;
  billing: BillingSettings;
};
