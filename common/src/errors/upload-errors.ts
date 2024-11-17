import { CustomError } from "./custom-error"

export class UploadErrors extends CustomError {
  statusCode = 404

  generateErrors(): { message: string; field?: string }[] {
    throw new Error("Method not implemented.")
  }
}
