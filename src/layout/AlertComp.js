import React from "react";
import Alert from "@material-ui/lab/Alert";
import AlertContext from "../context/alert/alertContext";
import { useContext } from "react";

const AlertComp = () => {
  const alertContext = useContext(AlertContext);

  const { alert } = alertContext;

  return (
    alert && (
      <>
        <Alert
          variant='filled'
          severity={alert.type}
          style={{ textAlign: "center" }}
        >
          {alert.msg}
        </Alert>
      </>
    )
  );
};

export default AlertComp;
