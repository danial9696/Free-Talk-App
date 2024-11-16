import { NextFunction, Request, Response } from "express"
import Post from "../models/post"
import { BadReqError } from "common/src/errors/bad-req-error"
import { User } from "src/models/user"

exports.createNewPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, content } = req.body

  if (!title) return next(new BadReqError("Title is required"))
  if (!content) return next(new BadReqError("Content is required"))

  const newPost = Post.build({
    title,
    content,
  })

  await newPost.save()

  await User.findByIdAndUpdate(
    {
      _id: req.currentUser.userId,
    },
    {
      $push: {
        posts: newPost._id,
      },
    }
  )

  res.status(201).json({
    newPost,
  })
}

exports.updatePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params
  const { title, content } = req.body

  if (!id) return next(new BadReqError("Id is required"))

  try {
    const updatedPost = await Post.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        $set: { content, title },
      },
      { new: true }
    )

    res.status(201).json({ updatedPost })
  } catch (err) {
    next(new Error("Post cannot be updated"))
  }
}

exports.deletePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params

  if (!id) if (!id) return next(new BadReqError("Id is required"))

  try {
    const deletedPost = await Post.findByIdAndRemove({
      _id: id,
    })

    await User.findByIdAndUpdate(
      {
        _id: req.currentUser._id,
      },
      {
        $pull: { posts: id },
      },
      {
        new: true,
      }
    )

    res
      .status(201)
      .json({
        success: true,
        message: "Post deleted successfully",
        data: deletedPost,
      })
  } catch (err) {
    next(new Error("Post cannot be deleted"))
  }
}

exports.getPost = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params

  if (!id) return next(new BadReqError("Id is required"))

  try {
    const foundedPost = await Post.findOne({
      _id: id,
    }).populate("comments")

    res.status(200).json({ success: true, data: foundedPost })
  } catch (err) {
    next(new Error("Post cannot be founded"))
  }
}
