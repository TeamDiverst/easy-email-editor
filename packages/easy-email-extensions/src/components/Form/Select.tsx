import { FormControl } from '@mui/material';
import { merge } from 'lodash';
import React from 'react';

export interface SelectProps {
  options: Array<{ value: string; label: React.ReactNode; }>;
  onChange?: (val: string) => void;
  value: string;
  style?: React.CSSProperties;
  label?: string;
}

export function Select(props: SelectProps) {
  const handleChange = (event: SelectChangeEvent<string>) => {
    props.onChange?.(event.target.value);
  };

  return (
    <FormControl size="small" style={merge({ width: '100%', }, props.style)}>
      {/*{props.label && <InputLabel>{props.label}</InputLabel>}*/}
      {/*<AutoComplete*/}
      {/*  autoWidth={false}*/}
      {/*  value={props.value}*/}
      {/*  label={props.label}*/}
      {/*  onChange={handleChange}*/}
      {/*>*/}
      {/*  {props.options.map((item, index) => (*/}
      {/*    <MenuItem key={index} value={item.value}>*/}
      {/*      {item.label}*/}
      {/*    </MenuItem>*/}
      {/*  ))}*/}
      {/*</AutoComplete>*/}
    </FormControl>
  );
}
