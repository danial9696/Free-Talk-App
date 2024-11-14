import { CustomError } from "./custom-error"

export class NotAuthorizedError extends CustomError {
  statusCode = 404

  constructor() {
    super("Not Authorized!")
  }

  generateError() {
    return [{ message: "Not Authorized!" }]
  }
}
