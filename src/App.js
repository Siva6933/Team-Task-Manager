import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Team from "./pages/Team";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Projects from "./pages/Projects";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/tasks"
          element={<Tasks />}
        />

        <Route
          path="/team"
          element={<Team />}
        />

        <Route
          path="/settings"
          element={<Settings />}
        />

        <Route
          path="/projects"
          element={<Projects />}
        />

        <Route 
          path="/signup" 
          element={<Signup />} 
        />

        <Route 
          path="/forgot-password" 
          element={<ForgotPassword />} 
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
