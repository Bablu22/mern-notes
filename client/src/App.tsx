import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import NotFound from "./pages/NotFound";
import { useAuth } from "./context/AuthContext";
import Categories from "./pages/Categories";
import CreateNote from "./pages/CreateNote";
import EditNote from "./pages/EditNote";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <Router>
        <Navbar />
        <ToastContainer />
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/create-note" element={<CreateNote />} />
            <Route path="/edit-note/:id" element={<EditNote />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
