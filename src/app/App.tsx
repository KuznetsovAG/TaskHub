import { Navigate, Route, Routes } from "react-router-dom";
import AuthPage from "../pages/auth-page/auth-page";
import { ROUTES } from "../constants/routes";
import WorkspacePage from "../pages/workspace-page/workspace-page";
import CreateTask from "../pages/create-task/create-task";
import TasksPage from "../pages/tasks-page/tasks-page";
import MainLayout from "../pages/main-layout/main-layout";
import FilteredTaskCard from "../pages/filtered-task-card/filtered-task-card";

function App() {
  return (
    <div className="">
      <Routes>
        <Route path={ROUTES.AUTH} element={<AuthPage />} />

        <Route element={<MainLayout />}>
          <Route path={ROUTES.WORKSPACE} element={<WorkspacePage />} />
          <Route path={ROUTES.TODOS} element={<TasksPage />} />
          <Route path={ROUTES.CREATE_TASK} element={<CreateTask />} />
          <Route path="tasks/filter/:filter" element={<FilteredTaskCard />} />
        </Route>

        <Route path="*" element={<Navigate to={ROUTES.WORKSPACE} replace />} />
      </Routes>
    </div>
  );
}

export default App;
