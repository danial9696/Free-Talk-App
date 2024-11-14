import { Router } from "express"

const { signIn } = require("../../controllers/auth")

const router = Router()

router.post("/signin", signIn)

export { router as signinRouter }
