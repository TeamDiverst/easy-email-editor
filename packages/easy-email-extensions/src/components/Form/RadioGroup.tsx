import React from 'react';

export interface RadioGroupProps extends Omit< 'onChange' | 'value'> {
  options: Array<{ value: string; label: React.ReactNode }>;
  onChange?: (value: string) => void;
  value?: string;
  type?: 'radio' | 'button';
  vertical?: boolean;
}

export function RadioGroup(props: RadioGroupProps) {
  const { type, vertical, options, onChange, value, ...rest } = props;
  return (<></>
    // <MuiRadioGroup
    //   {...rest}
    //   style={merge({ width: '100%' }, rest.style)}
    //   value={value}
    //   onChange={(ev) => onChange?.(ev.target.value)}
    // >
    //   <Stack vertical={vertical} spacing='extraTight'>
    //     {options.map((item, index) => (
    //       <FormControlLabel
    //         key={index}
    //         value={item.value}
    //         control={<Radio size="small" />}
    //         label={item.label}
    //       />
    //     ))}
    //   </Stack>
    // </MuiRadioGroup>
  );
}
