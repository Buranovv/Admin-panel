import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import TeachersPage from "./pages/TeachersPage";
import StudentsPage from "./pages/StudentsPage";
import { useState } from "react";
import NotFoundPage from "./pages/NotFoundPage";
import { TOKEN } from "./const";
import AdminLayout from "./components/layout/AdminLayout";
import TeacherStudentsPage from "./pages/TeacherStudentsPage";

function App() {
  const [isLogin, setIsLogin] = useState(
    localStorage.getItem(TOKEN) ? true : false
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="login" />} />
        <Route
          path="login"
          element={
            isLogin !== true ? (
              <LoginPage setIsLogin={setIsLogin} />
            ) : (
              <Navigate to="/dashboard" />
            )
          }
        />
        {isLogin ? (
          <Route element={<AdminLayout setIsLogin={setIsLogin} />}>
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="teachers" element={<TeachersPage />} />
            <Route path="students" element={<StudentsPage />} />
            <Route
              path="teachers/:teacherId"
              element={<TeacherStudentsPage />}
            />
          </Route>
        ) : null}
        <Route path="*" element={<NotFoundPage isLogin={isLogin} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
