import { mapErrorToApiResponse } from "../../utils/mapErrorToApiResponse";
import { CompanyRepository } from "../../../domain/Companies/CompanyRepository";
import { EditCompany } from "../../services/EditCompany";

export const patchCompany = async (req, res) => {
  try {
    let status = 422;
    const event = EditCompany.call(req.params.id, req.body, new CompanyRepository());
    if (event.isSuccess()) status = 200;
    res.status(status).json(event);
  } catch (error) {
    const { status, message } = mapErrorToApiResponse(error);
    res.status(status).json({ message });
  }
};
