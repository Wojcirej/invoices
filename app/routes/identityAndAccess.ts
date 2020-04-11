import express from "express";
import { postNewAccount } from "../actions/IdentityAndAccess/postNewAccount";
const router = express.Router();

router.post("/register", postNewAccount);

export { router };
