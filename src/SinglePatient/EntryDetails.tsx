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
      return 0;
  }
};

export default EntryDetails;
