import { Field, UseFieldConfig } from 'react-final-form';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useRefState } from '@teamdiverst/easy-email-editor';
import { Box, FormControl, FormHelperText, FormLabel } from '@extensions/components/MuiAdapter';
import { debounce } from 'lodash';

export interface EnhancerProps {
  name: string;
  onChangeAdapter?: (value: any) => any;
  validate?: (value: any) => string | undefined | Promise<string | undefined>;
  config?: UseFieldConfig<any, any>;
  changeOnBlur?: boolean;
  formItem?: any;
  label?: React.ReactNode;
  inline?: boolean;
  equalSpacing?: boolean;
  required?: boolean;
  autoComplete?: 'on' | 'off';
  style?: React.CSSProperties;
  helpText?: React.ReactNode;
  debounceTime?: number;
  labelHidden?: boolean;
}

const parse = (v: any) => v;
export default function enhancer<P extends { onChange?: (...rest: any) => any }>(
  Component: React.FC<any>,
  changeAdapter: (args: Parameters<NonNullable<P['onChange']>>) => any,
  option?: { debounceTime: number },
) {
  return (props: EnhancerProps & Omit<P, 'value' | 'onChange' | 'mutators'>) => {
    const {
      name,
      validate,
      onChangeAdapter,
      changeOnBlur,
      inline,
      equalSpacing,
      formItem,
      label,
      required,
      style,
      helpText,
      autoComplete,
      labelHidden,
      ...rest
    } = props;

    const debounceTime = props.debounceTime || option?.debounceTime || 300;

    const config = useMemo(() => {
      return {
        ...props.config,
        validate: validate,
        parse: props.config?.parse || parse,
      };
    }, [props.config, validate]);

    const [currentValue, setCurrentValue] = useState('');
    const currentValueRef = useRefState(currentValue);

    return useMemo(() => {
      return (
        <Field
          name={name}
          {...config}
        >
          {({ input: { onBlur, onChange, value }, meta }) => {
            // eslint-disable-next-line react-hooks/exhaustive-deps

            const debounceCallbackChange = useCallback(
              debounce(
                val => {
                  onChange(val);
                  onBlur();
                },
                debounceTime,
                {
                  // maxWait: 500,
                },
              ),
              [onChange, onBlur],
            );

            const onFieldChange: P['onChange'] = useCallback(
              (e: any) => {
                const newVal = onChangeAdapter
                  ? onChangeAdapter(changeAdapter(e))
                  : changeAdapter(e);

                setCurrentValue(newVal);
                if (!changeOnBlur) {
                  debounceCallbackChange(newVal);
                }
              },
              [debounceCallbackChange, onChangeAdapter],
            );

            const onFieldBlur = useCallback(() => {
              if (changeOnBlur) {
                onChange(currentValueRef.current);
                onBlur();
              }
            }, [onBlur, onChange, changeOnBlur, currentValueRef]);

            useEffect(() => {
              setCurrentValue(value);
            }, [value]);

            const error = meta.touched && meta.error;

            return (
              <FormControl
                error={!!error}
                fullWidth
                style={{
                  ...style,
                  marginBottom: '10px',
                }}
                required={required}
              >
                {!labelHidden && (label || formItem?.label) && (
                  <FormLabel
                    sx={{
                      fontSize: '14px',
                      marginBottom: '4px',
                      color: 'text.secondary',
                    }}
                  >
                    {label || formItem?.label}
                  </FormLabel>
                )}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Component
                    autoComplete={autoComplete}
                    {...rest}
                    name={name}
                    checked={currentValue}
                    value={currentValue}
                    onChange={onFieldChange}
                    onBlur={onFieldBlur}
                  />
                </Box>
                {(error || helpText) && (
                  <FormHelperText>{error || helpText}</FormHelperText>
                )}
              </FormControl>
            );
          }}
        </Field>
      );
    }, [
      autoComplete,
      changeOnBlur,
      config,
      currentValue,
      currentValueRef,
      debounceTime,
      formItem,
      helpText,
      label,
      labelHidden,
      name,
      onChangeAdapter,
      required,
      rest,
      style,
    ]);
  };
}
