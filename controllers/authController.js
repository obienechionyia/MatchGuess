import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import { hashPassword, comparePassword } from "../utils/passwordUtils.js";
import { UnauthenticatedError } from "../errors/customErrors.js";
import { createJWT } from "../utils/tokenUtils.js";

// register user
export const register = async (req, res) => {
  // first registered user is admin
  const isFirstAccount = (await User.countDocuments()) === 0;
  req.body.role = isFirstAccount ? "admin" : "user";

  // password hash
  const hashedPassword = await hashPassword(req.body.password);
  req.body.password = hashedPassword;

  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ user });
};

// login user
export const login = async (req, res) => {
  // check if user exists
  // check if password is correct

  const user = await User.findOne({ email: req.body.email });

  const isValidUser =
    user && (await comparePassword(req.body.password, user.password));
  if (!isValidUser) throw new UnauthenticatedError("invalid credentials");

  // create token for cookie
  const token = createJWT({ userId: user._id, role: user.role });

  // establish cookie and set expiration date
  const oneDay = 1000 * 60 * 60 * 24;
  res.cookie("token", token, {
    httpsOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
  });
  res.status(StatusCodes.CREATED).json({ msg: "user logged in" });
};

//logout user
export const logout = (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "user logged out!" });
};
