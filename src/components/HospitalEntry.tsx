import React from "react";
import { Entry } from "../types";
import { Card } from "semantic-ui-react";

const HospitalEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
  const header = `${entry.date}`;
  const meta = `${entry.description}`;

  return (
    <div>
      <Card header={header} meta={meta} />
    </div>
  );
};

export default HospitalEntry;
