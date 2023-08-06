import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Rooms from "./components/Rooms";
import CreateRoom from "./components/CreateRoom";
import EditRoom from "./components/EditRoom";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/rooms" element={<Rooms />}></Route>
        <Route path="/rooms/create" element={<CreateRoom />}></Route>
        <Route path="/rooms/edit/:roomid" element={<EditRoom />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
