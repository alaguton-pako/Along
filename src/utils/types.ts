export interface LogInProps {
  email: string;
  password: string;
}
export interface ResetPassWordProps {
  tokken: string;
  new_password: string;
  confirm_new_password: string;
}
export interface ForgotPassWordProps {
  email: string;
}

export interface SignUpProps {
  name: string;
  user_name: string;
  email: string;
  password: string;
  confirm_password: string;
  terms_and_policy: boolean;
  account_type: string;
}
