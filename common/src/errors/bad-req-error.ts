import { CustomError } from "./custom-error"

export class BadReqError extends CustomError {
  statusCode = 400

  constructor(public msg: string) {
    super(msg)
  }

  generateErrors() {
    return [{ message: this.msg }]
  }
}
