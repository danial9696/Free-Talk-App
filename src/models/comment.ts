import mongoose from "mongoose"
import { CommentDoc, CommentModel, CreateCommentDto } from "./types"

const CommentSchema = new mongoose.Schema({
  userName: {
    type: String,
  },
  content: {
    type: String,
    required: true,
  },
})

CommentSchema.statics.build = (createCommentDto: CreateCommentDto) =>
  new Comment(createCommentDto)

const Comment = mongoose.model<CommentDoc, CommentModel>(
  "Comment",
  CommentSchema
)

export default Comment
