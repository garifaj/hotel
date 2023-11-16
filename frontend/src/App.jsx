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
import BlogDetails from "./components/blog/BlogDetails";
import BookingTable from "./components/booking/BookingTable";
import MyBookings from "./components/booking/MyBookings";

function App() {
  const [id, setId] = useState("");
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
      setId(data.id);
    }
  };

  useEffect(() => {
    // Fetch user data when the component mounts and when authentication changes
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
              <Route path="/blogs/create" element={<CreateBlog />} />
              <Route path="/blogs/edit/:blogid" element={<EditBlog />} />

              <Route path="/users" element={<Users />} />
              <Route path="/users/edit/:userid" element={<EditUser />} />
              <Route path="/users/create" element={<CreateUser />} />
              <Route path="allbookings" element={<BookingTable />} />
            </>
          )}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setName={setName} />} />
          <Route path="/signup" element={<Signup />} />{" "}
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
