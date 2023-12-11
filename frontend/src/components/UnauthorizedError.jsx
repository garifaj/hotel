import React from "react";

const UnauthorizedError = () => {
  return (
    <>
      <div className="container">
        <h2 style={{ color: "red", paddingTop: "1.5rem" }}>
          Unauthorized Access
        </h2>
        <p style={{ maxWidth: "50rem" }}>
          You do not have permission to view this page. Please log in with
          appropriate credentials or contact an administrator for assistance.
        </p>
      </div>
    </>
  );
};

export default UnauthorizedError;
