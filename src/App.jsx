import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PagenotFound from "./pages/PagenotFound";
import Signup from "./pages/Signup";
import ClientAuth from "./security/ClientAuth";
import RequireAuth from "./security/RequireAuth";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<ClientAuth />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/" element={<RequireAuth allowedRole="CUSTOMER" />}>
          <Route path="profile" element={<p>Profile</p>} />
        </Route>
        <Route path="/admin" element={<RequireAuth allowedRoles="ADMIN" />}>
          <Route path="dashboard" element={<p>Admin dashboard</p>} />
        </Route>
        <Route path="/*" element={<PagenotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
