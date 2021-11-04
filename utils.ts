/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  PatientEntry,
  Gender,
  Entry,
  HealthCheckEntry,
  OccupationalHealthcareEntry,
  HospitalEntry,
  DiagnoseEntry,
  SickLeave,
  Discharge,
  HealthCheckRating,
} from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string";
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseString = (comment: unknown): string => {
  if (!comment || !isString(comment)) {
    throw new Error("Incorrect or missing input");
  }

  return comment;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date);
  }
  return date;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error("Incorrect or missing Gender: " + gender);
  }
  return gender;
};

const isEntry = (_entry: unknown): _entry is Entry => {
  return true;
};

const isDiagnosis = (
  _diagnosis: unknown
): _diagnosis is DiagnoseEntry["code"] => {
  return true;
};

const isDischarge = (_discharge: unknown): _discharge is Discharge => {
  return true;
};

const isSickleave = (_sickleave: unknown): _sickleave is SickLeave => {
  return true;
};

const isHealthrating = (_rating: unknown): _rating is HealthCheckRating => {
  return true;
};

const parseEntry = (entry: unknown): Entry[] => {
  if (!entry || !isEntry(entry)) {
    throw new Error("Incorrect or missing Entry: " + entry);
  }
  return [entry];
};

const parseDiagnosisCodes = (
  diagnosis: unknown
): Array<DiagnoseEntry["code"]> => {
  if (!diagnosis || !isDiagnosis(diagnosis)) {
    throw new Error("Incorrect or missing Entry: " + diagnosis);
  }
  return [diagnosis];
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (!discharge || !isDischarge(discharge)) {
    throw new Error("Incorrect or missing Entry: " + discharge);
  }
  return discharge;
};

const parseSickLeave = (sickleave: unknown): SickLeave => {
  if (!sickleave || !isSickleave(sickleave)) {
    throw new Error("Incorrect or missing Entry: " + sickleave);
  }
  return sickleave;
};

const parseHealthCheckRating = (healthrating: unknown): HealthCheckRating => {
  if (!healthrating || !isHealthrating(healthrating)) {
    throw new Error("Incorrect or missing Entry: " + healthrating);
  }
  return healthrating;
};

type Fields = {
  id: string;
  name: unknown;
  dateOfBirth: unknown;
  ssn: unknown;
  gender: unknown;
  occupation: unknown;
  entries: unknown;
};

const toNewPatientEntry = ({
  id,
  name,
  dateOfBirth,
  ssn,
  gender,
  occupation,
  entries,
}: Fields): PatientEntry => {
  const newEntry: PatientEntry = {
    id,
    name: parseString(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseString(ssn),
    gender: parseGender(gender),
    occupation: parseString(occupation),
    entries: parseEntry(entries),
  };

  return newEntry;
};

type EntryFields = {
  id: unknown;
  date: unknown;
  specialist: unknown;
  description: unknown;
  diagnosisCodes: unknown;
  type: unknown;
  healthCheckRating: unknown;
  employerName: unknown;
  sickLeave: unknown;
  discharge: unknown;
};

export const toNewEntry = ({
  id,
  date,
  specialist,
  description,
  diagnosisCodes,
  type,
  healthCheckRating,
  employerName,
  sickLeave,
  discharge,
}: EntryFields): Entry => {
  switch (type) {
    case "Hospital":
      const HospitalEntry: HospitalEntry = {
        id: parseString(id),
        type: "Hospital",
        date: parseDate(date),
        specialist: parseString(specialist),
        description: parseString(description),
        diagnosisCodes: parseDiagnosisCodes(diagnosisCodes),
        discharge: parseDischarge(discharge),
      };
      return HospitalEntry;
    case "OccupationalHealthcare":
      const OccupationalHealthcareEntry: OccupationalHealthcareEntry = {
        id: parseString(id),
        type: "OccupationalHealthcare",
        date: parseDate(date),
        specialist: parseString(specialist),
        description: parseString(description),
        diagnosisCodes: parseDiagnosisCodes(diagnosisCodes),
        employerName: parseString(employerName),
        sickLeave: parseSickLeave(sickLeave),
      };
      return OccupationalHealthcareEntry;
    case "HealthCheck":
      const HealthCheckEntry: HealthCheckEntry = {
        id: parseString(id),
        type: "HealthCheck",
        date: parseDate(date),
        specialist: parseString(specialist),
        description: parseString(description),
        diagnosisCodes: parseDiagnosisCodes(diagnosisCodes),
        healthCheckRating: parseHealthCheckRating(healthCheckRating),
      };
      return HealthCheckEntry;
    default:
      return assertNever(type);
  }
};

export default toNewPatientEntry;
function assertNever(_type: unknown): Entry {
  throw new Error("Invalid Entry");
}
