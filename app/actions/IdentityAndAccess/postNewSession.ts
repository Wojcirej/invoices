import { AccountsRepository } from "../../../domain/IdentityAndAccess/repositories/AccountsRepository";
import { Login } from "../../../domain/IdentityAndAccess/services/Login";
import { mapErrorToApiResponse } from "../../utils/mapErrorToApiResponse";

export const postNewSession = async (req, res) => {
  try {
    const { account, token } = Login.call(req.body, new AccountsRepository());
    res
      .header("X-USER-ACCESS-TOKEN", token)
      .status(201)
      .json(account);
  } catch (error) {
    const { status, message } = mapErrorToApiResponse(error);
    res.status(status).json({ message });
  }
};
