/* eslint-disable @typescript-eslint/no-unsafe-return */
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
  const patid = req.params.id;
  console.log(patid);
  const newEntry = toNewEntry(req.body);
  console.log(newEntry);
  const { type, date, specialist, description, diagnosisCodes } = newEntry;
  const id = uuid();
  switch (type) {
    case "Hospital":
      const { discharge } = newEntry;
      const HospitalEntry = patientsService.addHospitalEntry({
        id,
        type,
        date,
        specialist,
        description,
        diagnosisCodes,
        discharge,
      });
      return HospitalEntry;
    case "OccupationalHealthcare":
      const { employerName, sickLeave } = newEntry;
      const OccupationalHealthcareEntry = patientsService.addOccupationEntry({
        id,
        type,
        date,
        specialist,
        description,
        diagnosisCodes,
        employerName,
        sickLeave,
      });
      return OccupationalHealthcareEntry;
    case "HealthCheck":
      const { healthCheckRating } = newEntry;
      const HealthCheckEntry = patientsService.addHealthcheckEntry({
        id,
        type,
        date,
        specialist,
        description,
        diagnosisCodes,
        healthCheckRating,
      });
      return HealthCheckEntry;
    default:
      return res.status(400).send("Invalid Entry");
  }
});

export default router;
