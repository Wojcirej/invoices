import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";

import { router as defaultRouter } from "./routes/default";
import { router as healthCheckRouter } from "./routes/healthcheck";
import { router as invoicesRouter } from "./routes/invoices";
import { router as companiesRouter } from "./routes/companies";
import { router as identityAndAccessRouter } from "./routes/identityAndAccess";
import { ensureJSONMediaType } from "./middleware/ensureJSONMediaType";

const app = express();

app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(ensureJSONMediaType);

app.use("/app_status", healthCheckRouter);
app.use("/invoices", invoicesRouter);
app.use("/companies", companiesRouter);
app.use("/", identityAndAccessRouter);
app.use("*", defaultRouter);

export default app;
