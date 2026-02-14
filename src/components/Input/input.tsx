import React from "react";

import css from "./input.module.css";
import type { FieldError } from "react-hook-form";

interface InputProps {
  title: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: FieldError;
  type?: string;
}

export const Input = ({
  title,
  placeholder,
  value,
  onChange,
  error,
  type = "text",
}: InputProps) => {
  return (
    <div className={css.wrapper}>
      <p className={css.title}>{title}</p>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={css.input}
        data-error={!!error}
      />
      {error && <p className={css.error}>{error.message}</p>}
    </div>
  );
};
