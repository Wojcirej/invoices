import { mapErrorToApiResponse } from "../../utils/mapErrorToApiResponse";
import { CompanyRepository } from "../../../domain/Companies/CompanyRepository";
import { UpdateCompany } from "../../../domain/Companies/services/UpdateCompany";

export const patchCompany = async (req, res) => {
  try {
    let status = 422;
    const event = UpdateCompany.call(req.params.id, req.body, new CompanyRepository());
    if (event.isSuccess()) status = 200;
    res.status(status).json(event);
  } catch (error) {
    const { status, message } = mapErrorToApiResponse(error);
    res.status(status).json({ message });
  }
};
