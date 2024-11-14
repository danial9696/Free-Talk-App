import { authenticationService } from "../../common/src/services/authentication"
import mongoose from "mongoose"

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

export const User = mongoose.model("User", UserSchema)
