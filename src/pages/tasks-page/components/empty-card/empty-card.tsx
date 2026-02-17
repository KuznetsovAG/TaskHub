import * as React from "react";
import { Button } from "../../../../components";
import css from "./empty-card.module.css";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../constants/routes";

const EmptyCard = () => {
  const navigate = useNavigate();

  const createFirstTask = () => {
    navigate(ROUTES.CREATE_TASK);
  };
  return (
    <div className={css.container}>
      <div className={css.illustration}>
        <div className={`${css.circle} ${css.circle1}`}></div>
        <div className={`${css.circle} ${css.circle2}`}></div>
        <div className={css.checkmark}>✓</div>
      </div>
      <h2 className={css.title}>Задач пока нет</h2>
      <p className={css.subtitle}>
        Создайте свою первую задачу, чтобы начать управлять своим временем
        эффективно.
      </p>

      <div className={css.actions}>
        <Button title="Создать первую задачу" onClick={createFirstTask} />
      </div>
    </div>
  );
};

export default EmptyCard;
