import { CustomError } from "./custom-error"

export class BadReqError extends CustomError {
  statusCode = 400

  constructor(public msg: string) {
    super(msg)
  }

  generateError() {
    return [{ message: this.msg }]
  }
}
