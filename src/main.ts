import mongoose from "mongoose"
const app = require("./app/index")

const start = async () => {
  if (!process.env.MONGO_URI) throw new Error("MONGO_URI is required")

  if (!process.env.JWT_KEY) throw new Error("JWT_KEY is required")

  try {
    await mongoose.connect(process.env.MONGO_URI)
  } catch (error: any) {
    throw new Error(error)
  }

  app.listen(8000, () => console.log("Server is up and running on port 8000"))
}

start()
