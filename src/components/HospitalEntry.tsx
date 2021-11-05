import React from "react";
import { Entry } from "../types";
import { Card } from "semantic-ui-react";
import { useStateValue } from "../state";

const HospitalEntryC: React.FC<{ entry: Entry }> = ({ entry }) => {
  const [{ diagnosis }] = useStateValue();
  const header = `${entry.date}`;
  const meta = `${entry.description}`;
  const description = (
    <ul>
      {entry.diagnosisCodes &&
        entry.diagnosisCodes.map((c) => {
          const result = diagnosis.find((di) => di.code === c);
          return (
            <li key={c}>
              {c}
              {result && result.name}
            </li>
          );
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
