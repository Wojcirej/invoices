import { AuthenticatedAccount } from "../AuthenticatedAccount";

export interface AccountSession {
  account: AuthenticatedAccount;
  token: string;
}
