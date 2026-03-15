import multer, { FileFilterCallback } from "multer";
import path from "path";
import { Request } from "express";

// Filter files
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback,
) => {
  const allowedMimes = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/webp",
    "application/vnd.android.package-archive",
    "application/octet-stream",
    "application/x-ios-app",
  ];
  const allowedExtensions = [".png", ".jpg", ".jpeg", ".webp", ".apk", ".ipa"];

  const ext = path.extname(file.originalname).toLowerCase();
  const mime = file.mimetype;

  if (
    allowedExtensions.includes(ext) &&
    (allowedMimes.includes(mime) || mime === "")
  ) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Invalid file type. Only image, APK, and IPA files are allowed.",
      ),
    );
  }
};

// Create multer instance
export const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter,
  limits: {
    fileSize: 100 * 1024 * 1024,
  },
});

// Middleware to handle icon and screenshots uploads
export const uploadAppFiles = upload.fields([
  { name: "icon", maxCount: 1 },
  { name: "screenshots", maxCount: 10 },
  { name: "apkFile", maxCount: 1 },
  { name: "ipaFile", maxCount: 1 },
]);
