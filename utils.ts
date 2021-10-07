/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { PatientEntry, Gender } from "./types";

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

type Fields = {
  id: string;
  name: unknown;
  dateOfBirth: unknown;
  ssn: unknown;
  gender: unknown;
  occupation: unknown;
};

const toNewPatientEntry = ({
  id,
  name,
  dateOfBirth,
  ssn,
  gender,
  occupation,
}: Fields): PatientEntry => {
  const newEntry: PatientEntry = {
    id,
    name: parseString(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseString(ssn),
    gender: parseGender(gender),
    occupation: parseString(occupation),
  };

  return newEntry;
};

export default toNewPatientEntry;
