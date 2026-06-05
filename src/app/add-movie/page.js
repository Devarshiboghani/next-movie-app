"use client";

import { useRouter } from "next/navigation";
import Header from "@/Components/Header/Header";
import MovieForm from "@/Components/MovieForm/MovieForm";
import { getStorageData, setStorageData } from "@/utils/storageData";
import { useState } from "react";

export default function AddMoviePage() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    router.push(`/?search=${search}`);
  };

  const handleSubmit = (formData) => {
    const movies = getStorageData();
    const newMovie = {
      ...formData,
      id: Date.now(),
    };
    const updated = [...movies, newMovie];
    setStorageData(updated);
    router.push("/");
  };

  return (
    <>
      <div className="container">
        <Header
          search={search}
          setSearch={setSearch}
          handleSearch={handleSearch}
        />
        <div className="pageContent">
          <h2 className="pageTitle">Add New Movie</h2>
          <MovieForm onSubmit={handleSubmit} isEdit={false} />
        </div>
      </div>
    </>
  );
}
