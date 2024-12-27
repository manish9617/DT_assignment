import React, { useState } from "react";
import axios from "axios";

const AddEvent = () => {
  const [formData, setFormData] = useState({
    name: "",
    tagline: "",
    schedule: "",
    description: "",
    moderator: "",
    category: "",
    sub_category: "",
    rigor_rank: "",
    image: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const addEvent = async () => {
    try {
      const eventData = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === "image") {
          eventData.append("files[image]", formData.image);
        } else {
          eventData.append(key, formData[key]);
        }
      });

      const response = await axios.post(
        "http://localhost:3000/api/v3/app/events",
        eventData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      alert("Event added successfully");
      setFormData({
        name: "",
        tagline: "",
        schedule: "",
        description: "",
        moderator: "",
        category: "",
        sub_category: "",
        rigor_rank: "",
        image: null,
      });
    } catch (error) {
      console.error(error);
      alert("Error adding event");
    }
  };

  return (
    <div>
      <h2>Add New Event</h2>
      <input
        type="text"
        name="name"
        value={formData.name}
        placeholder="Event Name"
        onChange={handleInputChange}
      />
      <br></br>
      <input
        type="text"
        name="tagline"
        value={formData.tagline}
        placeholder="Event Tagline"
        onChange={handleInputChange}
      />
      <br></br>
      <input
        type="datetime-local"
        name="schedule"
        value={formData.schedule}
        onChange={handleInputChange}
      />
      <br></br>
      <textarea
        style={{ marginTop: "10px" }}
        name="description"
        value={formData.description}
        placeholder="Event Description"
        onChange={handleInputChange}
      />
      <br></br>
      <input
        type="text"
        name="moderator"
        value={formData.moderator}
        placeholder="Moderator"
        onChange={handleInputChange}
      />
      <br></br>
      <input
        type="text"
        name="category"
        value={formData.category}
        placeholder="Event Category"
        onChange={handleInputChange}
      />
      <br></br>
      <input
        type="text"
        name="sub_category"
        value={formData.sub_category}
        placeholder="Event Sub Category"
        onChange={handleInputChange}
      />
      <br></br>
      <input
        type="number"
        name="rigor_rank"
        value={formData.rigor_rank}
        placeholder="Event Rigor Rank"
        onChange={handleInputChange}
      />
      <br></br>
      <input type="file" name="image" onChange={handleFileChange} />
      <br></br>
      <button onClick={addEvent}>Add Event</button>
    </div>
  );
};

export default AddEvent;
