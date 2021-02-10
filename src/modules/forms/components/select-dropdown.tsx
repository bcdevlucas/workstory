/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import {useFormikContext, useField} from 'formik';

import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles((theme: Theme) =>
createStyles({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

interface Props {
  name: string;
  label: string;
  options: string[];
  extraClass?: string;
  disabled?: boolean;
  multiple?: boolean; // allow for multiple options to be selected, requires form value to be an array
  renderValues?: (values: any) => string; // 'any' is coming from Select API: https://material-ui.com/api/select/
  fullWidth?: boolean;
}

export interface Option {
  label: string;
  value: string | number;
  disabled?: boolean;
}

const SelectDropdown: React.FC<Props> = ({
  name,
  label,
  options,
  extraClass,
  disabled = false,
  multiple = false,
  renderValues,
  fullWidth = false
}): React.ReactElement => {
  const classes = useStyles();
  const [field, meta] = useField(name);
  const {setFieldValue} = useFormikContext();
  const hasError = meta.touched && !!meta.error;

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>): void => {
    setFieldValue(name as never, event.target.value);
  };

  const mappedOptions = options.map(opt => ({label: opt, value: opt, disabled: false}));

  const renderMultipleValuesDefault = (selected: any): string => selected.join(', ');

  const renderMultiSelect = () => {
    return (
      <Select
        {...field}
        onChange={handleChange}
        disabled={disabled}
        multiple
        renderValue={renderValues ?? renderMultipleValuesDefault}
      >
        {mappedOptions.map((option: Option) => (
        <MenuItem key={option.label} value={option.value} disabled={option.disabled}>
          <Checkbox checked={field.value.includes(option.value)}/>
          {option.label}
        </MenuItem>
        ))}
      </Select>
    );
  };

  const renderSingleSelect = () => {
    return (
      <Select {...field} name={name} onChange={handleChange} disabled={disabled}>
        {mappedOptions.map((option: Option) => (
        <MenuItem key={option.label} value={option.value} disabled={option.disabled}>
          {option.label}
        </MenuItem>
        ))}
      </Select>
    );

  };

  return (
    <FormControl
      variant="filled"
      className={[classes.formControl, extraClass].join(' ')}
      fullWidth={fullWidth}
      error={hasError}
    >
      <InputLabel>{hasError ? meta.error : label}</InputLabel>
      {multiple ? renderMultiSelect() : renderSingleSelect()}
    </FormControl>
  );
};

export default SelectDropdown;
