import patientData from "../data/patients.json";
import { PublicPatientEntry, PatientEntry } from "../types";

const patinets: Array<PublicPatientEntry> = patientData;

const getPatients = (): Array<PublicPatientEntry> => {
  return patinets.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatients = (
  id: string,
  name: string,
  dateOfBirth: string,
  ssn: string,
  gender: string,
  occupation: string
): PatientEntry => {
  const newPatient = {
    id,
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation,
  };

  patientData.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  addPatients,
};
