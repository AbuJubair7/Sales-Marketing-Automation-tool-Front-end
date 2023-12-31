import React from "react";
import EmployeeTable from "../components/employeeTable";
import AllContact from "@/app/components/allContact";
import LogoutButton from "@/app/components/logoutBtn";

const AdminPage: React.FC = () => {
  return (
    <div>
      <h1>Admin Page</h1>
      <EmployeeTable />
      <AllContact />
      <LogoutButton />
    </div>
  );
};

export default AdminPage;
