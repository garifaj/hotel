// // import React from "react";
// // import { Link } from "react-router-dom";

// // const Navbar = () => {
// //   return (
//     <>
//       <nav className="navbar navbar-expand-md bg-body-tertiary border-bottom pb-2">
//         <div className="container">
//           <Link to="/" className="navbar-brand mt-1">
//             Hotel System
//           </Link>
//           <button
//             className="navbar-toggler"
//             type="button"
//             data-bs-toggle="collapse"
//             data-bs-target="#navbarNav"
//             aria-controls="navbarNav"
//             aria-expanded="false"
//             aria-label="Toggle navigation"
//           >
//             <span className="navbar-toggler-icon"></span>
//           </button>
//           <div
//             className="collapse navbar-collapse justify-content-center"
//             id="navbarNav"
//           >
//             <ul className="navbar-nav mx-auto">
//               <li className="nav-item me-3">
//                 <Link to="/rooms" className="nav-link">
//                   Rooms
//                 </Link>
//               </li>
//               <li className="nav-item me-3">
//                 <Link to="/users" className="nav-link">
//                   Users
//                 </Link>
//               </li>
//             </ul>
// <div className="ml-auto">
//   <Link to="/signup" className="btn btn-transparent">
//     Sign up
//   </Link>
//   <Link
//     to="/login"
//     className="btn btn-md ms-1 rounded-4 py-1  "
//     style={{
//       backgroundColor: "rgba(104, 85, 224, 1)",
//       color: "white",
//     }}
//     onMouseEnter={(e) =>
//       (e.target.style.backgroundColor = "rgb(66, 50, 168)")
//     }
//     onMouseLeave={(e) =>
//       (e.target.style.backgroundColor = "rgba(104, 85, 224, 1)")
//     }
//   >
//     Login
//   </Link>
// </div>
//           </div>
//         </div>
//       </nav>
//     </>
//   );
// };

// export default Navbar;
import React from "react";
import { Link } from "react-router-dom";

const Navbar = (props) => {
  const logout = async () => {
    await fetch("http://localhost:8000/api/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    props.setName("");
  };

  let menu;
  if (!props.name) {
    menu = (
      <div className="ml-auto">
        <Link to="/signup" className="btn btn-transparent">
          Sign up
        </Link>
        <Link
          to="/login"
          className="btn btn-md ms-1 rounded-4 py-1  "
          style={{
            backgroundColor: "rgba(104, 85, 224, 1)",
            color: "white",
          }}
          onMouseEnter={(e) =>
            (e.target.style.backgroundColor = "rgb(66, 50, 168)")
          }
          onMouseLeave={(e) =>
            (e.target.style.backgroundColor = "rgba(104, 85, 224, 1)")
          }
        >
          Login
        </Link>
      </div>
    );
  } else {
    menu = (
      <ul className="navbar-nav me-auto mb-2 mb-md-0">
        <li className="nav-item active">
          <Link to="/login" className="nav-link" onClick={logout}>
            Logout
          </Link>
        </li>
      </ul>
    );
  }

  return (
    <nav className="navbar navbar-expand-md bg-body-tertiary border-bottom pb-2">
      <div className="container">
        <Link to="/" className="navbar-brand mt-1">
          Hotel System
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-center"
          id="navbarNav"
        >
          <ul className="navbar-nav mx-auto">
            <li className="nav-item me-3">
              <Link to="/rooms" className="nav-link">
                Rooms
              </Link>
            </li>
            <li className="nav-item me-3">
              <Link to="/users" className="nav-link">
                Users
              </Link>
            </li>
          </ul>
          <div>{menu}</div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
