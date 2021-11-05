import React from "react";
import { Modal, Segment, Button } from "semantic-ui-react";
import AddHospitalEntryForm, { EntryFormValues } from "./AddHospitalEntryForm";
import AddHealthCheckEntry from "./AddHealthCheckEntry";
import AddOccupationEntry from "./AddOccupationEntry";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryFormValues) => void;
  error?: string;
  id: string;
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error, id }: Props) => {
  const [value, setValue] = React.useState("Hospital");
  return (
    <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
      <Modal.Header>Add a new Entry</Modal.Header>
      <Button onClick={() => setValue("Hospital")}>Hospital</Button>
      <Button onClick={() => setValue("HealthCheck")}>HealthCheck</Button>
      <Button onClick={() => setValue("Occupational")}>Occupational</Button>
      {value === "Hospital" ? (
        <Modal.Content>
          {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
          <AddHospitalEntryForm
            onSubmit={onSubmit}
            onCancel={onClose}
            id={id}
          />
        </Modal.Content>
      ) : value === "HealthCheck" ? (
        <Modal.Content>
          {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
          <AddHealthCheckEntry onSubmit={onSubmit} onCancel={onClose} id={id} />
        </Modal.Content>
      ) : (
        <Modal.Content>
          {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
          <AddOccupationEntry onSubmit={onSubmit} onCancel={onClose} id={id} />
        </Modal.Content>
      )}
    </Modal>
  );
};

export default AddEntryModal;
