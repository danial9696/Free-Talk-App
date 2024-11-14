import { Router } from "express"

const { createNewPost } = require("../../controllers/posts")

const router = Router()

router.post("/api/post/new", createNewPost)

export { router as newPostRouter }
