import React, { useState } from "react";

import css from "./create-task.module.css";
import { useDispatch } from "react-redux";
import { addTodo } from "../workspace-page/state/workspace-slice";
import { categoryOptions, projectOptions } from "./utils/constants";
import { Button, Input, Select, TextareaComponent } from "../../components";
import type { Priority } from "../workspace-page/utils/types";

const CreateTask = () => {
  const [taskValue, setTaskValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");
  const [priority, setPriority] = useState<Priority | string>("");
  const [category, setCategory] = useState<string>("");
  const [projectName, setProjectName] = useState<string>("");
  const [startDate, setStartDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskValue(e.target.value);
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescriptionValue(e.target.value);
  };

  const handleChangePriority = (value: string) => {
    setPriority(value);
  };

  const handleChangeStartDate = (e: React.ChangeEvent<HTMLDataElement>) => {
    setStartDate(e.target.value);
  };

  const handleChangeDueDate = (e: React.ChangeEvent<HTMLDataElement>) => {
    setDueDate(e.target.value);
  };

  const createTodoTask = (): void => {
    if (!taskValue) {
      return;
    }

    const todoTask = {
      id: Math.random(),
      isCompleted: false,
      taskValue,
      descriptionValue,
      priority,
      category,
      projectName,
      startDate,
      dueDate,
    };

    dispatch(addTodo(todoTask));
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
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
          <div className={css.infoContainer}>
            <Input
              value={taskValue}
              onChange={handleChange}
              title="Название задачи"
              placeholder="Например: Подготовить презентацию для клиента"
            />
            <TextareaComponent
              title="Описание"
              placeholder="Опишите задачу подробнее..."
              value={descriptionValue}
              onChange={handleTextareaChange}
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
              <Select
                title="Проект"
                optionTitle="Выберите проект"
                value={projectName}
                options={projectOptions}
                onChange={setProjectName}
              />

              <Select
                title="Категория"
                optionTitle="Без категории"
                value={category}
                options={categoryOptions}
                onChange={setCategory}
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
                <input
                  type="date"
                  className={css.form}
                  value={startDate}
                  onChange={handleChangeStartDate}
                />
              </div>

              <div className={css.dataGroup}>
                <label className={css.dateLabel}>Дедлайн</label>
                <input
                  type="date"
                  className={css.form}
                  value={dueDate}
                  onChange={handleChangeDueDate}
                />
              </div>
            </div>
            <Button
              title="Создать задачу"
              onClick={createTodoTask}
              isLoading={isLoading}
              disabled={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTask;
