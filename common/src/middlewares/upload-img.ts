import multer from "multer"
import { BadReqError } from "../errors/bad-req-error"

const allowedExtensions = ["jpg", "png", "jpeg"]

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!file) return cb(new BadReqError("No file provided!"), "")

    cb(null, "/upload")
  },
  filename: (req, file, cb) => {
    if (!file) return cb(new BadReqError("No file provided!"), "")

    const extension = file.originalname.split(".").pop()

    // Check for valid file type
    if (!allowedExtensions.includes(extension || "")) {
      return cb(
        new BadReqError(
          "Invalid file type! Only JPG, PNG, and JPEG are allowed."
        ),
        ""
      )
    }

    cb(null, `${file.fieldname}-${Date.now()}.${extension}`)
  },
})

export const uploadImages = multer({ storage }).array("image")
