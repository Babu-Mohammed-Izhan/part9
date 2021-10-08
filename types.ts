export interface DiagnoseEntry {
  code: string;
  name: string;
  latin?: string;
}

export interface Entry {
  description: string;
  creationDate: string;
  specialist: string;
  code: string;
}

export interface PatientEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
  entries: Entry[];
}

export type PublicPatientEntry = Omit<PatientEntry, "ssn" | "entries">;

export enum Gender {
  male = "male",
  female = "female",
}
