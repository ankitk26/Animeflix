import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

function Header() {
  const [search, setSearch] = useState("");
  const history = useHistory();

  // Redirect to results page
  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/search/${search}`);
    setSearch("");
  };

  return (
    <nav>
      {/* Logo */}
      <Link to="/">
        <h1>
          <span>A</span>NIMEFLI<span>X</span>
        </h1>
      </Link>

      <div>
        <div className="nav_links">
          {/* Upcoming anime */}
          <Link to="/upcoming" className="upcoming_anime">
            <span>Upcoming Anime</span>
          </Link>

          {/* Airing anime */}
          <Link to="/airing" className="upcoming_anime">
            <span>Airing Anime</span>
          </Link>
        </div>

        {/* Search anime */}
        <form onSubmit={handleSubmit}>
          <label htmlFor="search" className="nav_search">
            <i className="fas fa-search" style={{ color: "#666" }}></i>
            <input
              type="text"
              id="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Anime TV or Movie"
            />
          </label>
        </form>
      </div>
    </nav>
  );
}

export default Header;
