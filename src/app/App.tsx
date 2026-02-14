import { Route, Routes } from "react-router-dom";
import AuthPage from "../pages/auth-page/auth-page";
import { ROUTES } from "../constants/routes";
import WorkspacePage from "../pages/workspace-page/workspace-page";

function App() {
  return (
    <div className="">
      <Routes>
        <Route path={ROUTES.REGISTRATION_PAGE} element={<AuthPage />} />
        <Route path={ROUTES.MAIN_PAGE} element={<WorkspacePage />} />
      </Routes>
    </div>
  );
}

export default App;
