import { useEffect, useState } from "react";
import axios from "axios";

function MembersPage() {
  const [member, setMember] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8000/members/")
      .then(res => {
        console.log("Fetched members:", res.data);  // 👈 Add this
        if (res.data.length > 0) {
          setMember(res.data[0]);  // Show just the first member
        }
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>Theatre Members</h1>
      {member ? (
        <div>
          <h2>{member.name}</h2>
          <p>Role: {member.role}</p>
          <p>Contact: {member.contact}</p>
        </div>
      ) : (
        <p>No members found.</p>
      )}
    </div>
  );
}

export default MembersPage;
