import { uploadImages } from "common/src/middlewares/upload-img"
import { Router } from "express"

const { createNewPost } = require("../../controllers/posts")

const router = Router()

router.post("/api/post/new", uploadImages, createNewPost)

export { router as newPostRouter }
