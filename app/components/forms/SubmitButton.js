import React from "react";
import { useFormikContext } from "formik";

import Button from "../Button";

const SubmitButton = ({ title, style, ...props }) => {
  const { handleSubmit } = useFormikContext();

  return (
    <Button title={title} onPress={handleSubmit} style={style} {...props} />
  );
};

export default SubmitButton;
