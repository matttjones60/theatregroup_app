import { Routes, Route, Navigate, useLocation, NavLink } from 'react-router-dom';
import MembersPage from "./MembersPage";
import BookingsPage from './BookingsPage';
import { FaHome, FaUsers, FaCalendarAlt } from 'react-icons/fa';

function HomePage() {
  console.log("🎭 HomePage rendered");
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>🎭 Welcome to the Theatre Group App</h1>
      <p>Manage your members, bookings, and more.</p>
      <NavLink to="/members">
        <button style={{ marginTop: "1rem", padding: "0.75rem", fontSize: "1rem" }}>
          Go to Members
        </button>
      </NavLink>
      <NavLink to="/bookings">
        <button style={{ marginTop: "1rem", padding: "0.75rem", fontSize: "1rem" }}>
          Go to Bookings
        </button>
      </NavLink>
    </div>
  );
}

function App() {
  const location = useLocation();
  console.log("📍 Current path:", location.pathname);
  console.log("🧭 App component mounted");

  return (
    <>
      {/* Simple nav bar */}
        <nav style={{ padding: "1rem", backgroundColor: "#eee", display: "flex", gap: "1rem" }}>
          <NavLink to="/" style={{ marginRight: "1rem" }}>
            <span style={{ display: "flex", alignItems: "center" }}>
              <FaHome style={{ marginRight: "0.5rem" }} />
              Home
            </span>
          </NavLink>
          <NavLink to="/members" style={{ marginRight: "1rem" }}>Members</NavLink>
          <NavLink to="/bookings">Bookings</NavLink>
        </nav>

      {/* Route definitions */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/members" element={<MembersPage />} />
        <Route path="/bookings" element={<BookingsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
