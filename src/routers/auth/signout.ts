import { Router } from "express"

const router = Router()

const { signOut } = require("../../controllers/auth")

router.post("/signout", signOut)

export { router as signoutRouter }
