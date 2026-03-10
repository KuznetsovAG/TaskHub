import React, { useState } from "react";

import css from "./create-task.module.css";
import { categoryOptions, projectOptions } from "./utils/constants";
import { Button, Input, Select, TextareaComponent } from "../../components";
import type { Priority } from "../workspace-page/utils/types";
import { Controller, useForm } from "react-hook-form";
import type { FormValues } from "./utils/types";
import { validateFormValue } from "./utils/functions";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { useCreateTask } from "./state/create-task-state";

const CreateTask = () => {
  const [priority, setPriority] = useState<Priority | string>("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const addTask = useCreateTask((state) => state.addTask);

  const { control, handleSubmit, setValue } = useForm<FormValues>();

  const handleSubmitForm = ({
    taskValue,
    category,
    descriptionValue,
    dueDate,
    projectName,
    startDate,
  }: FormValues) => {
    if (!taskValue) {
      return;
    }

    const todoTask = {
      id: Number(new Date()),
      isCompleted: false,
      taskValue,
      descriptionValue,
      priority,
      category,
      projectName,
      startDate,
      dueDate,
    };

    setIsLoading(true);
    toast.success("Создаем задачу");

    setTimeout(() => {
      addTask(todoTask);
      setIsLoading(false);
      toast.success("Задача успешно создана 🎉");
      navigate(ROUTES.TODOS);
    }, 5000);
  };

  const handleChangePriority = (value: string) => {
    setPriority(value);
    setValue("priority", value, { shouldValidate: true, shouldDirty: true });
  };

  return (
    <div className={css.wrapper}>
      <div className={css.container}>
        <div className={css.header}>
          <div className={css.headerTitle}>Создать новую задачу</div>
          <div className={css.headerSubTitle}>
            Заполните информацию о задаче. AI поможет вам с деталями.
          </div>
        </div>
        <div className={css.mainInfo}>
          <div className={css.title}>
            <span>📝</span>
            Основная информация
          </div>
          <form onSubmit={handleSubmit(handleSubmitForm)}>
            <div className={css.infoContainer}>
              <Controller
                control={control}
                name="taskValue"
                render={({ field, fieldState }) => (
                  <Input
                    value={field.value}
                    onChange={field.onChange}
                    title="Название задачи"
                    placeholder="Например: Подготовить презентацию для клиента"
                    error={fieldState.error}
                  />
                )}
                rules={{ validate: validateFormValue }}
              />
              <Controller
                control={control}
                name="descriptionValue"
                render={({ field, fieldState }) => (
                  <TextareaComponent
                    title="Описание"
                    placeholder="Опишите задачу подробнее..."
                    value={field.value}
                    onChange={field.onChange}
                    error={fieldState.error}
                  />
                )}
                rules={{ validate: validateFormValue }}
              />
              <div className={css.aiAssistBox}>
                <div className={css.aiAssistIcon}>✨</div>
                <div className={css.aiAssistContent}>
                  <div className={css.aiAssistContent}>AI Помощник</div>
                  <div className={css.aiAssistText}>
                    Введите краткое описание, и я помогу структурировать и
                    дополнить его деталями
                  </div>
                </div>
                <button className={css.button}>Улучшить</button>
              </div>
              <div className={css.formRow}>
                <Controller
                  control={control}
                  name="projectName"
                  render={({ field, fieldState }) => (
                    <Select
                      title="Проект"
                      optionTitle="Выберите проект"
                      value={field.value}
                      options={projectOptions}
                      onChange={field.onChange}
                      error={fieldState.error}
                    />
                  )}
                  rules={{ validate: validateFormValue }}
                />

                <Controller
                  control={control}
                  name="category"
                  render={({ field, fieldState }) => (
                    <Select
                      title="Категория"
                      optionTitle="Без категории"
                      value={field.value}
                      options={categoryOptions}
                      onChange={field.onChange}
                      error={fieldState.error}
                    />
                  )}
                  rules={{ validate: validateFormValue }}
                />
              </div>
              <div className={css.priority}>
                <label className={css.priorityLabel}>Приоритет</label>
                <div className={css.priorityOptions}>
                  <div
                    className={`${css.priorityOption} ${
                      priority === "high" && css.high
                    }`}
                    onClick={() => handleChangePriority("high")}
                  >
                    🔴 Высокий
                  </div>
                  <div
                    className={`${css.priorityOption} ${
                      priority === "medium" && css.medium
                    }`}
                    onClick={() => handleChangePriority("medium")}
                    data-active={priority}
                  >
                    🟡 Средний
                  </div>
                  <div
                    className={`${css.priorityOption} ${
                      priority === "low" && css.low
                    }`}
                    onClick={() => handleChangePriority("low")}
                    data-active={priority}
                  >
                    🟢 Низкий
                  </div>
                </div>
              </div>
              <div className={css.formDate}>
                <div className={css.dataGroup}>
                  <label className={css.dateLabel}>Дата начала</label>
                  <Controller
                    control={control}
                    name="startDate"
                    render={({ field }) => (
                      <input
                        type="date"
                        className={css.form}
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                </div>

                <div className={css.dataGroup}>
                  <label className={css.dateLabel}>Дедлайн</label>
                  <Controller
                    control={control}
                    name="dueDate"
                    render={({ field }) => (
                      <input
                        type="date"
                        className={css.form}
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                </div>
              </div>
              <Button
                title="Создать задачу"
                isLoading={isLoading}
                disabled={isLoading}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateTask;
