import fs from "fs/promises";
import path from "path";

const pdfParse = require("pdf-parse");
import mammoth from "mammoth";

import { AppError } from "../utils/app-error";
import { HTTP_STATUS } from "../constants/http-status";

/**
 * Service responsible for extracting text from uploaded files.
 */
export const fileService = {
  /**
   * Extract text from a supported file.
   */
  async extractText(
    filePath: string,
    mimeType: string
  ): Promise<string> {
    switch (mimeType) {
      case "application/pdf":
        return this.extractPdf(filePath);

      case "text/plain":
        return this.extractTxt(filePath);

      case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        return this.extractDocx(filePath);

      default:
        throw new AppError(
          HTTP_STATUS.BAD_REQUEST,
          "Unsupported file type."
        );
    }
  },

  /**
   * Extract text from a PDF.
   */
    async extractPdf(
    filePath: string
    ): Promise<string> {
    try {
        const buffer = await fs.readFile(filePath);

        const pdf = await pdfParse(buffer);

        return pdf.text;
    } catch {
        throw new AppError(
        HTTP_STATUS.BAD_REQUEST,
        "Unable to read the uploaded PDF. Please upload a valid PDF document."
        );
    }
    },

  /**
   * Extract text from a TXT file.
   */
  async extractTxt(
    filePath: string
  ): Promise<string> {
    return fs.readFile(
      filePath,
      "utf8"
    );
  },

  /**
   * Extract text from a DOCX file.
   */
  async extractDocx(
    filePath: string
  ): Promise<string> {
    const result =
      await mammoth.extractRawText({
        path: filePath,
      });

    return result.value;
  },

  /**
   * Delete uploaded file.
   */
  async deleteFile(
    filePath: string
  ): Promise<void> {
    try {
      await fs.unlink(filePath);
    } catch {
      // Ignore cleanup failures.
    }
  },
};