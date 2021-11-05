/* eslint-disable @typescript-eslint/no-unsafe-call */
import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Container, Icon, Button } from "semantic-ui-react";

import { apiBaseUrl } from "../constants";
import {
  useStateValue,
  setonePatient,
  setDiagnosis,
  setNewEntry,
} from "../state";
import { Patient, Entry, Diagnosis } from "../types";
import EntryDetails from "./EntryDetails";
import AddEntryModal from "../AddEntryModal";

const SinglePatient = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patient }, dispatch] = useStateValue();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: Entry) => {
    try {
      const { data: newEntry } = await axios.post<Patient>(
        `${apiBaseUrl}/${values.id}/entries`,
        values
      );
      dispatch(setNewEntry(newEntry));
      closeModal();
    } catch (e: any) {
      console.error(e.response?.data || "Unknown Error");
      setError(e.response?.data?.error || "Unknown error");
    }
  };

  React.useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
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
        {patient &&
          Object.values(patient).map((onepatient: Patient) => (
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
                  return <EntryDetails key={e.id} entry={e} />;
                })}

              <AddEntryModal
                id={onepatient.id}
                modalOpen={modalOpen}
                onSubmit={submitNewEntry}
                error={error}
                onClose={closeModal}
              />
            </div>
          ))}

        <Button onClick={() => openModal()}>Add New Patient</Button>
      </Container>
    </div>
  );
};

export default SinglePatient;
