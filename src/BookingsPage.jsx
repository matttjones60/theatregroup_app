import { useState, useEffect } from "react";
import axios from "axios";

function BookingsPage() {
  console.log("📅 BookingsPage rendered");

  const [members, setMembers] = useState([]);

    useEffect(() => {
    axios.get("http://localhost:8000/members/")
        .then(res => setMembers(res.data))
        .catch(err => console.error(err));
    }, []);

  const [bookings, setBookings] = useState([]);
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    description: "",
    member_id: ""
  });

  useEffect(() => {
    axios.get("http://localhost:8000/bookings/")
      .then(res => setBookings(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8000/bookings/", formData)
      .then(res => {
        setBookings(prev => [...prev, res.data]);
        setFormData({ date: "", time: "", description: "", member_id: "" });
      })
      .catch(err => console.error(err));
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
      <h1>📅 Theatre Bookings</h1>

      <select name="member_id" value={formData.member_id} onChange={handleChange} required>
        <option value="">Select Member</option>
        {members.map(member => (
            <option key={member.id} value={member.id}>
            {member.name}
            </option>
        ))}
      </select>


      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2rem" }}>
        <input type="date" name="date" value={formData.date} onChange={handleChange} required />
        <input type="time" name="time" value={formData.time} onChange={handleChange} required />
        <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
        <button type="submit">➕ Add Booking</button>
      </form>

      {bookings.map(booking => {
        const member = booking.member;
        const classGroup = member?.class_group;

        return (
          <div key={booking.id} style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem" }}>
            <h2>{booking.description}</h2>
            <p><strong>Date:</strong> {booking.date}</p>
            <p><strong>Time:</strong> {booking.time}</p>
            <p><strong>Member:</strong> {member?.name || "Unknown"}</p>
            {classGroup && (
              <>
                <p><strong>Class:</strong> {classGroup.name}</p>
                <p><strong>Schedule:</strong> {classGroup.day} at {classGroup.time}</p>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default BookingsPage;
