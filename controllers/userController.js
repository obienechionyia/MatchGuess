import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js";
import Match from "../models/MatchModel.js";

export const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });
  const userWithoutPassword = user.toJSON();
  res.status(StatusCodes.OK).json({ user: userWithoutPassword });
};

export const getMatchStats = async (req, res) => {
  const users = await User.countDocuments();
  const matches = await Match.countDocuments();
  res.status(StatusCodes.OK).json({ users, matches });
};

export const updateUser = async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(req.user.userId, req.body);
  res.status(StatusCodes.OK).json({ msg: "user updated" });
};
