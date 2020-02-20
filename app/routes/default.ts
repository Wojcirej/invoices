import express from "express";
const router = express.Router();

const supportedMethods = ["get", "post", "put", "patch", "delete"];

supportedMethods.forEach(method => {
  router[method]("*", (_, response) => {
    response.status(404).json({
      application: "Invoices API",
      message: "The page you're looking for doesn't exist."
    });
  });
});

export { router };
