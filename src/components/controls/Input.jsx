import React from 'react';
import { TextField } from "@mui/material";

const Input = (props) => {
  const { name, label, value, error = null, onChange, size, ...other } = props;

  return (
    <TextField
      variant="filled"
      size={size || "small"}
      label={label || "label"}
      name={name || "name"}
      value={value} 
      onChange={onChange}
      fullWidth
      {...(error && { error: true, helperText: error })}
      {...other}
    />
  );
};

export default Input;
