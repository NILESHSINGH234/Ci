import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import logo from "./logo.png";
import { Home } from "./pages/Home/Home";
import { Profile } from "./pages/Profile/Profile";
import { Login } from "./pages/Login/Login";
import { Signup } from "./pages/Signup/Signup";
import { Home } from "./pages/Home/Home";
import { ToasterWrapper } from "./utils";
function App() {
  return (
    <div className="App">
     <ToasterWrapper></ToasterWrapper>
     <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post" element={<SinglePost />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
