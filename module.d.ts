export {} // Ensure this file is treated as a module to avoid conflicts

declare global {
  interface JwtPayload {
    email: string
    userId: string
  }

  namespace Express {
    interface Request {
      currentUser?: jsonwebtoken.JwtPayload
      // currentUser?: JwtPayload
    }
  }
}
