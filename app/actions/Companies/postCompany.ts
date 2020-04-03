import { CompanyRepository } from "../../../domain/Companies/CompanyRepository";
import { CreateCompany } from "../../services/CreateCompany";

export const postCompany = async (req, res) => {
  let status = 422;
  const event = CreateCompany.call(req.body, new CompanyRepository());
  if (event.isSuccess()) status = 201;
  res.status(status).json(event);
};
