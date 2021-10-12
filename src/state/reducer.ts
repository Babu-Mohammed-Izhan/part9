/* eslint-disable @typescript-eslint/no-unsafe-return */
import { State } from "./state";
import { Patient } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "SET_SINGLE_PATIENT";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
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
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
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
    default:
      return state;
  }
};

export const setPatientList = (data: Patient[]): any => {
  return {
    type: "SET_PATIENT_LIST",
    payload: data,
  };
};

export const setonePatient = (data: Patient[]): any => {
  return {
    type: "SET_SINGLE_PATIENT",
    payload: data,
  };
};
