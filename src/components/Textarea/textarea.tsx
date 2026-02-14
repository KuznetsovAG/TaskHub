import * as React from "react";

import css from "./textarea.module.css";

interface TextareaComponentProps {
  title: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const TextareaComponent = ({
  title,
  placeholder,
  value,
  onChange,
}: TextareaComponentProps) => {
  return (
    <div className={css.wrapper}>
      <p className={css.title}>{title}</p>
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={css.input}
      />
    </div>
  );
};
