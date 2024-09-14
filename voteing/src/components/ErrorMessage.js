import React from "react";
import { Alert } from "react-bootstrap";

function ErrorMessage({varient="Info",children})=> {
  return (
<Alert>
<strong>{children}</strong>
</Alert>
  )
}

export default ErrorMessage;