import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/common/Login";
import SignUp from "./components/common/SignUp";
import Home from "./components/common/Home";
import AdminHome from "./components/admin/AdminHome";
import AgentHome from "./components/agent/AgentHome";
import HomePage from "./components/user/HomePage";
import Complaint from "./components/user/Complaint";
import Status from "./components/user/Status";
import AgentInfo from "./components/admin/AgentInfo";
import UserInfo from "./components/admin/UserInfo";
const ProtectedRoute = ({ element: Component, allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user && allowedRoles.includes(user.role) ? (
    Component
  ) : (
    <Navigate to="/Login" replace />
  );
};

function App() {
  return (
    <Router>
      <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/Login" element={<Login />} />
  <Route path="/SignUp" element={<SignUp />} />

  <Route
    path="/AdminHome"
    element={<ProtectedRoute element={<AdminHome />} allowedRoles={["Admin"]} />}
  />
  <Route
    path="/AgentHome"
    element={<ProtectedRoute element={<AgentHome />} allowedRoles={["Agent"]} />}
  />
  <Route
    path="/Homepage"
    element={<ProtectedRoute element={<HomePage />} allowedRoles={["User"]} />}
  />
  <Route
    path="/Complaint"
    element={<ProtectedRoute element={<Complaint />} allowedRoles={["User"]} />}
  />
  <Route
    path="/Status"
    element={<ProtectedRoute element={<Status />} allowedRoles={["User"]} />}
  />
  <Route
    path="/UserInfo"
    element={<ProtectedRoute element={<UserInfo />} allowedRoles={["Admin"]} />}
  />
  <Route
    path="/AgentInfo"
    element={<ProtectedRoute element={<AgentInfo />} allowedRoles={["Admin"]} />}
  />

  <Route path="*" element={<Navigate to="/Login" replace />} />
</Routes>

    </Router>
  );
}

export default App;
