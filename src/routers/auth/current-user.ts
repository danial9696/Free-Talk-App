import { Router } from "express"
import { currentUser } from "../../../common/src/middlewares/current-user"

const { currentUserHandler } = require("../../controllers/auth")

const router = Router()

router.get("/current-user", currentUser, currentUserHandler)

export { router as currentUserRouter }
