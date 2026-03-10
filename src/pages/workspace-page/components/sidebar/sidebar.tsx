import React from "react";

import css from "./sidebar.module.css";
import { getInitials } from "../../utils/functions";
import { NavLink, useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../constants/routes";
import { useCreateTask } from "../../../create-task/state/create-task-state";
import { useAuthProfile } from "../../../auth-page/state/auth-state";

const Sidebar = () => {
  const navigate = useNavigate();

  const { userProfile: userProfileInfo } = useAuthProfile();
  const { tasks } = useCreateTask();

  const handleChangePage = () => {
    navigate(ROUTES.TODOS);
  };

  const setActive = ({ isActive }: { isActive: boolean }) =>
    isActive ? `${css.navItem} ${css.active}` : css.navItem;

  return (
    <div className={css.wrapper}>
      <div className={css.title}>TaskMaster AI</div>
      <div className={css.userProfile}>
        <div className={css.avatar}>
          {getInitials(userProfileInfo.fullName)}
        </div>
        <div>
          <p className={css.userName}>{userProfileInfo.fullName}</p>
          <p className={css.userEmail}>{userProfileInfo.email}</p>
        </div>
      </div>
      <nav>
        <div className={css.navTitle}>Главное</div>
        <NavLink to={ROUTES.WORKSPACE} className={setActive}>
          <span className={css.icon}>📊</span>
          Дашборд
        </NavLink>
        <NavLink
          to={ROUTES.TODOS}
          className={setActive}
          onClick={handleChangePage}
        >
          <span className={css.icon}>📝</span>
          Все задачи
          {tasks.length > 0 && (
            <span className={css.badge}>{tasks.length}</span>
          )}
        </NavLink>
        <NavLink to="/to" className={setActive}>
          <span className={css.icon}>✅</span>Завершенные
          {/* <span className={css.badge}>8</span> */}
        </NavLink>

        <div className={css.navTitle}>Проекты</div>
        <NavLink to="/tasks/filter/работа" className={setActive}>
          <span className={css.icon}>💼</span>Работа
        </NavLink>
        <NavLink to="/tasks/filter/личное" className={setActive}>
          <span className={css.icon}>🏠</span>Личное
        </NavLink>
        <NavLink to="/tasks/filter/цели" className={css.navItem}>
          <span className={css.icon}>🎯</span>Цели
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
