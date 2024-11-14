import { Request, Response, NextFunction } from "express"
import Comment from "../models/comment"
import Post from "../models/post"
import { BadReqError } from "common/src/errors/bad-req-error"

exports.createComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userName, content } = req.body

  const { postId } = req.params

  if (!content) return next(new BadReqError("content is required!"))

  if (!postId) return next(new BadReqError("postId is required!"))

  const newComment = new Comment({
    userName: userName ?? "anonymous",
    content,
  })

  try {
    await newComment.save()

    const commentedPost = await Post.findByIdAndUpdate(
      {
        _id: postId,
      },
      {
        $push: { comments: newComment },
      },
      {
        new: true,
      }
    )

    res.status(200).json(commentedPost)
  } catch (err: any) {
    const error = new Error("Comment cannot be created") as CustomError
    error.status = 401
    console.error("Create comment unhandled error:", err.message)
    next(error)
  }
}

exports.deleteComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { commentId, postId } = req.params

  if (!commentId) return next(new BadReqError("CommentId is required"))

  if (!postId) return next(new BadReqError("PostId is required"))

  try {
    await Comment.findByIdAndRemove({
      _id: commentId,
    })

    await Post.findByIdAndUpdate(
      {
        _id: commentId,
      },
      {
        $pull: { comments: commentId },
      }
    )

    res
      .status(201)
      .json({ success: true, message: "Comment deleted successfully" })
  } catch (err) {
    next(new Error("Comment cannot be deleted"))
  }
}
