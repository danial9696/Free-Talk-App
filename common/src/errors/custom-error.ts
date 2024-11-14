export abstract class CustomError extends Error {
  abstract statusCode: number

  abstract generateErrors(): { message: string; field?: string }[]
}
