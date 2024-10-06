import React, { FC } from 'react';
import { TextField } from '@shopify/polaris';

interface EmailInputProps {
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  err?: boolean| string;
}

const EmailInput: FC<EmailInputProps> = ({ value = '', onChange , onBlur, err}) => {
  return (
    <TextField
      label="Email"
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      type="email"
      error={err}
      autoComplete="email"
    />
    
  );
};

export default EmailInput;