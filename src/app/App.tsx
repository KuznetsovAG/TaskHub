import { Navigate, Route, Routes } from "react-router-dom";
import AuthPage from "../pages/auth-page/auth-page";
import { ROUTES } from "../constants/routes";
import WorkspacePage from "../pages/workspace-page/workspace-page";
import CreateTask from "../pages/create-task/create-task";
import TasksPage from "../pages/tasks-page/tasks-page";
import MainLayout from "../pages/main-layout/main-layout";
import FilteredTaskCard from "../pages/filtered-task-card/filtered-task-card";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 2500,
          style: {
            borderRadius: "12px",
            border: "1px solid #E6E8EC",
            padding: "12px 14px",
            fontSize: "14px",
          },
        }}
      />
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
