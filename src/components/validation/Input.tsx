import { Field, ErrorMessage, useFormikContext } from "formik";
import { FC } from "react";
import { Grid, TextField } from "@mui/material";
import TextError from "./TextError";
import { InputProps } from "./types";

type FormValues = {
  [key: string]: string;
};

const Text: FC<InputProps> = ({ placeholder, name, countError, ...rest }) => {
  const { errors, touched } = useFormikContext<FormValues>();

  return (
    <TextField
      id={`outlined-${name}`}
      error={(!!errors[name] && touched[name]) || countError}
      name={name}
      label={placeholder}
      {...rest}
      sx={{
        "& .MuiInputBase-root ": { borderRadius: "1rem", },
      }}
    />
  );
};

const Input = (props: InputProps) => {
  const { name, type, ...rest } = props;

  return (
    <Grid container direction="column">
      <Field
        id={name}
        name={name}
        type={type ? type : "text"}
        {...rest}
        as={Text}
      />
      <ErrorMessage name={name} component={TextError} />
    </Grid>
  );
};

export default Input;
