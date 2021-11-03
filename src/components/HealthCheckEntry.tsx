import React from "react";
import { HealthCheckEntry } from "../types";
import { Card, Icon } from "semantic-ui-react";
import { useStateValue } from "../state";

const HealthCheckEntryC: React.FC<{ entry: HealthCheckEntry }> = ({
  entry,
}) => {
  const [{ diagnosis }] = useStateValue();

  const header = (
    <h3>
      {entry.date}
      <Icon name="doctor" />
    </h3>
  );
  const meta = `${entry.description}`;

  const extra = (e: number) => {
    switch (e) {
      case 0:
        return <Icon name="heart" color="green" />;
        break;
      case 1:
        return <Icon name="heart" color="yellow" />;
        break;
      case 2:
        return <Icon name="heart" color="orange" />;
        break;
      case 3:
        return <Icon name="heart" color="red" />;
        break;
      default:
        break;
    }
  };

  const description = (
    <ul>
      {entry.diagnosisCodes &&
        entry.diagnosisCodes.map((c) => {
          const result = diagnosis.filter((di) => di.code === c);
          return (
            <li key={c}>
              {c}
              {result && result[0].name}
            </li>
          );
        })}
    </ul>
  );

  return (
    <Card
      header={header}
      meta={meta}
      extra={extra(entry.healthCheckRating)}
      description={description}
    />
  );
};

export default HealthCheckEntryC;
