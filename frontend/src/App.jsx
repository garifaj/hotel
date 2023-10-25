import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Rooms from "./components/room/Rooms";
import Users from "./components/user/Users";
import CreateRoom from "./components/room/CreateRoom";
import EditRoom from "./components/room/EditRoom";
import "bootstrap/dist/css/bootstrap.min.css";
import EditUser from "./components/user/EditUser";
import CreateUser from "./components/user/CreateUser";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useEffect, useState } from "react";
import Home from "./components/Home";
import RoomDetails from "./components/room/RoomDetails";
import Blogs from "./components/blog/Blogs";
import CreateBlog from "./components/blog/CreateBlog";
import EditBlog from "./components/blog/EditBlog";

function App() {
  const [name, setName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const fetchUserData = async () => {
    const response = await fetch("http://localhost:8000/api/user", {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (response.ok) {
      const data = await response.json();
      setName(data.name);
      setIsAdmin(data.isAdmin);
    }
  };

  useEffect(() => {
    // Fetch user data when the component mounts and when authentication changes
    fetchUserData();
  }, [name, isAdmin]);
  return (
    <BrowserRouter>
      <Navbar
        name={name}
        setName={setName}
        isAdmin={isAdmin}
        setIsAdmin={setIsAdmin}
      />
      <main>
        <Routes>
          <Route path="/" exact element={<Home name={name} />} />
          <Route path="/rooms" element={<Rooms />}></Route>
          <Route path="/rooms/create" element={<CreateRoom />}></Route>
          <Route path="/rooms/edit/:roomid" element={<EditRoom />}></Route>
          <Route
            path="/rooms/details/:roomid"
            element={<RoomDetails />}
          ></Route>

          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/create" element={<CreateBlog />}></Route>
          <Route path="/blogs/edit/:blogid" element={<EditBlog />}></Route>

          <Route path="/users" element={<Users />}></Route>
          <Route path="/users/edit/:userid" element={<EditUser />}></Route>
          <Route path="/users/create" element={<CreateUser />}></Route>
          <Route path="/login" element={<Login setName={setName} />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
