/*
  Rutas de Usuarios / Auth
  host + /api/auth
*/

import express from "express";
import { check } from "express-validator";
import { createUser, loginUser, renewToken } from "../controllers/auth";
import { fieldsValidator } from "../middlewares/fields-validator";

const router = express.Router();

router.post(
  "/new",
  [
    //middlewares
    check("name", "Name is required").not().isEmpty(),
    check("email", "Email is required").isEmail(),
    check("password", "Password must contain 6 at least chracter(s)").isLength({
      min: 6,
    }),
    fieldsValidator,
  ],
  createUser
);

router.post(
  "/",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password must contain at least 6 chracter(s)").isLength({
      min: 6,
    }),
    fieldsValidator,
  ],
  loginUser
);

router.get("/renew", renewToken);

export default router;
