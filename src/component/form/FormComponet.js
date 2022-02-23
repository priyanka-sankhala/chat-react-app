import React from "react";
import { Formik } from "formik";
import InputText from "./InputText";
import Select from "./Select";
import Textarea from "./Textarea";
import Button from "./Button";

const FormComponet = ({ command, ...props }) => {
  
  switch (command) {
    case "TextInput":
      return <InputText {...props} />;
      break;
    case "TextAera":
      return <Textarea {...props} />;
    case "Select":
      return <Select {...props} />;
    case "Button":
      return <Button {...props} />;
    default:
      return null;
      break;
  }
};

export default FormComponet;
