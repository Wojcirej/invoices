import { Register } from "../../../domain/IdentityAndAccess/services/Register";
import { AccountsRepository } from "../../../domain/IdentityAndAccess/repositories/AccountsRepository";

export const postNewAccount = async (req, res) => {
  let status = 422;
  const event = Register.call(req.body, new AccountsRepository());
  if (event.wasSuccessful()) status = 201;
  res.status(status).json(event);
};
