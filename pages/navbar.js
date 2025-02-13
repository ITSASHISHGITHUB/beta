import React from "react";

const Navbar = ({ status, session }) => {
  return (
    <nav style={{ display: "flex", justifyContent: "space-between", padding: "10px 20px", backgroundColor: "#333", color: "white" }}>
      <h1>My App</h1>
      {status === "authenticated" && session?.user && (
        <div style={{ display: "flex", alignItems: "center" }}>
          <span style={{ marginRight: "10px" }}>
            Welcome, {session.user.name &&
              session.user.name
                .toLowerCase()
                .split(" ")
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
          </span>
          <div style={{ position: "relative", display: "inline-block" }}>
            <img
              src={session.user.image}
              alt={session.user.name}
              style={{ width: "32px", height: "32px", borderRadius: "50%" }}
            />
            <span style={{
              position: "absolute",
              bottom: "0",
              right: "0",
              width: "8px",
              height: "8px",
              backgroundColor: "#44b700",
              borderRadius: "50%",
              border: "2px solid white"
            }}></span>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;