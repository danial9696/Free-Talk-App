import { Router } from "express"

const { updatePost } = require("../../controllers/posts")

const router = Router()

router.post("/api/post/update/:id", updatePost)

export { router as updatePostRouter }
