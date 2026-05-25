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

      </Routes>

    </BrowserRouter>
  );
}

export default App;