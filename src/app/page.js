"use client";

import { useEffect, useState } from "react";
import movieData from "@/data/movies";
import { getStorageData, setStorageData } from "@/utils/storageData";
import { ALL_GENRES } from "@/utils/constants";
import Header from "@/Components/Header/Header";
import FilterBar from "@/Components/FilterBar/FilterBar";
import MovieCard from "@/Components/MovieCard/MovieCard";
import MovieDetailModal from "@/Components/MovieDetailModal/MovieDetailModal";
import "./globals.css";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("All");
  const [sort, setSort] = useState("rating");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 4;

  // Load movies from session or default data
  useEffect(() => {
    const stored = getStorageData();
    if (stored.length > 0) {
      setMovies(stored);
    } else {
      setMovies(movieData);
      setStorageData(movieData);
    }
  }, []);

  // Filter & sort
  useEffect(() => {
    let result = [...movies];
    if (genre !== "All") {
      result = result.filter((m) => m.genre.includes(genre));
    }
    switch (sort) {
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "year-new":
        result.sort((a, b) => b.year - a.year);
        break;
      case "year-old":
        result.sort((a, b) => a.year - b.year);
        break;
      case "title":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }
    setFilteredMovies(result);
    setCurrentPage(1);
  }, [movies, genre, sort]);

  const handleSearch = () => {
    const q = search.toLowerCase().trim();
    if (!q) {
      setFilteredMovies(movies);
      return;
    }
    const result = movies.filter(
      (m) =>
        m.title.toLowerCase().includes(q) ||
        m.director.toLowerCase().includes(q) ||
        m.genre.some((g) => g.toLowerCase().includes(q)),
    );
    setFilteredMovies(result);
    setSearch("");
    setCurrentPage(1);
  };

  const handleDelete = (id) => {
    const updated = movies.filter((m) => m.id !== id);
    setMovies(updated);
    setStorageData(updated);
  };

  // Pagination
  const indexOfLast = currentPage * moviesPerPage;
  const indexOfFirst = indexOfLast - moviesPerPage;
  const currentMovies = filteredMovies.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);

  return (
    <>
      <Header
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
      />

      <FilterBar
        movies={movies}
        genre={genre}
        setGenre={setGenre}
        sort={sort}
        setSort={setSort}
        ALL_GENRES={ALL_GENRES}
      />

      <MovieDetailModal
        movie={selectedMovie}
        show={showDetailModal}
        onClose={() => setShowDetailModal(false)}
      />

      <div className="container mt-5 pb-4">
        {filteredMovies.length === 0 ? (
          <div className="no-results">
            <p>🎬 No movies found. Try a different filter or search.</p>
          </div>
        ) : (
          <div className="row g-4">
            {currentMovies.map((movie, index) => (
              <div className="col-lg-3 col-md-6 col-sm-6 col-12" key={movie.id}>
                <MovieCard
                  movie={movie}
                  index={index}
                  onDelete={handleDelete}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredMovies.length > 0 && (
        <div className="pagination-wrapper">
          <button
            onClick={() => setCurrentPage((p) => p - 1)}
            disabled={currentPage === 1}
            className="page-btn"
          >
            ← Prev
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`page-btn${currentPage === i + 1 ? " active-page" : ""}`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((p) => p + 1)}
            disabled={currentPage === totalPages}
            className="page-btn"
          >
            Next →
          </button>
        </div>
      )}
    </>
  );
}
