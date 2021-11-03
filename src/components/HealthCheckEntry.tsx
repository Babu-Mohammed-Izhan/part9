import React from "react";
import { HealthCheckEntry } from "../types";
import { Card, Icon } from "semantic-ui-react";

const HealthCheckEntryC: React.FC<{ entry: HealthCheckEntry }> = ({
  entry,
}) => {
  // const healthColor = ["green", "yellow", "orange", "red"];

  const header = `${entry.date}`;
  const meta = `${entry.description}`;

  const extra = <Icon name="heart" color="red" />;

  return <Card header={header} meta={meta} extra={extra} />;
};

export default HealthCheckEntryC;
