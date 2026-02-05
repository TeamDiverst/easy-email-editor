import { merge } from 'lodash';
import React from 'react';
import { Stack } from '@teamdiverst/easy-email-editor';
import { Checkbox, FormControlLabel, FormGroup } from '@extensions/components/MuiAdapter';

export interface CheckboxGroupProps {
  options: Array<{ value: string; label: React.ReactNode; }>;
  onChange?: (e: any[]) => void;
  value?: any[];
  style?: Partial<React.CSSProperties>;
  checkboxStyle?: Partial<React.CSSProperties>;
  vertical?: boolean;
}

export function CheckBoxGroup(props: CheckboxGroupProps) {
  const { vertical = false, options, value = [], onChange, style, checkboxStyle } = props;

  const handleChange = (val: string, checked: boolean) => {
    if (checked) {
      onChange?.([...value, val]);
    } else {
      onChange?.(value.filter((v) => v !== val));
    }
  };

  return (
    <FormGroup
      style={merge({ width: '100%' }, style)}
    >
      <Stack vertical={vertical} spacing='extraTight'>
        {options.map((item, index) => (
          <FormControlLabel
            key={index}
            control={(
              <Checkbox
                size="small"
                style={checkboxStyle}
                checked={value.includes(item.value)}
                onChange={(e) => handleChange(item.value, e.target.checked)}
              />
            )}
            label={item.label}
          />
        ))}
      </Stack>
    </FormGroup>
  );
}
