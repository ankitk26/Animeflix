import React from "react";
import spinner from "../assets/images/spinner.svg";

const Spinner = () => {
  return (
    // Show spinner when data is loading
    <img
      src={spinner}
      alt="Loading..."
      style={{
        width: "50px",
        textAlign: "center",
        margin: "2rem auto",
        display: "grid",
        justifyContent: "center",
      }}
    />
  );
};

export default Spinner;
