import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import logo from "./logo.png";
import Mockman from "mockman-js";
import { useSelector } from "react-redux";
import { Profile } from "./pages/Profile/Profile";
import { Login } from "./pages/Login/Login";
import { Signup } from "./pages/Signup/Signup";
import { Home } from "./pages/Home/Home";
import { ToasterWrapper } from "./utils/ToasterWrapper";
import { SinglePost } from "./pages/SinglePost/SinglePost";
import { Explore } from "./pages/Explore/Explore";
import { PrivateRoute } from "./routes/PrivateRoutes";
function App() {
  const { token } = useSelector(state => state.auth);
  return (
    <div className="App">
     <ToasterWrapper></ToasterWrapper>
     <Routes>
     <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/post/:postId" element={<SinglePost />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/explore" element={<Explore />} />
        </Route>
        {!token && <Route path="/signup" element={<Signup />} />}
        {!token && <Route path="/login" element={<Login />} />}
        <Route path="/mock" element={<Mockman />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
