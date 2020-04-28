import express from "express";
import { postNewAccount } from "../actions/IdentityAndAccess/postNewAccount";
import { postNewSession } from "../actions/IdentityAndAccess/postNewSession";
const router = express.Router();

router.post("/register", postNewAccount);
router.post("/login", postNewSession);

export { router };
