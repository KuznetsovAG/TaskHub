import React from "react";

import css from "./auth-page.module.css";
import RegistrationForm from "./components/registration-form/registration-form";

const AuthPage = () => {
  return (
    <div className={css.wrapper}>
      <div className={css.container}>
        <div className={css.header}>
          <div className={css.title}>Создайте аккаунт</div>
          <div className={css.subTitle}>
            Организуйте свои задачи профессионально
          </div>
        </div>
        <RegistrationForm />
      </div>
    </div>
  );
};

export default AuthPage;
