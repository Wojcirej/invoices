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
    const responseHeaders = await response.headers.raw();
    return ApiClient.requestResponse(path, "GET", headers, {}, status, responseHeaders, body);
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
    const responseHeaders = await response.headers.raw();
    return ApiClient.requestResponse(path, "POST", headers, requestBody, status, responseHeaders, body);
  }

  async makePutRequest({ endpoint, requestBody = {}, headers = {} }): Promise<ApiClientResponse> {
    const path = `${this.url}/${endpoint}`;
    const response = await fetch(path, {
      method: "PUT",
      body: JSON.stringify(requestBody),
      headers
    });
    const status = await response.status;
    const body = await response.json();
    const responseHeaders = await response.headers.raw();
    return ApiClient.requestResponse(path, "POST", headers, requestBody, status, responseHeaders, body);
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
    const responseHeaders = await response.headers.raw();
    return ApiClient.requestResponse(path, "POST", headers, requestBody, status, responseHeaders, body);
  }

  async makeDeleteRequest({ endpoint, headers = {} }): Promise<ApiClientResponse> {
    const path = `${this.url}/${endpoint}`;
    const response = await fetch(path, {
      method: "DELETE",
      headers
    });
    const status = await response.status;
    const body = await response.json();
    const responseHeaders = await response.headers.raw();
    return ApiClient.requestResponse(path, "DELETE", headers, {}, status, responseHeaders, body);
  }

  private static requestResponse(
    endpoint,
    method,
    requestHeaders,
    requestBody,
    responseStatus,
    responseHeaders,
    responseBody
  ): ApiClientResponse {
    return {
      endpoint,
      method,
      requestHeaders,
      requestBody,
      responseStatus,
      responseHeaders,
      responseBody
    };
  }
}
