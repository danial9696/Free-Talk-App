import { Router } from "express"

const { deletePost } = require("../../controllers/posts")

const router = Router()

router.post("/api/post/delete/:id", deletePost)

export { router as deletePostRouter }
