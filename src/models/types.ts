import mongoose from "mongoose"

// * Start - Users
export interface UserDoc extends mongoose.Document {
  email: string
  password: string
  posts?: PostDoc[]
}

export interface CreateUserDto {
  email: string
  password: string
  posts?: PostDoc[]
}

export interface UserModel extends mongoose.Model<UserDoc> {
  build: (dto: CreateUserDto) => UserDoc
}
// * End - Users

// * Start - Posts
export interface PostDoc extends mongoose.Document {
  title: string
  content: string
  comments?: CommentDoc[]
}

export interface CreatePostDto {
  title: string
  content: string
  comments?: CommentDoc[]
}

export interface PostModel extends mongoose.Model<PostDoc> {
  build: (dto: CreatePostDto) => PostDoc
}
// * End - Posts

// * Start - Comments
export interface CommentDoc extends mongoose.Document {
  userName: string
  content: string
}

export interface CreateCommentDto {
  userName: string
  content: string
}

export interface CommentModel extends mongoose.Model<CommentDoc> {
  build: (dto: CreateCommentDto) => CommentDoc
}
// * End - Comments
