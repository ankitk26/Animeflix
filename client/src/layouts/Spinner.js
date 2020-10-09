import React from "react";
import spinner from "../assets/images/spinner.svg";

const Spinner = () => {
  const spinnerStyle = {
    width: "50px",
    textAlign: "center",
    margin: "2rem auto",
    display: "grid",
    justifyContent: "center",
  };
  return (
    <>
      <img src={spinner} alt="Loading..." style={spinnerStyle} />
    </>
  );
};

export default Spinner;
