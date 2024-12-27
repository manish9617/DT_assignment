import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={{ padding: "10px", backgroundColor: "#333", color: "#fff" }}>
      <ul style={{ listStyleType: "none", display: "flex", gap: "20px" }}>
        <li>
          <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/fetch" style={{ color: "#fff", textDecoration: "none" }}>
            Fetch Event
          </Link>
        </li>
        <li>
          <Link to="/events" style={{ color: "#fff", textDecoration: "none" }}>
            All Events
          </Link>
        </li>
        <li>
          <Link to="/update" style={{ color: "#fff", textDecoration: "none" }}>
            Update Event
          </Link>
        </li>
        <li>
          <Link to="/delete" style={{ color: "#fff", textDecoration: "none" }}>
            Delete Event
          </Link>
        </li>
        <li>
          <Link to="/add" style={{ color: "#fff", textDecoration: "none" }}>
            Add Event
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
