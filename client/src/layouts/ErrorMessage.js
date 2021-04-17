import { Alert, AlertTitle } from "@material-ui/lab";
import React from "react";

const ErrorMessage = ({ message }) => {
  return (
    <Alert severity="error">
      <AlertTitle>Error</AlertTitle>
      {message
        ? message
        : "Try refreshing the page or checking your internet connection"}
    </Alert>
  );
};

export default ErrorMessage;
