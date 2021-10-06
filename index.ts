/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";
const app = express();

app.get("/ping", (_req, res) => {
  res.send("pong");
});

app.get("hello", (_req, res) => {
  res.send("Hello Full Stack");
});

app.get("/bmi", (req, res) => {
  console.log(req.query);
  if (
    !req.query.height ||
    !req.query.weight ||
    typeof req.query.height !== "string" ||
    typeof req.query.weight !== "string"
  ) {
    res.status(404).json({
      error: "malformatted parameters",
    });
  }

  console.log();
  console.log();
  const height = req.query.height;
  const weight = req.query.weight;
  const bmi = calculateBmi(["", "", String(height), String(weight)]);
  const result = {
    height: Number(height),
    weight: Number(weight),
    bmi,
  };
  res.send(result);
});

app.post("/exercise", (req, res) => {
  console.log(req.body);
  console.log(
    calculateExercises(["", "", req.body.target, ...req.body.daily_exercises])
  );
  res.send(req.body);
});
const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
