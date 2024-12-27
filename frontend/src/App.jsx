import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import FetchEventById from "./FetchEventById";
import AllEvents from "./AllEvents";
import UpdateEvent from "./UpdateEvent";
import DeleteEvent from "./DeleteEvent";
import AddEvent from "./AddEvent";

const App = () => {
  return (
    <Router>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <Routes>
          <Route path="/" element={<h1>Welcome to Event Management</h1>} />
          <Route path="/fetch" element={<FetchEventById />} />
          <Route path="/events" element={<AllEvents />} />
          <Route path="/update" element={<UpdateEvent />} />
          <Route path="/delete" element={<DeleteEvent />} />
          <Route path="/add" element={<AddEvent />} />{" "}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
