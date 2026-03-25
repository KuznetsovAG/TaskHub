import React from "react";

import css from "./sidebar.module.css";
import { getInitials } from "../../utils/functions";
import { NavLink, useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../constants/routes";
import { useCreateTask } from "../../../create-task/state/create-task-state";
import { useAuthProfile } from "../../../auth-page/state/auth-state";
import { useAuth } from "../../../../hooks/use-auth";

const Sidebar = () => {
  const navigate = useNavigate();

  const { logout } = useAuth();
  const { currentUser } = useAuthProfile();
  const { tasks } = useCreateTask();

  const handleChangePage = () => {
    navigate(ROUTES.TODOS);
  };

  const handleLogout = () => {
    logout();
  };

  const setActive = ({ isActive }: { isActive: boolean }) =>
    isActive ? `${css.navItem} ${css.active}` : css.navItem;

  return (
    <div className={css.wrapper}>
      <div>
        <div className={css.title}>TaskMaster AI</div>
        <div className={css.userProfile}>
          <div className={css.avatar}>
            {getInitials(currentUser ? currentUser.fullName : "")}
          </div>
          <div>
            <p className={css.userName}>
              {currentUser ? currentUser.fullName : ""}
            </p>
            <p className={css.userEmail}>
              {currentUser ? currentUser.email : ""}
            </p>
          </div>
        </div>
        <nav>
          <div className={css.navTitle}>Главное</div>
          <NavLink to={ROUTES.DASHBOARD} className={setActive}>
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
      <button className={css.logoutBtn} onClick={handleLogout}>
        Выйти из аккаунта
      </button>
    </div>
  );
};

export default Sidebar;
