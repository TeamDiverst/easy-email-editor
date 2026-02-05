import { Slider as MuiSlider, Switch as MuiSwitch } from '@mui/material';
import { ImageUploader, ImageUploaderProps } from './ImageUploader';
import { UploadField as Uploader, UploadFieldProps } from './UploadField';
import { Select, SelectProps } from './Select';
import { RadioGroup, RadioGroupProps } from './RadioGroup';
import enhancer from './enhancer';
import { Input, InputProps } from './Input';
import { InputWithUnit, InputWithUnitProps } from './InputWithUnit';
import { CheckBoxGroup } from './CheckBoxGroup';
import { EditTab, EditTabProps } from './EditTab';
import { EditGridTab, EditGridTabProps } from './EditGridTab';
import { InlineText, InlineTextProps } from './InlineTextField';
import { AutoComplete, AutoCompleteProps } from './AutoComplete';
import { ColorPickerField } from './ColorPickerField';
import React from 'react';

export { RichTextField } from './RichTextField';

export const TextField = enhancer<InputProps>(Input, value => value);

export const InputWithUnitField = enhancer<InputWithUnitProps>(
  InputWithUnit,
  value => value,
);

export const SearchField = enhancer<any>(Input, val => val);

export const TextAreaField = enhancer<any>(
  (props) => <Input {...props} multiline rows={4} />,
  val => val
);

export const NumberField = enhancer<any>(
  (props) => <Input {...props} type="number" />,
  e => e
);

export const SliderField = enhancer<any>(
  (props) => <MuiSlider size="small" {...props} />,
  e => e
);

export const UploadField = enhancer<UploadFieldProps>(Uploader, val => val);

export const ImageUploaderField = enhancer<ImageUploaderProps>(ImageUploader, url => url);

export const SelectField = enhancer<SelectProps>(Select, e => e);

export const TreeSelectField = enhancer<any>(Select, e => e);

export const AutoCompleteField = enhancer<AutoCompleteProps>(AutoComplete, e => e);

export const RadioGroupField = enhancer<RadioGroupProps>(RadioGroup, value => value);

export const SwitchField = enhancer<any>(
  (props) => (
    <MuiSwitch
      size="small"
      {...props}
      checked={props.value}
      onChange={(e) => props.onChange(e.target.checked)}
    />
  ),
  e => e
);

export const CheckboxField = enhancer<any>(CheckBoxGroup, e => e);

export const EditTabField = enhancer<EditTabProps>(EditTab, (e: any[]) => e);
export const EditGridTabField = enhancer<EditGridTabProps>(EditGridTab, (e: any[]) => e);

export const InlineTextField = enhancer<InlineTextProps>(InlineText, value => value);

export { ColorPickerField };

export { enhancer };
