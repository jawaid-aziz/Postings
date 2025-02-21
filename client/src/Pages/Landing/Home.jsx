import React from "react";

export const Home = () => {
  return (
    <div
      style={{
        fontFamily: "sans-serif",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header (Navbar) */}
      <header
        style={{
          backgroundColor: "#f0f0f0",
          padding: "1rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ fontWeight: "bold", fontSize: "1.5rem" }}>Postings</div>
        <nav>
          <a
            href="#"
            style={{ margin: "0 1rem", textDecoration: "none", color: "#333" }}
          >
            Browse Jobs
          </a>
          <a
            href="#"
            style={{ margin: "0 1rem", textDecoration: "none", color: "#333" }}
          >
            Companies
          </a>
          <a
            href="#"
            style={{ margin: "0 1rem", textDecoration: "none", color: "#333" }}
          >
            About
          </a>
          <a
            href="#"
            style={{ margin: "0 1rem", textDecoration: "none", color: "#333" }}
          >
            Contact
          </a>
        </nav>
      </header>

      {/* Hero Section */}
      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "2rem",
        }}
      >
        <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>
          Find Your Dream Job or Hire Top Talent
        </h1>
        <p style={{ fontSize: "1.2rem", marginBottom: "2rem" }}>
          Connect with the best opportunities and candidates.
        </p>
        <div>
          <button
            style={{
              padding: "1rem 2rem",
              margin: "0 1rem",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Hire
          </button>
          <button
            style={{
              padding: "1rem 2rem",
              margin: "0 1rem",
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Apply
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer
        style={{
          backgroundColor: "#333",
          color: "white",
          padding: "1rem",
          textAlign: "center",
        }}
      >
        <p>&copy; {new Date().getFullYear()} Postings. All rights reserved.</p>
      </footer>
    </div>
  );
};
