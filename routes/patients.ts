/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from "express";
import patientsService from "../services/patientsService";
import { v1 as uuid } from "uuid";
import toNewPatientEntry from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientsService.getPatients());
});

router.post("/", (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const { name, dateOfBirth, ssn, gender, occupation } = newPatientEntry;
    const id = uuid();
    const newpatient = patientsService.addPatients(
      id,
      name,
      dateOfBirth,
      ssn,
      gender,
      occupation
    );
    res.json(newpatient);
  } catch (e: any) {
    res.status(400).send(e.message);
  }
});

export default router;
