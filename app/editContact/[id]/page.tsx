"use client";
import { useRouter, useParams } from "@/node_modules/next/navigation";
import React, { useState, useEffect } from "react";
import LogoutButton from "../../components/logoutBtn";
import Navbar from "../../components/navbar";

// interface EditContactProps {
//   id: number;
// }

const EditContact = () => {
  const router = useRouter();
  //const { id } = router.query;
  const param = useParams();

  const [contact, setContact] = useState({
    id: param.id,
    name: "",
    email: "",
    mobile: "",
    gender: "",
    address: "",
  });

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/contact/findOne/${contact.id}`);
          if (response.ok) {
            const contactData = await response.json();
            setContact(contactData);
          } else {
            console.error("Error fetching contact data:", response.status);
          }
      } catch (error) {
        console.error("Error fetching contact data", error);
      }
    };
    fetchContactData();
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setContact((prevContact) => ({
      ...prevContact,
      [name]: value,
    }));
  };

  const handleUpdate = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8000/contact/update/${contact.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(contact),
        }
      );

      if (response.ok) {
        alert("Contact updated successfully!");
        router.push("/viewContact");
      } else {
        alert("Updating failed");
      }
    } catch (error) {
      alert("Error updating contact");
    }
  };

  return (
    <div>
      <Navbar />
      <div style={{ textAlign: "Right" }}>
        <LogoutButton />
      </div>
      <h1>Edit Contact</h1>
      <form onSubmit={handleUpdate}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            value={contact.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            name="email"
            value={contact.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="mobile">Mobile:</label>
          <input
            type="text"
            name="mobile"
            value={contact.mobile}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="gender">Gender:</label>
          <input
            type="text"
            name="gender"
            value={contact.gender}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            name="address"
            value={contact.address}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          style={{
            padding: "10px",
            backgroundColor: "#006400",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default EditContact;
