import { ApiClient } from "./ApiClient";
import { baseUrl } from "../testServer";

const apiClient = new ApiClient(baseUrl);

export { apiClient };
