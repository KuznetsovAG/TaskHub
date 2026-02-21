export const validateFormValue = (value: string) => {
  if (!value) {
    return "Заполните поле";
  }

  return undefined;
};
