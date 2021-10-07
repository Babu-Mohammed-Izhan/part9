import React from "react";

const Content = (props: any) => {
  return (
    <div>
      {props.courseParts.map((con: any) => {
        return (
          <div key={con.id}>
            <h2>{con.name}</h2>
            <span>{con.exerciseCount}</span>
            <br />
            <p>{con.description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Content;
