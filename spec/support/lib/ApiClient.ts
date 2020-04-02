import fetch from "node-fetch";
import { ApiClientResponse } from "./ApiClientResponse";

export class ApiClient {
  private readonly url: string;

  constructor(url) {
    this.url = url;
  }

  async makeGetRequest({ endpoint, headers = {} }): Promise<ApiClientResponse> {
    const path = `${this.url}/${endpoint}`;
    const response = await fetch(path, {
      method: "GET",
      headers
    });
    const status = await response.status;
    const body = await response.json();
    return ApiClient.requestResponse(path, "GET", headers, {}, status, body);
  }

  async makePostRequest({ endpoint, requestBody = {}, headers = {} }): Promise<ApiClientResponse> {
    const path = `${this.url}/${endpoint}`;
    const response = await fetch(path, {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers
    });
    const status = await response.status;
    const body = await response.json();
    return ApiClient.requestResponse(path, "POST", headers, requestBody, status, body);
  }

  async makePatchRequest({ endpoint, requestBody = {}, headers = {} }): Promise<ApiClientResponse> {
    const path = `${this.url}/${endpoint}`;
    const response = await fetch(path, {
      method: "PATCH",
      body: JSON.stringify(requestBody),
      headers
    });
    const status = await response.status;
    const body = await response.json();
    return ApiClient.requestResponse(path, "POST", headers, requestBody, status, body);
  }

  async makeDeleteRequest({ endpoint, headers = {} }): Promise<ApiClientResponse> {
    const path = `${this.url}/${endpoint}`;
    const response = await fetch(path, {
      method: "DELETE",
      headers
    });
    const status = await response.status;
    const body = await response.json();
    return ApiClient.requestResponse(path, "DELETE", headers, {}, status, body);
  }

  private static requestResponse(
    endpoint,
    method,
    requestHeaders,
    requestBody,
    responseStatus,
    responseBody
  ): ApiClientResponse {
    return {
      endpoint,
      method,
      requestHeaders,
      requestBody,
      responseStatus,
      responseBody
    };
  }
}
