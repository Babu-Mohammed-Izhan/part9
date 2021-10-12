import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Container } from "semantic-ui-react";

import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { Patient } from "../types";

const SinglePatient = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients }, dispatch] = useStateValue();

  React.useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      try {
        const { data: patientFromApi } = await axios.get<Patient[]>(
          `${apiBaseUrl}/patients/${id}`
        );
        console.log(patientFromApi);
        dispatch({ type: "SET_PATIENT_LIST", payload: patientFromApi });
      } catch (e) {
        console.error(e);
      }
    };
    void fetchPatientList();
  }, [dispatch]);

  return (
    <div>
      <Container textAlign="center">
        {Object.values(patients).map((patient: Patient) => (
          <div key={patient.id}>
            <div>{patient.name}</div>
            <div>{patient.gender}</div>
            <div>{patient.occupation}</div>
          </div>
        ))}
      </Container>
    </div>
  );
};

export default SinglePatient;
