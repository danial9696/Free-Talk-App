import { Router } from "express"

import jwt from "jsonwebtoken"
// import { BadRequestError, validationRequest } from '../../../common'
import { body } from "express-validator"

const { signUp } = require("../../controllers/auth")

const router = Router()

router.post(
  "/signup",
  // [
  //   body("email")
  //     .not()
  //     .isEmpty()
  //     .isEmail()
  //     .withMessage("a valid email is required"),

  //   body("password")
  //     .not()
  //     .isEmpty()
  //     .isLength({ min: 6 })
  //     .withMessage("a valid password is required"),
  // ],
  // "validationRequest",
  signUp
)

export { router as signupRouter }
