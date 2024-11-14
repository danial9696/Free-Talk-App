import { Router } from "express"

const { getPost } = require("../../controllers/posts")

const router = Router()

router.get("/api/post/show/:id", getPost)

export { router as showPostRouter }
