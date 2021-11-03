import React from "react";
import HealthCheckEntry from "../components/HealthCheckEntry";
import HospitalEntry from "../components/HospitalEntry";
import OccupationalHealthcareEntry from "../components/OccupationalHealthcareEntry";
import { Entry } from "../types";

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntry entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntry entry={entry} />;
    case "HealthCheck":
      return <HealthCheckEntry entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;

function assertNever(_entry: never): React.ReactElement<never, never> | null {
  throw new Error("Entry not valid");
}
