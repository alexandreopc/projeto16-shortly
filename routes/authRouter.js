import { Router } from "express"

import {
  validateSignIn,
  validateSignUp,
} from "../middlewares/authMiddleware.js"
import { signIn, signUp } from "./../controllers/authController.js"

const authRouter = Router()

authRouter.post("/signup", validateSignUp, signUp)
authRouter.post("/signin", validateSignIn, signIn)

export default authRouter
