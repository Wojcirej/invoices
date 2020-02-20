import express from "express";
const router = express.Router();

import { statusHandler } from "./../actions/status";

router.get("/", statusHandler);

export { router };
