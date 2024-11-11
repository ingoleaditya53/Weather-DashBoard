import React from "react";
import PropTypes from "prop-types";

function SearchEngine({ query, setQuery, search }) {
  // Handler function for Enter key press
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      search(e);
    }
  };

  return (
    <div className="SearchEngine">
      <input
        type="text"
        className="city-search"
        placeholder="Enter city name"
        name="query"
        aria-label="City search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={search} aria-label="Search button">
        <i className="fas fa-search" style={{ fontSize: "18px" }}></i>
      </button>
    </div>
  );
}

// Adding prop types for better validation
SearchEngine.propTypes = {
  query: PropTypes.string.isRequired,
  setQuery: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired,
};

export default SearchEngine;
