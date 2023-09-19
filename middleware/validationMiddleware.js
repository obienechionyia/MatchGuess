import { BadRequestError, NotFoundError } from "../errors/customErrors.js";
import mongoose from "mongoose";
import Match from "../models/MatchModel.js";
import { param, body, validationResult } from "express-validator";

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        if (errorMessages[0].startsWith("no job")) {
          throw new NotFoundError(errorMessages);
        }
        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

export const validateMatchInput = withValidationErrors([
  body("opponent1").notEmpty().withMessage("opponent 1 is required"),
  body("opponent2").notEmpty().withMessage("opponent 2 is required"),
]);

export const validateIdParam = withValidationErrors([
  param("id").custom(async (value) => {
    const isValidId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidId) throw new BadRequestError("invalid MongoDB id");
    const match = await Match.findById(value);
    if (!match) throw new NotFoundError(`no match with id : ${value}`);
  }),
]);
