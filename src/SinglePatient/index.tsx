/* eslint-disable @typescript-eslint/no-unsafe-call */
import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Container, Icon } from "semantic-ui-react";

import { apiBaseUrl } from "../constants";
import { useStateValue, setonePatient, setDiagnosis } from "../state";
import { Patient, Entry, Diagnosis } from "../types";

const SinglePatient = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patient, diagnosis }, dispatch] = useStateValue();

  React.useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      try {
        const { data: patientFromApi } = await axios.get<Patient[]>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(setonePatient(patientFromApi));
      } catch (e) {
        console.error(e);
      }
    };

    const fetchDiagnosesList = async () => {
      try {
        const { data: diagnosisFromApi } = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnosis`
        );
        dispatch(setDiagnosis(diagnosisFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    void fetchPatientList();
    void fetchDiagnosesList();
  }, [dispatch]);

  console.log(patient);

  return (
    <div>
      <Container textAlign="left">
        {Object.values(patient).map((onepatient: Patient) => (
          <div key={onepatient.id}>
            <h1>
              {onepatient.name}{" "}
              <Icon name={onepatient.gender === "male" ? "male" : "female"} />
            </h1>
            <h3>ssn: {onepatient.ssn}</h3>
            <h3>occupation: {onepatient.occupation}</h3>
            <h4>entries</h4>
            {onepatient.entries &&
              onepatient.entries.map((e: Entry) => {
                return (
                  <div key={e.id}>
                    <p>
                      {e.date} {e.description}
                    </p>
                    <ul>
                      {e.diagnosisCodes &&
                        e.diagnosisCodes.map((d: string) => {
                          const result = diagnosis.filter(
                            (di) => di.code === d
                          );
                          console.log(result);
                          return (
                            <li key={d}>
                              {d}
                              {result.length && result[0].name}
                            </li>
                          );
                        })}
                    </ul>
                  </div>
                );
              })}
          </div>
        ))}
      </Container>
    </div>
  );
};

export default SinglePatient;
