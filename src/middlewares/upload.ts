// import multer from "multer";
// import { CloudinaryStorage } from "multer-storage-cloudinary";
// import cloudinary from "../config/cloudinary";

// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: ["health-ngo/blogs","health-ngo/resources"],
//     resource_type: "raw",
//     allowed_formats: ["jpg", "png", "jpeg", "webp", "pdf"],
//   } as any,
// });

// const upload = multer({ storage });

// export default upload;

import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary";

/* 🖼️ Image upload (blogs, events, etc.) */
const imageStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "health-ngo/images",
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
  } as any,
});
export const uploadImage = multer({ storage: imageStorage });
/* 📄 PDF upload (resources only) */
const pdfStorage = new CloudinaryStorage({
  cloudinary,
  params: async () => ({
    folder: "health-ngo/resources",
    resource_type: "raw", // REQUIRED for PDF
  }),
});


export const uploadPDF = multer({ storage: pdfStorage });