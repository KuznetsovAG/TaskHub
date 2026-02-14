import * as React from "react";

import css from "./button.module.css";

interface ButtonProps {
  title: string;
  onClick?: () => void;
  isLoading?: boolean;
  disabled?: boolean;
}

export const Button = ({
  title,
  onClick,
  isLoading,
  disabled,
}: ButtonProps) => {
  return (
    <button className={css.button} onClick={onClick} disabled={disabled}>
      {isLoading ? "Загрузка ..." : title}
    </button>
  );
};
