import { Request, Response, NextFunction } from "express"
import jsonwebtoken from "jsonwebtoken"

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session?.jwt) return next()

  try {
    const { jwt } = req.session

    const payload = jsonwebtoken.verify(jwt, process.env.JWT_KEY!)


    req.currentUser = payload
  } catch (err) {
    return next(err)
  }

  next()
}
