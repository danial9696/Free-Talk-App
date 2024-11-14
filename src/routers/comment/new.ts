import { Router } from "express"

const router = Router()

const { createComment } = require("../../controllers/comments")

router.post("/api/new/comment/:postId", createComment)

export { router as newCommentRouter }
