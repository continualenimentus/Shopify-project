import React, { FC, ChangeEvent, useState } from 'react';
import { TextField } from '@shopify/polaris';

interface TextInputProps {
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  err?: boolean| string;
  label?: string;
}

const TextInput: FC<TextInputProps> = ({ value = '', label = '', onChange , onBlur, err}) => {
  return (
    <TextField
      label={label}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      type="text"
      error={err}
      autoComplete="none"
    />
  );
};

export default TextInput;