import React from "react";
import HealthCheckEntryC from "../components/HealthCheckEntry";
import HospitalEntryC from "../components/HospitalEntry";
import OccupationalHealthcareEntryC from "../components/OccupationalHealthcareEntry";
import { Entry } from "../types";

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntryC entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntryC entry={entry} />;
    case "HealthCheck":
      return <HealthCheckEntryC entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;

function assertNever(_entry: never): React.ReactElement<never, never> | null {
  throw new Error("Entry not valid");
}
