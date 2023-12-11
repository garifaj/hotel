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
import { setDate } from "date-fns";

function App() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Fetch user data when the component mounts and when authentication changes
    const fetchUserData = async () => {
      const response = await fetch("http://localhost:8000/api/user", {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setName(data.name);
        setIsAdmin(data.isAdmin);
        setId(data.id);
      }
    };

    fetchUserData();
  }, [name, isAdmin, id]);

  return (
    <BrowserRouter>
      <Navbar
        name={name}
        setName={setName}
        isAdmin={isAdmin}
        setIsAdmin={setIsAdmin}
        setId={setId}
      />
      <main>
        <Routes>
          {isAdmin && (
            <>
              <Route path="/rooms" element={<Rooms />} />
              <Route path="/rooms/create" element={<CreateRoom />} />
              <Route path="/rooms/edit/:roomid" element={<EditRoom />} />

              <Route path="/blogs" element={<Blogs />} />
              <Route
                path="/blogs/create"
                element={<CreateBlog name={name} />}
              />
              <Route path="/blogs/edit/:blogid" element={<EditBlog />} />

              <Route path="/users" element={<Users />} />
              <Route path="/users/edit/:userid" element={<EditUser />} />
              <Route path="/users/create" element={<CreateUser />} />
              <Route path="/allbookings" element={<BookingTable />} />
            </>
          )}
          {!isAdmin && <Route path="/*" element={<UnauthorizedError />} />}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setName={setName} />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/rooms/details/:roomid"
            element={<RoomDetails name={name} />}
          />
          <Route path="/blogs/details/:blogid" element={<BlogDetails />} />
          <Route path="/mybookings" element={<MyBookings id={id} />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
