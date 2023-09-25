import "express-async-errors";
import Match from "../models/MatchModel.js";
import StatusCodes from "http-status-codes";

// http requests to return all matches, single match, edit, and delete matches
export const getAllMatches = async (req, res) => {
  const matches = await Match.find({ createdBy: req.user.userId });
  const totalMatches = matches.length;
  res.status(StatusCodes.OK).json({ matches, totalMatches });
};

export const createMatch = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const match = await Match.create(req.body);
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
