import * as dotenv from "dotenv"
dotenv.config()

import express, { Request, Response, NextFunction } from "express"
import { json, urlencoded } from "body-parser"
import cors from "cors"
import cookieSession from "cookie-session"

import {
  newCommentRouter,
  newPostRouter,
  deleteCommentRouter,
  deletePostRouter,
  updatePostRouter,
  showPostRouter,
  signupRouter,
  signinRouter,
} from "../routers"
import { requireAuth } from "common/src/middlewares/require-auth"
import { currentUser } from "common/src/middlewares/current-user"
import { signoutRouter } from "src/routers/auth/signout"
import { errorHandler } from "common/src/middlewares/error-handler"
import { NotFoundError } from "common/src/errors/not-found-err"

const app = express()

app.use(
  cors({
    origin: "*",
    optionsSuccessStatus: 200,
  })
)

app.set("trust proxy", true)

app.use(urlencoded({ extended: false }))

app.use(
  cookieSession({
    signed: false,
    secure: false,
  })
)

app.use(json())

app.use(currentUser)

app.use(signupRouter)

app.use(signinRouter)

app.use(signoutRouter)

app.use(requireAuth, newPostRouter)

app.use(requireAuth, updatePostRouter)

app.use(requireAuth, deletePostRouter)

app.use(showPostRouter)

app.use(requireAuth, newCommentRouter)

app.use(requireAuth, deleteCommentRouter)

app.all("*", (req, res, next) => {
  next(new NotFoundError())
})

app.use(errorHandler)

module.exports = app
