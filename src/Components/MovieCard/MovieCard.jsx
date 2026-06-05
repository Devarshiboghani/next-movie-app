"use client";

import { useRouter } from "next/navigation";
import { FaEdit, FaTrash, FaInfoCircle } from "react-icons/fa";
import "./MovieCard.css";

const MovieCard = ({ movie, index, onDelete }) => {
  const router = useRouter();

  return (
    <div
      className="movie-card card-animate"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="poster-wrapper">
        <img
          src={movie.poster}
          alt={movie.title}
          className="poster-img"
          onError={(e) => {
            e.target.src = `https://placehold.co/300x450/16161f/555566?text=${encodeURIComponent(movie.title)}`;
          }}
        />
        <div className="poster-overlay">
          <div className="overlay-actions">
            <button
              className="btn-details"
              onClick={() => router.push(`/movie-details/${movie.id}`)}
            >
              <FaInfoCircle /> View Details
            </button>
            <div className="card-actions">
              <button
                className="edit-btn"
                title="Edit"
                onClick={() => router.push(`/edit-movie/${movie.id}`)}
              >
                <FaEdit />
              </button>
              <button
                className="delete-btn"
                title="Delete"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(movie.id);
                }}
              >
                <FaTrash />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="card-body-custom"
        onClick={() => router.push(`/movie-details/${movie.id}`)}
      >
        <div className="movie-title-card">{movie.title}</div>
        <div className="movie-year-dir">
          <span>{movie.year}</span> &nbsp;·&nbsp; {movie.director}
        </div>
        <div className="genre-tags">
          {movie.genre.slice(0, 3).map((g) => (
            <span key={g} className="genre-tag">
              {g}
            </span>
          ))}
        </div>
        <div className="card-footer-meta">
          <span className="duration-txt">🕐 {movie.duration}</span>
          <span className="rating-txt">⭐ {movie.rating}</span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
