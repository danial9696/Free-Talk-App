import { CustomError } from "../errors/custom-error"
import { Request, Response, NextFunction } from "express"

/**
 * The errorHandler function in TypeScript handles errors by returning custom error messages or a
 * generic "Something went wrong!" message.
 * @param {Error} err - The `err` parameter in the `errorHandler` function represents the error object
 * that is passed to the error handler middleware. It contains information about the error that
 * occurred during the request processing.
 * @param {Request} req - Request object representing the HTTP request
 * @param {Response} res - The `res` parameter in the `errorHandler` function represents the response
 * object in Express.js. It is used to send a response back to the client making the request.
 * @param {NextFunction} next - The `next` parameter in the errorHandler function is a callback
 * function that is used to pass control to the next middleware function in the stack. It is typically
 * used in Express.js middleware functions to pass control to the next middleware or route handler.
 * @returns The `errorHandler` function is returning a JSON response with an error message based on the
 * type of error. If the error is an instance of `CustomError`, it will return a JSON response with the
 * status code from the error and the generated errors. If the error is not an instance of
 * `CustomError`, it will return a generic error message with a status code of 500.
 */
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ errors: err.generateErrors() })
  }

  res.status(500).json({ errors: [{ message: "Something went wrong!" }] })
}
