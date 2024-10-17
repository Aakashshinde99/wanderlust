import pkg from 'express';
const { Request, Response } = pkg;

import { HTTP_STATUS, RESPONSE_MESSAGES } from '../utils/constants.js';
import User from '../models/user.js';
import { Role } from '../types/role-type.js'; // If this file is a TypeScript file, consider adjusting your import or converting it to JS.

export const getAllUserHandler = async (req, res) => {
  try {
    const users = await User.find().select('_id fullName role email');
    return res.status(HTTP_STATUS.OK).json({ users });
  } catch (error) {
    console.error(error);
    return res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: RESPONSE_MESSAGES.COMMON.INTERNAL_SERVER_ERROR });
  }
};

export const changeUserRoleHandler = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { role } = req.body;

    // Validate the role
    if (role === Role.User || role === Role.Admin) {
      const user = await User.findById(userId);
      
      if (!user) {
        return res
          .status(HTTP_STATUS.NOT_FOUND)
          .json({ message: RESPONSE_MESSAGES.USERS.USER_NOT_EXISTS });
      }

      // Update the role and save
      user.role = role;
      await user.save(); // Ensure this operation completes

      return res.status(HTTP_STATUS.OK).json({ message: RESPONSE_MESSAGES.USERS.UPDATE });
    } else {
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ message: RESPONSE_MESSAGES.COMMON.REQUIRED_FIELDS });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: RESPONSE_MESSAGES.COMMON.INTERNAL_SERVER_ERROR, error: error.message });
  }
};

export const deleteUserHandler = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ message: RESPONSE_MESSAGES.USERS.USER_NOT_EXISTS });
    }

    return res.status(HTTP_STATUS.NO_CONTENT).json({ message: RESPONSE_MESSAGES.USERS.DELETED });
  } catch (error) {
    console.error(error);
    return res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: RESPONSE_MESSAGES.COMMON.INTERNAL_SERVER_ERROR, error: error.message });
  }
};
