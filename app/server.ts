import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";

import { router as defaultRouter } from "./routes/default";
import { router as healthCheckRouter } from "./routes/healthcheck";

const app = express();

app.use(morgan("combined"));
app.use(bodyParser.json());

app.use("/app_status", healthCheckRouter);
app.use("*", defaultRouter);

export default app;
