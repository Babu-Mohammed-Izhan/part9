import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Container, Icon } from "semantic-ui-react";

import { apiBaseUrl } from "../constants";
import { useStateValue, setonePatient } from "../state";
import { Patient } from "../types";

const SinglePatient = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patient }, dispatch] = useStateValue();

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
    void fetchPatientList();
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
          </div>
        ))}
      </Container>
    </div>
  );
};

export default SinglePatient;
