import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Rooms from "./components/room/Rooms";
import CreateRoom from "./components/room/CreateRoom";
import EditRoom from "./components/room/EditRoom";
import Users from "./components/user/Users";
import CreateUser from "./components/user/CreateUser";
import EditUser from "./components/user/EditUser";
import Blogs from "./components/blog/Blogs";
import CreateBlog from "./components/blog/CreateBlog";
import EditBlog from "./components/blog/EditBlog";
import BlogDetails from "./components/blog/BlogDetails";
import RoomDetails from "./components/room/RoomDetails";
import BookingTable from "./components/booking/BookingTable";
import MyBookings from "./components/booking/MyBookings";
import { useEffect, useState } from "react";
import UnauthorizedError from "./components/UnauthorizedError";

function App() {
  const [user, setUser] = useState({
    id: "",
    name: "",
    isAdmin: false,
  });

  useEffect(() => {
    // Fetch user data when the component mounts and when authentication changes
    const fetchUserData = async () => {
      const response = await fetch("http://localhost:8000/api/user", {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setUser({
          id: data.id,
          name: data.name,
          isAdmin: data.isAdmin,
        });
      }
    };

    fetchUserData();
  }, [user.id, user.name, user.isAdmin]);

  return (
    <BrowserRouter>
      <Navbar user={user} setUser={setUser} />
      <main>
        <Routes>
          {user.isAdmin && (
            <>
              <Route path="/rooms" element={<Rooms />} />
              <Route path="/rooms/create" element={<CreateRoom />} />
              <Route path="/rooms/edit/:roomid" element={<EditRoom />} />

              <Route path="/blogs" element={<Blogs />} />
              <Route
                path="/blogs/create"
                element={<CreateBlog user={user} />}
              />
              <Route path="/blogs/edit/:blogid" element={<EditBlog />} />

              <Route path="/users" element={<Users />} />
              <Route path="/users/edit/:userid" element={<EditUser />} />
              <Route path="/users/create" element={<CreateUser />} />
              <Route path="/allbookings" element={<BookingTable />} />
            </>
          )}
          {!user.isAdmin && <Route path="/*" element={<UnauthorizedError />} />}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/rooms/details/:roomid"
            element={<RoomDetails user={user} />}
          />
          <Route path="/blogs/details/:blogid" element={<BlogDetails />} />
          <Route path="/mybookings" element={<MyBookings user={user} />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
