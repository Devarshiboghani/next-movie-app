"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getStorageData } from "@/utils/storageData";
import Header from "@/Components/Header/Header";
import "./movie-details.css";

export default function MovieDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [movie, setMovie] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const movies = getStorageData();
    const found = movies.find((m) => String(m.id) === String(id));
    setMovie(found || null);
  }, [id]);

  const handleSearch = () => router.push("/");

  if (!movie) {
    return (
      <div
        style={{
          background: "#0a0a12",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p style={{ color: "rgba(255,255,255,0.4)" }}>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <Header
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
      />

      <div className="details-page">
        <div className="details-backdrop-wrap">
          <img
            src={movie.backdrop || movie.poster}
            alt={movie.title}
            className="details-backdrop-img"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
          <div className="details-backdrop-fade" />
        </div>

        <div className="container details-content">
          <button className="btn-back" onClick={() => router.push("/")}>
            ← Back to Movies
          </button>

          {/* Header Section */}
          <div className="details-header">
            <img
              src={movie.poster}
              alt={movie.title}
              className="details-poster"
              onError={(e) => {
                e.target.src = `https://placehold.co/220x330/16161f/555566?text=${encodeURIComponent(movie.title)}`;
              }}
            />
            <div className="details-info">
              <h1 className="details-title">{movie.title}</h1>
              <p className="details-meta">
                {movie.year} &nbsp;·&nbsp; {movie.duration} &nbsp;·&nbsp;{" "}
                {movie.language}
              </p>
              <div className="details-rating">
                ⭐ {movie.rating}
                <span className="details-rating-label">/ 10 IMDb</span>
              </div>
              <div className="details-genres">
                {movie.genre.map((g) => (
                  <span key={g} className="details-genre-tag">
                    {g}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="details-actions">
                {movie.trailer && (
                  <a
                    href={movie.trailer}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-watch-trailer"
                  >
                    ▶ Watch Trailer
                  </a>
                )}
                <button
                  className="btn-edit-detail"
                  onClick={() => router.push(`/edit-movie/${movie.id}`)}
                >
                  ✏️ Edit
                </button>
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="details-grid">
            <div className="detail-card">
              <label>Director</label>
              <p>{movie.director}</p>
            </div>
            <div className="detail-card">
              <label>Language</label>
              <p>{movie.language}</p>
            </div>
            {movie.budget && (
              <div className="detail-card">
                <label>Budget</label>
                <p>{movie.budget}</p>
              </div>
            )}
            {movie.boxOffice && (
              <div className="detail-card">
                <label>Box Office</label>
                <p>{movie.boxOffice}</p>
              </div>
            )}
            {movie.awards && (
              <div className="detail-card detail-card--full">
                <label>Awards</label>
                <p>{movie.awards}</p>
              </div>
            )}
          </div>

          {/* Synopsis */}
          <section className="details-section">
            <h3 className="section-title">Synopsis</h3>
            <p className="details-text">{movie.fullDesc || movie.shortDesc}</p>
          </section>

          {/* Cast */}
          {movie.cast && movie.cast.length > 0 && (
            <section className="details-section">
              <h3 className="section-title">Cast</h3>
              <div className="cast-grid">
                {movie.cast.map((actor) => (
                  <div key={actor} className="cast-card">
                    <div className="cast-avatar">{actor.charAt(0)}</div>
                    <span className="cast-name">{actor}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
}
