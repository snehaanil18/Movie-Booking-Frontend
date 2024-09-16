import React from 'react';

interface TextareaProps {
  label: string;
  name: string;
  value: string;
  placeholder?: string;
  rows?: number;
  cols?: number;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const Textarea: React.FC<TextareaProps> = ({
  label,
  name,
  value,
  placeholder,
  rows = 4,
  cols = 50,
  onChange,
}) => {
  return (
    <div className="textareaField">
      <label htmlFor={name}>{label}</label>
      <textarea
        name={name}
        id={name}
        value={value}
        placeholder={placeholder}
        rows={rows}
        cols={cols}
        onChange={onChange}
      />
    </div>
  );
};

export default Textarea;
