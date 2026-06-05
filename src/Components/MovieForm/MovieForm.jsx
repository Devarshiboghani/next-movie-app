"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Form, Row, Col, Badge, Button } from "react-bootstrap";
import { GENRES_LIST, LANGUAGES } from "@/utils/constants";
import "./MovieForm.css";

const EMPTY_FORM = {
  title: "",
  year: "",
  rating: "",
  duration: "",
  director: "",
  language: "English",
  budget: "",
  boxOffice: "",
  awards: "",
  poster: "",
  backdrop: "",
  trailer: "",
  shortDesc: "",
  fullDesc: "",
  genre: [],
  cast: "",
};

const MovieForm = ({ initialData, onSubmit, isEdit = false }) => {
  const router = useRouter();
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setForm({
        ...EMPTY_FORM,
        ...initialData,
        cast: Array.isArray(initialData.cast)
          ? initialData.cast.join(", ")
          : initialData.cast || "",
        genre: Array.isArray(initialData.genre) ? initialData.genre : [],
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const toggleGenre = (g) => {
    setForm((prev) => ({
      ...prev,
      genre: prev.genre.includes(g)
        ? prev.genre.filter((x) => x !== g)
        : [...prev.genre, g],
    }));
    if (errors.genre) setErrors((prev) => ({ ...prev, genre: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = "Title is required";
    if (
      !form.rating ||
      isNaN(form.rating) ||
      form.rating < 0 ||
      form.rating > 10
    )
      e.rating = "Rating must be between 0 and 10";
    if (!form.director.trim()) e.director = "Director name is required";
    if (!form.shortDesc.trim()) e.shortDesc = "Short description is required";
    if (form.genre.length === 0) e.genre = "Select at least one genre";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    const movieData = {
      ...form,
      year: Number(form.year),
      rating: parseFloat(form.rating),
      cast:
        typeof form.cast === "string"
          ? form.cast
              .split(",")
              .map((c) => c.trim())
              .filter(Boolean)
          : form.cast,
    };

    onSubmit(movieData);
  };

  return (
    <div className="movie-form-page">
      <div className="container">
        <div className="form-card">
          <div className="form-card-header">
            <h2>{isEdit ? "✏️ Edit Movie" : "🎬 Add New Movie"}</h2>
            <p>
              {isEdit
                ? "Update movie details below"
                : "Fill in the details to add a new movie"}
            </p>
          </div>

          <Form onSubmit={handleSubmit} noValidate>
            {/* Title + Year */}
            <Row className="mb-3">
              <Col md={8}>
                <Form.Label className="field-label">Movie Title *</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Enter movie name"
                  className={`custom-input${errors.title ? " is-invalid" : ""}`}
                />
                {errors.title && (
                  <div className="invalid-feedback">{errors.title}</div>
                )}
              </Col>
              <Col md={4}>
                <Form.Label className="field-label">Year</Form.Label>
                <Form.Control
                  name="year"
                  type="number"
                  value={form.year}
                  onChange={handleChange}
                  placeholder="2024"
                  className="custom-input"
                />
              </Col>
            </Row>

            {/* Rating + Duration + Language */}
            <Row className="mb-3">
              <Col md={4}>
                <Form.Label className="field-label">Rating (0–10) *</Form.Label>
                <Form.Control
                  name="rating"
                  type="number"
                  step="0.1"
                  value={form.rating}
                  onChange={handleChange}
                  min="0"
                  max="10"
                  className={`custom-input${errors.rating ? " is-invalid" : ""}`}
                />
                {errors.rating && (
                  <div className="invalid-feedback">{errors.rating}</div>
                )}
              </Col>
              <Col md={4}>
                <Form.Label className="field-label">Duration</Form.Label>
                <Form.Control
                  name="duration"
                  value={form.duration}
                  onChange={handleChange}
                  placeholder="148 min"
                  className="custom-input"
                />
              </Col>
              <Col md={4}>
                <Form.Label className="field-label">Language</Form.Label>
                <Form.Select
                  name="language"
                  value={form.language}
                  onChange={handleChange}
                  className="custom-input"
                >
                  {LANGUAGES.map((l) => (
                    <option key={l}>{l}</option>
                  ))}
                </Form.Select>
              </Col>
            </Row>

            {/* Director + Cast */}
            <Row className="mb-3">
              <Col md={6}>
                <Form.Label className="field-label">Director *</Form.Label>
                <Form.Control
                  name="director"
                  value={form.director}
                  onChange={handleChange}
                  placeholder="Director name"
                  className={`custom-input${errors.director ? " is-invalid" : ""}`}
                />
                {errors.director && (
                  <div className="invalid-feedback">{errors.director}</div>
                )}
              </Col>
              <Col md={6}>
                <Form.Label className="field-label">Cast</Form.Label>
                <Form.Control
                  name="cast"
                  value={form.cast}
                  placeholder="Actor1, Actor2, Actor3"
                  onChange={handleChange}
                  className="custom-input"
                />
              </Col>
            </Row>

            {/* Budget + Box Office */}
            <Row className="mb-3">
              <Col md={6}>
                <Form.Label className="field-label">Budget</Form.Label>
                <Form.Control
                  name="budget"
                  value={form.budget}
                  onChange={handleChange}
                  placeholder="$100 million"
                  className="custom-input"
                />
              </Col>
              <Col md={6}>
                <Form.Label className="field-label">Box Office</Form.Label>
                <Form.Control
                  name="boxOffice"
                  value={form.boxOffice}
                  onChange={handleChange}
                  placeholder="$500 million"
                  className="custom-input"
                />
              </Col>
            </Row>

            {/* Awards */}
            <div className="mb-3">
              <Form.Label className="field-label">Awards</Form.Label>
              <Form.Control
                name="awards"
                value={form.awards}
                onChange={handleChange}
                placeholder="4 Academy Awards"
                className="custom-input"
              />
            </div>

            {/* Genres */}
            <div className="mb-3">
              <Form.Label className="field-label">
                Genres *{" "}
                {errors.genre && (
                  <span className="text-danger" style={{ fontSize: "0.78rem" }}>
                    — {errors.genre}
                  </span>
                )}
              </Form.Label>
              <div className="genre-picker">
                {GENRES_LIST.map((g) => (
                  <button
                    type="button"
                    key={g}
                    className={`genre-chip-btn${form.genre.includes(g) ? " active" : ""}`}
                    onClick={() => toggleGenre(g)}
                  >
                    {form.genre.includes(g) ? "✓ " : ""}
                    {g}
                  </button>
                ))}
              </div>
              <div className="selected-genres mt-2">
                {form.genre.map((g) => (
                  <Badge key={g} className="selected-badge me-1">
                    {g}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Poster + Backdrop */}
            <Row className="mb-3">
              <Col md={6}>
                <Form.Label className="field-label">Poster URL</Form.Label>
                <Form.Control
                  name="poster"
                  value={form.poster}
                  onChange={handleChange}
                  placeholder="https://image.tmdb.org/..."
                  className="custom-input"
                />
              </Col>
              <Col md={6}>
                <Form.Label className="field-label">Backdrop URL</Form.Label>
                <Form.Control
                  name="backdrop"
                  value={form.backdrop}
                  onChange={handleChange}
                  placeholder="https://image.tmdb.org/..."
                  className="custom-input"
                />
              </Col>
            </Row>

            {/* Poster Preview */}
            {form.poster && (
              <div className="mb-3 poster-preview-wrap">
                <Form.Label className="field-label">Poster Preview</Form.Label>
                <img
                  src={form.poster}
                  alt="preview"
                  className="poster-preview-img"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              </div>
            )}

            {/* Trailer */}
            <div className="mb-3">
              <Form.Label className="field-label">
                YouTube Trailer URL
              </Form.Label>
              <Form.Control
                name="trailer"
                value={form.trailer}
                onChange={handleChange}
                placeholder="https://www.youtube.com/watch?v=..."
                className="custom-input"
              />
            </div>

            {/* Short Desc */}
            <div className="mb-3">
              <Form.Label className="field-label">
                Short Description *
              </Form.Label>
              <Form.Control
                name="shortDesc"
                value={form.shortDesc}
                onChange={handleChange}
                placeholder="One line summary..."
                className={`custom-input${errors.shortDesc ? " is-invalid" : ""}`}
              />
              {errors.shortDesc && (
                <div className="invalid-feedback">{errors.shortDesc}</div>
              )}
            </div>

            <div className="mb-4">
              <Form.Label className="field-label">Full Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="fullDesc"
                value={form.fullDesc}
                onChange={handleChange}
                placeholder="Detailed synopsis..."
                className="custom-input"
              />
            </div>

            {/* Buttons */}
            <div className="d-flex gap-3 justify-content-end">
              <Button
                type="button"
                variant="secondary"
                onClick={() => router.push('/')}
                className="btn-cancel-custom"
              >
                Cancel
              </Button>
              <Button type="submit" className="btn-add-custom">
                {isEdit ? "Update Movie" : "Add Movie"}
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default MovieForm;
