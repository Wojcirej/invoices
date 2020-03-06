const isGetRequest = (requestType): boolean => {
  return requestType === "GET";
};

const isInvalidContentType = (contentType): boolean => {
  return contentType !== "application/json";
};

const isParsedRequestBody = (req): boolean => {
  const parsedBody = req.body;
  const parsedBodyLength = JSON.stringify(parsedBody).length;
  const contentLength = Number(req.headers["content-length"]);
  return parsedBodyLength !== contentLength;
};

const unsupportedMediaTypeResponse = {
  message: "Unsupported media type - please make sure you have set 'Content-Type' header to 'application/json'."
};

export const ensureJSONMediaType = async (req, res, next) => {
  if (isGetRequest(req.method)) {
    if (isInvalidContentType(req.headers["content-type"])) {
      res.status(415).json(unsupportedMediaTypeResponse);
    }
  } else {
    if (isInvalidContentType(req.headers["content-type"]) && isParsedRequestBody(req)) {
      res.status(415).json(unsupportedMediaTypeResponse);
    }
  }
  next();
};
