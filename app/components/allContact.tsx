"use client";
import { useRouter } from "@/node_modules/next/navigation";
import React, { useEffect, useState } from "react";

interface Contact {
  id: number;
  name: string;
  email: string;
  mobile: string;
  gender: string;
  address: string;
}

const AllContact = () => {
  const [data, setData] = useState<Contact[]>([]);
  const router = useRouter();
  const [editId, setEditId] = useState(-1);
  const [filteredData, setFilteredData] = useState<Contact[]>([]);
  const [uName, setuName] = useState("");
  const [uEmail, setuEmail] = useState("");
  const [uMobile, setuMobile] = useState("");
  const [uGender, setuGender] = useState("");
  const [uAddress, setuAddress] = useState("");

  const handleAdd = () => {
    router.push("/createContact");
  };

  const handleEdit = async (id: any) => {
    router.push(`/editContact/${id}`);
    //router.push("/editContact");
    // try {
    //   const res = await fetch("http://localhost:8000/contact/fineOne", {
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ id }),
    //   });

    //   if (res.ok) {
    //     setuName(res.data[0].name);
    //     setuEmail(res.data[0].email);
    //     setuMobile(res.data[0].mobile);
    //     setuGender(res.data[0].gender);
    //     setuAddress(res.data[0].address);
    //   } else {
    //     alert("Update failed");
    //     //console.error("Delete failed:", res.status);
    //   }
    // }

    //setEditId(id);
  };

  const handleDelete = async (id: any) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      try {
        const res = await fetch(`http://localhost:8000/contact/delete/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (res.ok) {
          alert("Contact deleted successfully!");
          const newData = data.filter((contact) => contact.id !== id);
          setData(newData);
          setFilteredData(newData);
        } else {
          alert("Delete failed");
          console.error("Delete failed:", res.status);
        }
      } catch (error) {
        console.error("Error during delete:", error);
      }
    }
  };

  const handleExport = async () => {
    try {
      const res = await fetch("http://localhost:8000/contact/export", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        alert("Data exported successfully!");
      } else {
        alert("Export failed");
        console.error("Export failed:", res.status);
      }
    } catch (error) {
      console.error("Error during export:", error);
      alert("Export error");
    }
  };

  const handleFilter = (e: any) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredResults = data.filter(
      (contact) =>
        contact.name.toLowerCase().includes(searchTerm) ||
        contact.gender.toLowerCase().includes(searchTerm) ||
        contact.address.toLowerCase().includes(searchTerm)
    );
    setFilteredData(filteredResults);
  };

  // const handleSelectChange = (e:any) => {
  //   setSelectedField(e.target.value);
  // };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:8000/contact/findall");
        if (res.ok) {
          const result = await res.json();
          setData(result);
          setFilteredData(result);
        } else {
          alert("Empty");
        }
      } catch (error) {
        alert("Error");
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Contact List</h1>
      <input type="text" onChange={handleFilter} placeholder="Search..." />
      <select
      //className="form-select"
      //value={selectedField}
      //onChange={handleSelectChange}
      >
        <option value="name">Name</option>
        <option value="gender">Gender</option>
        <option value="address">Address</option>
      </select>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Gender</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((contact) =>
            contact.id === editId ? (
              // eslint-disable-next-line react/jsx-key
              <tr>
                <td>
                  <input type="text" value={uName} />
                </td>
                <td>
                  <input type="text" value={uEmail} />
                </td>
                <td>
                  <input type="text" value={uMobile} />
                </td>
                <td>
                  <input type="text" value={uGender} />
                </td>
                <td>
                  <input type="text" value={uAddress} />
                </td>
                <td>
                  <button
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
                </td>
              </tr>
            ) : (
              <tr key={contact.id}>
                <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td>{contact.mobile}</td>
                <td>{contact.gender}</td>
                <td>{contact.address}</td>
                <td>
                  <button
                    onClick={() => handleEdit(contact.id)}
                    style={{
                      padding: "10px",
                      backgroundColor: "#333",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(contact.id)}
                    style={{
                      padding: "10px",
                      backgroundColor: "#dc3545",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
      <br />
      <button
        onClick={handleAdd}
        style={{
          padding: "10px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Add Contact
      </button>{" "}
      <button
        onClick={handleExport}
        style={{
          padding: "10px",
          backgroundColor: "#006400",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Export Data
      </button>
    </div>
  );
};

export default AllContact;
