import { Router } from "express"

import { shorten } from "../controllers/urlController.js"
import { validateToken } from "../middlewares/authMiddleware.js"
import { validateURL } from "../middlewares/urlMiddleware.js"

const urlRouter = Router()

urlRouter.post("/urls/shorten", validateToken, validateURL, shorten)

export default urlRouter
