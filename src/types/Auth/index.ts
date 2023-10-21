export interface I_Login {
  email: string;
  password: string;
}

export interface Register extends I_Login {
  reapeatPassword: string;
}
