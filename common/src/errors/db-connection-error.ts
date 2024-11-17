import { CustomError } from "./custom-error"

export class DbConnectionError extends CustomError {
  statusCode = 500

  constructor() {
    super("DB Connection error!")
  }

  generateErrors() {
    return [{ message: "DB Connection error!" }]
  }
}
