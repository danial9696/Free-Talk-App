import { Request, Response, NextFunction } from "express"
import { User } from "../models/user"
import jwt from "jsonwebtoken"

import { AuthenticationServiceType } from "../../common/src/services/authentication"
import { BadReqError } from "common/src/errors/bad-req-error"

const {
  authenticationService,
} = require("../../common/src/services/authentication")

module.exports = {
  signUp: async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body

    const userExist = await User.findOne({ email })

    if (userExist) return next(new BadReqError("User already exist!"))

    try {
      const newUser = new User({
        email,
        password,
      })

      await newUser.save()

      // if (!process.env.JWT_KEY) throw new Error("JWT_KEY is required")

      const token = jwt.sign(
        { email, userId: newUser._id },
        process.env.JWT_KEY!
      )

      req.session = { jwt: token }

      return res.status(201).send(newUser)
    } catch (error) {
      throw new Error("Something went wrong while creating user")
    }
  },

  signIn: async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body

    const userExist = await User.findOne({ email })

    if (!userExist) return next(new BadReqError("Wrong credentials!"))

    try {
      const isEqual = await (
        authenticationService as AuthenticationServiceType
      ).pwtCompared(userExist?.password, password)

      if (!isEqual) return next(new BadReqError("Wrong credentials!"))

      // if (!process.env.JWT_KEY) throw new Error("JWT_KEY is required")

      const token = jwt.sign(
        { email, userId: userExist._id },
        process.env.JWT_KEY!
      )

      req.session = { jwt: token }

      res.status(200).send(userExist)
    } catch (error) {
      throw new Error("Something went wrong while signing !")
    }
  },

  signOut: async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.session = null

      res.status(200).send({})
    } catch (error) {
      throw new Error("Something went wrong while sign out !")
    }
  },

  currentUserHandler: async (req: Request, res: Response) => {
    const { currentUser } = req

    res.status(200).send(currentUser)
  },
}
