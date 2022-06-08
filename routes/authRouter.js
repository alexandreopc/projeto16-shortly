import { Router } from "express"

import {
  validateSignIn,
  validateSignUp,
} from "../middlewares/authMiddleware.js"
import { signIn, signUp } from "./../controllers/authController.js"

const authRouter = Router()

authRouter.post("/signup", validateSignUp, signUp)

export default authRouter
