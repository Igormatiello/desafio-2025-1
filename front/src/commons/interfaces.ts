export interface IUserSignup {
  displayName: string;
  username: string;
  password: string;
  email: string;
}

export interface IUserLogin {
  username: string;
  password: string;
  totp: string;
}
