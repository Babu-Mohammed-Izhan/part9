/* eslint-disable @typescript-eslint/no-unsafe-call */
import patients from "../data/patients";
// import patientData from "../data/patients.json";
import {
  PublicPatientEntry,
  PatientEntry,
  Entry,
  HospitalEntry,
  OccupationalHealthcareEntry,
  HealthCheckEntry,
} from "../types";

const patinets: Array<PatientEntry> = patients;

const getPatients = (): Array<PublicPatientEntry> => {
  return patinets.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
    })
  );
};

const getOnePatient = (id: string): Array<PublicPatientEntry> => {
  const onePatient = patinets.filter((pat) => {
    return pat.id === id;
  });
  return onePatient;
};

const addPatients = (
  id: string,
  name: string,
  dateOfBirth: string,
  ssn: string,
  gender: string,
  occupation: string,
  entries: Entry[]
): PatientEntry => {
  const newPatient = {
    id,
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation,
    entries,
  };

  patinets.push(newPatient);
  return newPatient;
};

const addHospitalEntry = (
  {
    id,
    type,
    date,
    specialist,
    description,
    diagnosisCodes,
    discharge,
  }: HospitalEntry,
  patid: string
): HospitalEntry => {
  const onePatient = patinets.find((pat) => {
    return pat.id === patid;
  });

  const newEntry = {
    id,
    type,
    date,
    specialist,
    description,
    diagnosisCodes,
    discharge,
  };

  if (onePatient) {
    onePatient.entries.push(newEntry);
  }

  return newEntry;
};

const addOccupationEntry = (
  {
    id,
    type,
    date,
    specialist,
    description,
    diagnosisCodes,
    employerName,
    sickLeave,
  }: OccupationalHealthcareEntry,
  patid: string
): OccupationalHealthcareEntry => {
  const onePatient = patinets.find((pat) => {
    return pat.id === patid;
  });

  const newEntry = {
    id,
    type,
    date,
    specialist,
    description,
    diagnosisCodes,
    employerName,
    sickLeave,
  };
  if (onePatient) {
    onePatient.entries.push(newEntry);
  }

  return newEntry;
};

const addHealthcheckEntry = (
  {
    id,
    type,
    date,
    specialist,
    description,
    diagnosisCodes,
    healthCheckRating,
  }: HealthCheckEntry,
  patid: string
): HealthCheckEntry => {
  const onePatient = patinets.find((pat) => {
    return pat.id === patid;
  });

  const newEntry = {
    id,
    type,
    date,
    specialist,
    description,
    diagnosisCodes,
    healthCheckRating,
  };
  if (onePatient) {
    onePatient.entries.push(newEntry);
  }

  return newEntry;
};

export default {
  getPatients,
  addPatients,
  getOnePatient,
  addHospitalEntry,
  addOccupationEntry,
  addHealthcheckEntry,
};
