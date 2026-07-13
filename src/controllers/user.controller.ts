import { Request, Response } from "express";

import { HTTP_STATUS } from "../constants/http-status";
import { userService } from "../services/user.service";
import { asyncHandler } from "../utils/async-handler";
import { sendSuccessResponse } from "../utils/api-response";

/**
 * User controller.
 */
export const userController = {
  /**
   * Get logged-in user's profile.
   */
  getProfile: asyncHandler(async (req: Request, res: Response) => {
    const user = await userService.getProfile(
      req.user!.userId
    );

    return sendSuccessResponse(
      res,
      HTTP_STATUS.OK,
      "Profile fetched successfully.",
      user
    );
  }),
};