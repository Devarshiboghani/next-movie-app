"use client";

import "./FilterBar.css";

const FilterBar = ({ movies, genre, setGenre, sort, setSort, ALL_GENRES }) => {
  return (
    <>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-bg-pattern" />
        <div className="container hero-content">
          <p className="hero-subtitle">Welcome to</p>
          <h1 className="hero-title">
            CINE<span className="highlight">VAULT</span>
          </h1>
          <p className="hero-tagline">
            Your ultimate destination for movies &amp; cinema
          </p>
          <div className="hero-stats">
            <span className="stats-pill">🎬 {movies.length} Movies</span>
            <span className="stats-pill">🌍 5 Languages</span>
            <span className="stats-pill">⭐ Top Rated Collection</span>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <div className="filter-bar">
        <div className="container">
          <div className="filter-inner">
            <div className="genre-filters">
              {ALL_GENRES.map((g) => (
                <button
                  key={g}
                  className={`filter-btn${genre === g ? " active" : ""}`}
                  onClick={() => setGenre(g)}
                >
                  {g}
                </button>
              ))}
            </div>
            <select
              className="sort-select"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="rating">Sort: Rating</option>
              <option value="year-new">Sort: Newest</option>
              <option value="year-old">Sort: Oldest</option>
              <option value="title">Sort: A–Z</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterBar;
