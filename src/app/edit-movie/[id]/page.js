"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "@/Components/Header/Header";
import MovieForm from "@/Components/MovieForm/MovieForm";
import { getStorageData, setStorageData } from "@/utils/storageData";

export default function EditMoviePage() {
  const { id } = useParams();
  const router = useRouter();
  const [movie, setMovie] = useState(null);
  const [search, setSearch] = useState("");
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const movies = getStorageData();
    const found = movies.find((m) => String(m.id) === String(id));
    if (found) {
      setMovie(found);
    } else {
      setNotFound(true);
    }
  }, [id]);

  const handleSearch = () => {
    router.push("/");
  };

  const handleSubmit = (formData) => {
    const movies = getStorageData();
    const updated = movies.map((m) =>
      String(m.id) === String(id) ? { ...formData, id: m.id } : m,
    );
    setStorageData(updated);
    router.push(`/movie-details/${id}`);
  };

  if (notFound) {
    return (
      <div className="notFoundContainer">
        <h2 className="notFoundTitle">Movie Not Found</h2>
        <p>
          The movie you are trying to edit doesn't exist or has been removed.
        </p>
        <button onClick={() => router.push("/")} className="backButton">
          ← Back to Home
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="container">
        <Header
          search={search}
          setSearch={setSearch}
          handleSearch={handleSearch}
        />
        <div className="pageContent">
          <h2 className="pageTitle">Edit Movie</h2>
          <MovieForm
            initialData={movie}
            onSubmit={handleSubmit}
            isEdit={true}
          />
        </div>
      </div>
    </>
  );
}
