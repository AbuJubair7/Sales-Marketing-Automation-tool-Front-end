"use client";

const Navbar = () => {
  return (
    <nav style={{ backgroundColor: "orange", padding: "10px", color: "white" }}>
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", gap: "50px" }}>
          <a href="/" style={{ textDecoration: "none", color: "white" }}>
            Home
          </a>
          <a href="/about" style={{ textDecoration: "none", color: "white" }}>
            About
          </a>
          <a href="/contact" style={{ textDecoration: "none", color: "white" }}>
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
