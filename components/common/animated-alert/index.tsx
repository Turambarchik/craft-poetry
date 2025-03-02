import { Alert, AlertProps, Grow } from "@mui/material";
import React from "react";

interface AnimatedAlertProps extends AlertProps {
  show: boolean;
  timeout?: number;
}

const AnimatedAlert: React.FC<AnimatedAlertProps> = ({
  show,
  children,
  timeout = 500,
  ...props
}) => {
  return (
    <Grow in={show} timeout={timeout} unmountOnExit>
      <Alert {...props}>{children}</Alert>
    </Grow>
  );
};

export default AnimatedAlert;
