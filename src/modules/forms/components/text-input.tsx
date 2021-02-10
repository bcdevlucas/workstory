import React from 'react';
import {useField, useFormikContext} from 'formik';

import {TextField, InputAdornment} from '@material-ui/core';
import {TextFieldProps} from '@material-ui/core/TextField';

export type TextInputProps = TextFieldProps & {
  name: string;
  onChange?: never;
  startAdornment?: React.ReactElement;
  endAdornment?: React.ReactElement;
  inputComponent?: React.ComponentType;
};

const TextInput: React.FC<TextInputProps> = ({
  name,
  type,
  label,
  startAdornment,
  endAdornment,
  inputComponent,
  ...rest
}): React.ReactElement => {
  const [field, meta] = useField(name);
  const {setFieldValue} = useFormikContext();

  const hasError = meta.touched && !!meta.error;

  // Formik auto parses "number" inputs as floats, so lets not use their onchange handler
  // https://github.com/jaredpalmer/formik/issues/1119
  const onChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>): void => {
    if (type === 'number') {
      setFieldValue(name as never, event.target.value);
    } else {
      field.onChange(event);
    }
  };

  return (
    <TextField
      {...field}
      name={name}
      type={type}
      label={hasError ? meta.error : label}
      onChange={onChange}
      error={hasError}
      {...rest}
      InputProps={{
        inputComponent: inputComponent,
        startAdornment: startAdornment && <InputAdornment position="start">{startAdornment}</InputAdornment>,
        endAdornment: endAdornment && <InputAdornment position="end">{endAdornment}</InputAdornment>
      }}
    />
  );
};

export default TextInput;
