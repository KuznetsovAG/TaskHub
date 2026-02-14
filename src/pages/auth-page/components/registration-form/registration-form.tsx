import React, { useState } from "react";
import css from "./registration-form.module.css";
import { Controller, useForm } from "react-hook-form";
import type { FormValues } from "../../utils/types";
import {
  validateEmail,
  validatePassword,
  validateUserName,
  validateСonfirmPassword,
} from "../../utils/functions";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../constants/routes";
import { Button, Input } from "../../../../components";

const RegistrationForm = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm<FormValues>({
    mode: "onChange",
  });

  const onSubmitForm = (data: FormValues) => {
    console.log("data :>> ", data);
    navigate(ROUTES.MAIN_PAGE);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmitForm)} className={css.form}>
        <div className={css.container}>
          <Controller
            control={control}
            name="email"
            render={({ field, fieldState }) => (
              <Input
                title="Электронная почта"
                placeholder="Заполните вашу почту"
                value={field.value}
                onChange={field.onChange}
                error={fieldState.error}
              />
            )}
            rules={{ validate: validateEmail }}
          />

          <Controller
            control={control}
            name="userName"
            render={({ field, fieldState }) => (
              <Input
                title="Введите ваше имя"
                placeholder="Заполните имя"
                value={field.value}
                onChange={field.onChange}
                error={fieldState.error}
              />
            )}
            rules={{ validate: validateUserName }}
          />

          <Controller
            control={control}
            name="password"
            render={({ field, fieldState }) => (
              <Input
                title="Пароль"
                placeholder="Заполните пароль"
                type={isVisible ? "text" : "password"}
                value={field.value}
                onChange={field.onChange}
                error={fieldState.error}
              />
            )}
            rules={{ validate: validatePassword }}
          />

          <Controller
            control={control}
            name="confirmPassword"
            render={({ field, fieldState }) => (
              <Input
                title="Подтвердить пароль"
                placeholder="Подтвердить пароль"
                type={isVisible ? "text" : "password"}
                value={field.value}
                onChange={field.onChange}
                error={fieldState.error}
              />
            )}
            rules={{ validate: validateСonfirmPassword }}
          />
          <label className={css.checkboxContent}>
            <input
              type="checkbox"
              checked={isVisible}
              onChange={(e) => setIsVisible(e.target.checked)}
              className={css.checkbox}
            />
            Показать пароль
          </label>

          <Button title="Зарегистрироваться" />
        </div>
      </form>
      <div className={css.verification}>
        <p>У вас уже есть аккаунт:</p>
        <button className={css.button}>Войти</button>
      </div>
    </>
  );
};

export default RegistrationForm;
