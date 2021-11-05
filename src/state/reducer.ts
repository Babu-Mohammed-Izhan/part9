/* eslint-disable @typescript-eslint/no-unsafe-return */
import { State } from "./state";
import { Patient, Diagnosis } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "SET_SINGLE_PATIENT";
      payload: Patient;
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_DIAGNOSIS";
      payload: Diagnosis[];
    }
  | {
      type: "SET_NEW_ENTRY";
      payload: Patient;
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      };
    case "SET_SINGLE_PATIENT":
      return {
        ...state,
        patient: {
          ...action.payload,
        },
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case "SET_DIAGNOSIS":
      return {
        ...state,
        diagnosis: [...action.payload],
      };
    case "SET_NEW_ENTRY":
      return {
        ...state,
        patient: {
          ...action.payload,
        },
      };
    default:
      return state;
  }
};

export const setPatientList = (data: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: data,
  };
};

export const setonePatient = (data: Patient): Action => {
  return {
    type: "SET_SINGLE_PATIENT",
    payload: data,
  };
};

export const setDiagnosis = (data: Diagnosis[]): Action => {
  return {
    type: "SET_DIAGNOSIS",
    payload: data,
  };
};

export const setNewEntry = (data: Patient): Action => {
  return {
    type: "SET_NEW_ENTRY",
    payload: data,
  };
};
