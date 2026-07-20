import multer from "multer";
import path from "path";

import { AppError } from "../utils/app-error";
import { HTTP_STATUS } from "../constants/http-status";

/**
 * Configure uploaded file storage.
 */
const storage = multer.diskStorage({
  destination: "uploads/",

  filename(req, file, callback) {
    void req;

    const uniqueName =
      `${Date.now()}-${Math.random()
        .toString(36)
        .substring(2)}${path.extname(
        file.originalname
      )}`;

    callback(null, uniqueName);
  },
});

/**
 * Allowed file types.
 */
const allowedMimeTypes = [
  "application/pdf",

  "text/plain",

  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

/**
 * File filter.
 */
const fileFilter: multer.Options["fileFilter"] = (
  req,
  file,
  callback
) => {
  void req;

  if (
    allowedMimeTypes.includes(file.mimetype)
  ) {
    callback(null, true);
    return;
  }

  callback(
    new AppError(
      HTTP_STATUS.BAD_REQUEST,
      "Unsupported file type."
    )
  );
};

/**
 * Upload middleware.
 */
export const upload = multer({
  storage,

  fileFilter,

  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});