import { authenticationService } from "../../common/src/services/authentication"
import mongoose from "mongoose"
import { CreateUserDto, UserDoc, UserModel } from "./types"

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
})

UserSchema.pre("save", async function (done) {
  if (this.isModified("password") || this.isNew) {
    const hashedPass = authenticationService.pwtToHash(this.get("password"))
    this.set("password", hashedPass)
  }

  done()
})

UserSchema.statics.build = (createUserDto: CreateUserDto) =>
  new User(createUserDto)

export const User = mongoose.model<UserDoc, UserModel>("User", UserSchema)
