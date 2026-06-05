"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import "./MovieDetailModal.css";

export default function MovieDetailModal({ movie, show, onClose }) {
  const router = useRouter();

  useEffect(() => {
    if (!show) return;
    document.body.style.overflow = "hidden";
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [show, onClose]);

  if (!show || !movie) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Backdrop */}
        <div className="modal-backdrop-wrap">
          <img
            src={movie.backdrop || movie.poster}
            alt={movie.title}
            className="modal-backdrop-img"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
          <div className="modal-backdrop-fade" />
        </div>

        {/* Close Button */}
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>

        {/* Body */}
        <div className="modal-body">
          <div className="modal-header-info">
            <img
              src={movie.poster}
              alt={movie.title}
              className="modal-poster-img"
              onError={(e) => {
                e.target.src = `https://placehold.co/120x180/16161f/555566?text=${encodeURIComponent(movie.title)}`;
              }}
            />
            <div className="modal-title-block">
              <h2 className="modal-title">{movie.title}</h2>
              <p className="modal-meta-line">
                {movie.year} &nbsp;·&nbsp; {movie.duration} &nbsp;·&nbsp;{" "}
                {movie.language}
              </p>
              <div className="rating-big">
                ⭐ {movie.rating}
                <span className="imdb-label">/ 10 IMDb</span>
              </div>
              <div className="modal-genres">
                {movie.genre.map((g) => (
                  <span key={g} className="modal-genre-tag">
                    {g}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <hr className="divider" />

          <div className="info-grid">
            <div className="info-block">
              <label>Director</label>
              <p>{movie.director}</p>
            </div>
            <div className="info-block">
              <label>Language</label>
              <p>{movie.language}</p>
            </div>
          </div>

          <hr className="divider" />

          <span className="section-lbl">Short Description</span>
          <p className="short-story">{movie.shortDesc}</p>

          <span className="section-lbl">Full Description</span>
          <p className="full-story">{movie.fullDesc}</p>

          <span className="section-lbl">Cast</span>
          <div className="cast-pills">
            {movie.cast.map((actor) => (
              <span key={actor} className="cast-pill">
                {actor}
              </span>
            ))}
          </div>

          <div className="modal-actions">
            <a
              href={movie.trailer}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-trailer-link"
            >
              ▶ Watch Trailer
            </a>
            <button
              className="btn-full-details"
              onClick={() => {
                onClose();
                router.push(`/movie-details/${movie.id}`);
              }}
            >
              Full Page →
            </button>
            <button className="btn-wl-modal" onClick={onClose}>
              ✕ Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
