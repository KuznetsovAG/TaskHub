import React from "react";

import css from "./sidebar.module.css";
import { useDispatch } from "react-redux";
import { setCurrentPage } from "../../state/workspace-slice";

const Sidebar = () => {
  const dispatch = useDispatch();

  const handleChangeCurrentPage = (value: string) => {
    dispatch(setCurrentPage(value));
  };

  return (
    <div className={css.wrapper}>
      <div className={css.title}>TaskMaster AI</div>
      <div className={css.userProfile}>
        <div className={css.avatar}>AK</div>
        <div>
          <p className={css.userName}>Алексей Кузнецов</p>
          <p className={css.userEmail}>alex@email.com</p>
        </div>
      </div>
      <nav>
        <div className={css.navTitle}>Главное</div>
        <div
          className={`${css.navItem} ${css.active}`}
          onClick={() => handleChangeCurrentPage("createTask")}
        >
          <span className={css.icon}>📊</span>
          Дашборд
          <span className={css.badge}>8</span>
        </div>
        <div
          className={css.navItem}
          onClick={() => handleChangeCurrentPage("tasks")}
        >
          <span className={css.icon}>📝</span>
          Все задачи
          <span className={css.badge}>8</span>
        </div>
        <div className={css.navItem}>
          <span className={css.icon}>⭐</span>Важные
          <span className={css.badge}>8</span>
        </div>
        <div className={css.navItem}>
          <span className={css.icon}>📅</span>Сегодня
          <span className={css.badge}>8</span>
        </div>
        <div className={css.navItem}>
          <span className={css.icon}>✓</span>Завершенные
          <span className={css.badge}>8</span>
        </div>

        <div className={css.navTitle}>Проекты</div>
        <div className={css.navItem}>
          <span className={css.icon}>💼</span>Работа
        </div>
        <div className={css.navItem}>
          <span className={css.icon}>🏠</span>Личное
        </div>
        <div className={css.navItem}>
          <span className={css.icon}>🎯</span>Цели
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
