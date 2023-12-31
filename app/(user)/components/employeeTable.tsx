"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const EmployeeTable = () => {
  const router = useRouter();
  const [employees, setEmployees] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Cookies.get("authToken") || "";

        const response = await fetch("http://localhost:8000/user/all", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          router.push("/login");
        }

        const data = await response.json();
        // Filter employees with role 'employee'
        const filteredEmployees = data.filter(
          (employee: any) =>
            employee.role !== "admin" && employee.role !== "manager"
        );
        setEmployees(filteredEmployees);
      } catch (err: any) {
        setEmployees([]);
      }
    };

    fetchData();
  }, [router]); // Empty dependency array means this effect runs once on mount

  const handleRoleChange = async (id: any, newRole: any) => {
    try {
      const token = Cookies.get("authToken") || "";

      const response = await fetch(
        `http://localhost:8000/user/update/${id}/UpdateUserDto`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ role: newRole }),
        }
      );

      if (!response.ok) {
        router.push("/login");
      }

      // Assuming you want to update the UI with the new role
      const updatedEmployees = employees.map((employee: any) => {
        if (employee.id === id) {
          return { ...employee, role: newRole };
        }
        return employee;
      });

      setEmployees(updatedEmployees);
    } catch (err: any) {}
  };

  return (
    <div>
      <table style={{ fontSize: "20px", borderSpacing: "10px" }}>
        <thead>
          <tr>
            <th style={{ padding: "10px" }}>User Name</th>
            <th style={{ padding: "10px" }}>Email</th>
            <th style={{ padding: "10px" }}>Role</th>
            <th style={{ padding: "10px" }}>Edit Role</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee: any) => (
            <tr key={employee.id}>
              <td style={{ padding: "10px" }}>{employee.name}</td>
              <td style={{ padding: "10px" }}>{employee.email}</td>
              <td style={{ padding: "10px" }}>{employee.role}</td>
              <td style={{ padding: "10px" }}>
                <select
                  value={employee.role}
                  onChange={(e) => {
                    handleRoleChange(employee.id, e.target.value);
                  }}
                  style={{ fontSize: "16px" }}
                >
                  <option value="saler" selected={employee.role === "saler"}>
                    Saler
                  </option>
                  <option
                    value="marketer"
                    selected={employee.role === "marketer"}
                  >
                    Marketer
                  </option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
