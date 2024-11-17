import mongoose from "mongoose"
import { CreatePostDto, PostDoc, PostModel } from "./types"

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  content: {
    type: String,
    required: true,
  },

  images: {
    src: {
      type: String,
      required: true,
    },
  },

  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
})

PostSchema.statics.build = (createUserDto: CreatePostDto) =>
  new Post(createUserDto)

const Post = mongoose.model<PostDoc, PostModel>("Post", PostSchema)

export default Post
