import React, { useState } from "react";

const SearchBar = ({ onSearch }: any) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (e: any) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <select className="custom-select">
          <option value="name">Search by Name</option>
          <option value="email">Search by Email</option>
        </select>
      </div>
      <input
        type="text"
        className="form-control"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleChange}
      />
      <div className="input-group-append">
        <button onClick={onSearch} className="btn btn-outline-secondary">
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
