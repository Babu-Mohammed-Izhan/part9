/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { PatientEntry, Gender, Entry } from "./types";

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

const parseEntry = (entry: unknown): Entry[] => {
  if (!entry || !isEntry(entry)) {
    throw new Error("Incorrect or missing Entry: " + entry);
  }
  return [entry];
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

export default toNewPatientEntry;
