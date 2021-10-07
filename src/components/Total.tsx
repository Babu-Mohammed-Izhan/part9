import React from "react";
import { courseContent } from "../types";

const Total = (props: any) => {
  return (
    <div>
      <p>
        Number of exercises{" "}
        {props.courseParts.reduce(
          (carry: number, part: courseContent) => carry + part.exerciseCount,
          0
        )}
      </p>
    </div>
  );
};

export default Total;
