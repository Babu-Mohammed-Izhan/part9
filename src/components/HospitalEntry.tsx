import React from "react";
import { Entry } from "../types";
import { Card } from "semantic-ui-react";

const HospitalEntryC: React.FC<{ entry: Entry }> = ({ entry }) => {
  const header = `${entry.date}`;
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

export default HospitalEntryC;
