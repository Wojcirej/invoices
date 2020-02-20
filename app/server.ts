import express from "express";
import morgan from "morgan";

import { router as defaultRouter } from "./routes/default";

const app = express();

app.use(morgan("combined"));

app.use("*", defaultRouter);

export default app;
