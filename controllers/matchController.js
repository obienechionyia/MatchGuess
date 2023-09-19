import { nanoid } from "nanoid";
import "express-async-errors";
import Match from "../models/MatchModel.js";
import StatusCodes from "http-status-codes";
import { NotFoundError } from "../errors/customErrors.js";

export const getAllMatches = async (req, res) => {
  const matches = await Match.find({});
  res.status(StatusCodes.OK).json({ matches });
};

export const createMatch = async (req, res) => {
  const { opponent1, opponent2, location, predictedWinner, matchDate } =
    req.body;

  const match = await Match.create({
    opponent1,
    opponent2,
    location,
    predictedWinner,
    matchDate,
  });
  res.status(StatusCodes.CREATED).json({ match });
};

export const getMatch = async (req, res) => {
  const { id } = req.params;
  const match = await Match.findById(id);
  res.status(StatusCodes.OK).json({ match });
};

export const updateMatch = async (req, res) => {
  const { id } = req.params;
  const updatedMatch = await Match.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  res.status(StatusCodes.OK).json({ match: updatedMatch });
};

export const deleteMatch = async (req, res) => {
  const { id } = req.params;
  const removedMatch = await Match.findByIdAndDelete(id);
  res.status(StatusCodes.OK).json({ match: removedMatch });
};
