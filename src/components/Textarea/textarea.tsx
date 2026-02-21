import * as React from "react";

import css from "./textarea.module.css";
import type { FieldError } from "react-hook-form";

interface TextareaComponentProps {
  title: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: FieldError;
}

export const TextareaComponent = ({
  title,
  placeholder,
  value,
  onChange,
  error,
}: TextareaComponentProps) => {
  return (
    <div className={css.wrapper}>
      <p className={css.title}>{title}</p>
      <textarea
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
