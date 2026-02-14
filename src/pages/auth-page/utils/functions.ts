import type { FormValues } from "./types";

export const validateEmail = (email: string): string | undefined => {
  if (!email) {
    return "Email обязателен";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return "Введите корректный email";
  }

  const [localPart, domain] = email.split("@");

  if (
    localPart.startsWith(".") ||
    localPart.endsWith(".") ||
    localPart.includes("..")
  ) {
    return "Некорректная локальная часть email";
  }

  if (domain.includes("..") || domain.startsWith("-") || domain.endsWith("-")) {
    return "Некорректный домен email";
  }

  return undefined;
};

export const validatePassword = (password: string): string | undefined => {
  if (!password) {
    return "Пароль обязателен";
  }

  if (password.length < 8) {
    return "Пароль должен быть не короче 8 символов";
  }

  const specialCharRegex = /[^a-zA-Z0-9]/;

  if (!specialCharRegex.test(password)) {
    return "Пароль должен содержать хотя бы один спецсимвол";
  }

  return undefined;
};

export const validateСonfirmPassword = (
  password: string,
  formState: FormValues
): string | undefined => {
  if (!password) {
    return "Пароль обязателен";
  }

  if (password.length < 8) {
    return "Пароль должен быть не короче 8 символов";
  }

  const specialCharRegex = /[^a-zA-Z0-9]/;

  if (!specialCharRegex.test(password)) {
    return "Пароль должен содержать хотя бы один спецсимвол";
  }

  if (formState.password !== password) {
    return "Пароли не совпадают";
  }

  return undefined;
};

export const validateUserName = (password: string): string | undefined => {
  if (!password) {
    return "Поле обязателено";
  }

  return undefined;
};
