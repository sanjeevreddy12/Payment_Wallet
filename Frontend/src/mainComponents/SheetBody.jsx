import { useState } from "react";
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

export default function SheetBody() {
  const [username, setUsername] = useState("");
  const [firstname, setFirst] = useState("");
  const [lastname, setLast] = useState("");
  const [number, setNumber] = useState("");
  const navigate = useNavigate();

  async function updateData(e) {
    e.preventDefault();
    
    try {
      let updateData = {} ;
      if (firstname != "") {
        updateData.firstname = firstname;
      }
      if (lastname != "") {
        updateData.lastname = lastname;
      }
      if (username != "") {
        updateData.username = username;
      }

      if(number != '') {updateData.number = number}

      if (Object.keys(updateData).length > 0) {
        const jwt = localStorage.getItem("token") || "";
        const response = await axios.post(
          "http://localhost:3000/user/update",
          { updateData },
          {
            headers: { Authorization: `Bearer ${jwt}` },
          }
        );
        alert(response.data.msg);
        console.log(response.data.error)
        
      } else {
        alert("No fields to be updated.");
      }
    } catch (err) {
      console.log(err);
    }
  }

  function logOut() {
    localStorage.removeItem("token");
    navigate("/signIn", { replace: true });
  }

  return (
    <>
      <h3 className="mt-4 mb-2">Edit Profile</h3>
      <form>
        <label className="signup-label">Firstname</label>
        <br />
        <input type="text" className="signup-input" onChange={(e) => setFirst(e.target.value)}/>
        <br />
        <label className="signup-label">Lastname</label>
        <br />
        <input type="text" className="signup-input" onChange={(e) => setLast(e.target.value)}/>
        <br />
        <label className="signup-label">Username</label>
        <br />
        <input type="text" className="signup-input" onChange={(e) => setUsername(e.target.value)}/>
        <br />
        <label className="signup-label">Phone Number</label>
        <br />
        <input
          type="tel"
          pattern="[0-9]{10}"
          maxLength="10"
          className="signup-input"
          onChange={(e) => setNumber(e.target.value)}
        />
        <br />
        <button
          type="submit"
          className="w-full bg-black rounded-md text-white py-1 mt-2"
          onClick={updateData}
        >
          Save Changes
        </button>
      </form>
      <button
        className=" bg-black rounded-md text-white py-1 px-4 mt-2 absolute bottom-6 right-6"
        onClick={logOut}
      >
        Log Out
      </button>
    </>
  );
}
