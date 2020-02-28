import express from "express";
const router = express.Router();

import { getAppStatus } from "./../actions/getAppStatus";

router.get("/", getAppStatus);

export { router };
