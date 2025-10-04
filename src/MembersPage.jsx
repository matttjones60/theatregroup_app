// Import React hooks and axios for HTTP requests
import { useState, useEffect } from "react";
import axios from "axios";

function MembersPage() {
  console.log("👥 MembersPage rendered");
  // State to hold the list of members fetched from the backend
  const [members, setMembers] = useState([]);

  // State to hold the form input values
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    contact: ""
  });

  // Fetch members from the backend when the component mounts
  useEffect(() => {
    axios.get("http://localhost:8000/members/")
      .then(res => setMembers(res.data)) // Store the fetched members in state
      .catch(err => console.error(err)); // Log any errors
  }, []);

  // Update formData as the user types into the form fields
  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev, // Keep existing values
      [e.target.name]: e.target.value // Update the changed field
    }));
  };

  // Handle form submission to create a new member
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    axios.post("http://localhost:8000/members/", formData)
      .then(res => {
        setMembers(prev => [...prev, res.data]); // Add the new member to the list
        setFormData({ name: "", role: "", contact: "" }); // Reset the form fields
      })
      .catch(err => console.error(err)); // Log any errors
  };

  return (
    <div
      style={{
        padding: "2rem", // Add spacing around the content
        maxWidth: "600px", // Limit width for readability
        margin: "0 auto", // Center the content horizontally
        fontFamily: "Arial, sans-serif" // Use a clean font
      }}
    >
      {/* Page title */}
      <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>
        🎭 Theatre Members
      </h1>

      {/* Member creation form */}
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column", // Stack inputs vertically
          gap: "1rem", // Space between inputs
          marginBottom: "2rem"
        }}
      >
        {/* Name input */}
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          style={{ padding: "0.5rem", fontSize: "1rem" }}
        />

        {/* Role input */}
        <input
          type="text"
          name="role"
          placeholder="Role"
          value={formData.role}
          onChange={handleChange}
          required
          style={{ padding: "0.5rem", fontSize: "1rem" }}
        />

        {/* Contact input */}
        <input
          type="email"
          name="contact"
          placeholder="Contact"
          value={formData.contact}
          onChange={handleChange}
          required
          style={{ padding: "0.5rem", fontSize: "1rem" }}
        />

        {/* Submit button */}
        <button
          type="submit"
          style={{
            padding: "0.75rem",
            backgroundColor: "#4CAF50", // Green background
            color: "white", // White text
            fontWeight: "bold",
            border: "none",
            cursor: "pointer"
          }}
        >
          ➕ Add Member
        </button>
      </form>

      {/* Render each member as a styled card */}
      {members.map(member => (
        <div
          key={member.id}
          style={{
            border: "1px solid #ccc", // Light border
            borderRadius: "8px", // Rounded corners
            padding: "1rem",
            marginBottom: "1rem",
            backgroundColor: "#f9f9f9" // Soft background
          }}
        >
          <h2 style={{ margin: "0 0 0.5rem 0" }}>{member.name}</h2>
          <p style={{ margin: "0.25rem 0" }}>
            <strong>Role:</strong> {member.role}
          </p>
          <p style={{ margin: "0.25rem 0" }}>
            <strong>Contact:</strong> {member.contact}
          </p>
        </div>
      ))}
    </div>
  );
}

export default MembersPage;
