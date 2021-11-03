import React from "react";
import HealthCheckEntry from "../components/HealthCheckEntry";
import HospitalEntry from "../components/HospitalEntry";
import OccupationalHealthcareEntry from "../components/OccupationalHealthcareEntry";
import { Entry } from "../types";

const EntryDetails = (entry: Entry) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntry />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntry />;
    case "HealthCheck":
      return <HealthCheckEntry />;
    default:
      return 0;
  }
};

export default EntryDetails;
