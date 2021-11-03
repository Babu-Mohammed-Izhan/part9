import React from "react";
import { OccupationalHealthcareEntry } from "../types";
import { Card, Icon } from "semantic-ui-react";

const OccupationalHealthcareEntryC: React.FC<{
  entry: OccupationalHealthcareEntry;
}> = ({ entry }) => {
  const header = (
    <h3>
      {entry.date}
      <Icon name="stethoscope" />
      {entry.employerName}
    </h3>
  );
  const meta = `${entry.description}`;

  const description = (
    <ul>
      {entry.diagnosisCodes &&
        entry.diagnosisCodes.map((c) => {
          return <li key={c}>{c}</li>;
        })}
    </ul>
  );

  return (
    <div>
      <Card header={header} meta={meta} description={description} />
    </div>
  );
};

export default OccupationalHealthcareEntryC;
