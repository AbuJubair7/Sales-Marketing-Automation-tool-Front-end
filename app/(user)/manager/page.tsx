import React from "react";
import EmployeeTable from "../components/employeeTable";

const Page = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return (
    <div>
      <EmployeeTable />
    </div>
  );
};

export default Page;
