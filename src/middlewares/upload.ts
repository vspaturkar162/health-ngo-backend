import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: ["health-ngo/blogs","health-ngo/resources"],
    resource_type: "raw",
    allowed_formats: ["jpg", "png", "jpeg", "webp", "pdf"],
  } as any,
});

const upload = multer({ storage });

export default upload;