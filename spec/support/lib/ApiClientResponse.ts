export interface ApiClientResponse {
  endpoint: string;
  method: string;
  requestHeaders;
  requestBody;
  responseStatus: number;
  responseHeaders;
  responseBody;
}
