import { Router } from "express"

const router = Router()

const { deleteComment } = require("../../controllers/comments")

router.post("/api/comment/:commentId/delete/:postId", deleteComment)

export { router as deleteCommentRouter }
