import * as React from "react";
import css from "./select.module.css";
import type { FieldError } from "react-hook-form";

interface SelectProps {
  options: string[];
  optionTitle: string;
  title?: string;
  onChange: (value: string) => void;
  value: string;
  error?: FieldError;
}

export const Select = ({
  title,
  optionTitle,
  options,
  value,
  onChange,
  error,
}: SelectProps) => {
  return (
    <div className={css.formGroup}>
      <label className={css.formLabel}>{title}</label>
      <select
        className={css.formSelect}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        data-error={!!error}
      >
        <option>{optionTitle}</option>
        {options.map((item) => (
          <option>{item}</option>
        ))}
      </select>
      {error && <p className={css.error}>{error.message}</p>}
    </div>
  );
};
