import express from "express";
import morgan from "morgan";
import { nanoid } from "nanoid";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();

let matches = [
  {
    id: nanoid(),
    opponent1: "lakers",
    opponent2: "warriors",
    location: "los angeles, california",
    predictedWinner: "lakers",
    matchDate: "08/12/2021",
  },
  {
    id: nanoid(),
    opponent1: "timberwolves",
    opponent2: "heat",
    location: "miami, florida",
    predictedWinner: "heat",
    matchDate: "8/22/2021",
  },
];

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const port = process.env.PORT || 5100;
app.listen(port, () => {
  console.log(`sever running on PORT ${port}...`);
});

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use(express.json());

app.post("/", (req, res) => {
  console.log(req);

  res.json({ message: "Data received", data: req.body });
});

// get all matches
app.get("/api/v1/matches", (req, res) => {
  res.status(200).json({ matches });
});

// create match
app.post("/api/v1/matches", (req, res) => {
  const { opponent1, opponent2, location } = req.body;
  if (!opponent1 || !opponent2 || !matchDate) {
    return res.status(400).json({ msg: "must provide two opposing teams" });
  }
  const id = nanoid(10);
  const match = { id, opponent1, opponent2, location };
  matches.push(match);
  res.status(200).json({ match });
});

// get single match
app.get("/api/v1/matches/:id", (req, res) => {
  const { id } = req.params;
  const match = matches.find((match) => match.id === id);
  if (!match) {
    throw new Error("no match with that id");
    return res.status(404).json({ msg: `no match with id ${id}` });
  }
  res.status(200).json({ match });
});

// edit match
app.patch("/api/v1/matches/:id", (req, res) => {
  const { opponent1, opponent2, location } = req.body;
  if (!opponent1 || !opponent2) {
    return res.status(400).json({ msg: "please provide two opponents" });
  }
  const { id } = req.params;
  const match = matches.find((match) => match.id === id);
  if (!match) {
    return res.status(404).json({ msg: `no match with id ${id}` });
  }
  match.opponent1 = opponent1;
  match.opponent2 = opponent2;
  match.location = location;
  res.status(200).json({ msg: "match modified", match });
});

// delete match
app.delete("/api/v1/matches/:id", (req, res) => {
  const { id } = req.params;
  const match = matches.find((match) => match.id === id);
  if (!match) {
    return res.status(404).json({ msg: `no match with id ${id}` });
  }
  const newMatches = matches.filter((match) => match.id !== id);
  matches = newMatches;

  res.status(200).json({ msg: "match deleted" });
});

// not found middleware
app.use("*", (req, res) => {
  res.status(404).json({ msg: "not found" });
});

// error middleware
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ msg: "something went wrong" });
});
