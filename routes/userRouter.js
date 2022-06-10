import { Router } from "express"

import { getUser, ranking } from "../controllers/userController.js"
import { validateToken } from "../middlewares/authMiddleware.js"

const userRouter = Router()

userRouter.get("/users/:id", validateToken, getUser)
userRouter.get("/ranking", ranking)

export default userRouter
