import patients from "../data/patients";
// import patientData from "../data/patients.json";
import { PublicPatientEntry, PatientEntry, Entry } from "../types";

const patinets: Array<PatientEntry> = patients;

const getPatients = (): Array<PublicPatientEntry> => {
  return patinets.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
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

export default {
  getPatients,
  addPatients,
  getOnePatient,
};
