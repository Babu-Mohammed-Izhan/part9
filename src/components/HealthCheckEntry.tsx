import React from "react";
import { Entry } from "../types";
import { Card } from "semantic-ui-react";

const HealthCheckEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
  const header = `${entry.date}`;
  const meta = `${entry.description}`;

  return <Card header={header} meta={meta} />;
};

export default HealthCheckEntry;
