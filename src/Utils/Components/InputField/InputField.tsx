import React from 'react';
import styles from './field.module.css'

interface InputFieldProps {
  label: string;
  type: string;
  name: string;
  value:  string | number | File | null;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  readOnly?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  name,
  value,
  placeholder,
  onChange,
  className = '',
}) => {
  return (
    <div className={styles.inputField}>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        name={name}
        id={name}
        value={type !== 'file' ? value as string | number : undefined}
        placeholder={placeholder}
        onChange={onChange}
        className={className}
      />
    </div>
  );
};

export default InputField;
