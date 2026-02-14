import * as React from "react";
import css from "./select.module.css";

interface SelectProps {
  options: string[];
  optionTitle: string;
  title?: string;
  onChange: (value: string) => void;
  value: string;
}

export const Select = ({
  title,
  optionTitle,
  options,
  value,
  onChange,
}: SelectProps) => {
  return (
    <div className={css.formGroup}>
      <label className={css.formLabel}>{title}</label>
      <select
        className={css.formSelect}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option>{optionTitle}</option>
        {options.map((item) => (
          <option>{item}</option>
        ))}
      </select>
    </div>
  );
};
