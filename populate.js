import { readFile } from "fs/promises";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import Match from "./models/MatchModel.js";
import User from "./models/UserModel.js";

try {
  await mongoose.connect(process.env.MONGO_URL);
  const user = await User.findOne({ email: "test@test.com" });
  const jsonMatches = JSON.parse(
    await readFile(new URL("./utils/mockData.json", import.meta.url))
  );
  const matches = jsonMatches.map((match) => {
    return { ...match, createdBy: user._id };
  });
  await Match.deleteMany({ createdBy: user._id });
  await Match.create(matches);
  console.log("Success!");
  process.exit(0);
} catch (error) {
  console.log(error);
  process.exit(1);
}
