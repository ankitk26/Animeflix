import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

function Header() {
  const [search, setSearch] = useState("");
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/search/${search}`);
    setSearch("");
  };

  return (
    <nav>
      <div>
        <Link to="/">
          <h1>
            <span>A</span>NIMEFLI<span>X</span>
          </h1>
        </Link>
      </div>
      <div>
        <div>
          <Link to="/upcoming">
            <div className="upcoming_heading">Upcoming Animes</div>
          </Link>
        </div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="search"></label>
          <input
            type="text"
            id="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Anime TV or Movie"
          />
          <button className="search_btn">
            <i className="fas fa-search fa-2x" style={{ color: "#ddd" }}></i>
          </button>
        </form>
      </div>
    </nav>
  );
}

export default Header;
