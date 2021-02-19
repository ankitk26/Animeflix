import React from "react";
import spinner from "../assets/images/spinner.svg";

const Spinner = () => {
  return (
    // Show spinner when data is loading
    <img src={spinner} alt="Loading..." className="spinner" />
  );
};

export default Spinner;
