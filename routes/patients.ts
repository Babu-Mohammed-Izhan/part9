/* eslint-disable @typescript-eslint/no-explicit-any */
import express from "express";
import patientsService from "../services/patientsService";
import { v1 as uuid } from "uuid";
import toNewPatientEntry, { toNewEntry } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientsService.getPatients());
});

router.get("/:id", (req, res) => {
  res.send(patientsService.getOnePatient(req.params.id));
});

router.post("/", (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const { name, dateOfBirth, ssn, gender, occupation, entries } =
      newPatientEntry;
    const id = uuid();
    const newpatient = patientsService.addPatients(
      id,
      name,
      dateOfBirth,
      ssn,
      gender,
      occupation,
      entries
    );
    res.json(newpatient);
  } catch (e: any) {
    res.status(400).send(e.message);
  }
});

router.post("/:id/entries", (req, res) => {
  try {
    const newEntry = toNewEntry(req.body);
    console.log(newEntry);
  } catch (e: any) {
    res.status(400).send(e.message);
  }
});

export default router;
