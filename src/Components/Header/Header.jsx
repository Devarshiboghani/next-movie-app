"use client";

import { Button, Container, Form, Navbar } from "react-bootstrap";
import { FaSearch, FaPlus } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "./Header.css";

const Header = ({ search, setSearch, handleSearch }) => {
  const router = useRouter();

  return (
    <Navbar expand="lg" className="cinevault-navbar">
      <Container fluid>
        <Link href="/" className="navbar-brand brand-logo">
          <span className="cine">CINE</span>
          <span className="vault">VAULT</span>
        </Link>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" className="justify-content-end">
          <Form className="d-flex gap-2 align-items-center">
            <Form.Control
              type="search"
              placeholder="Search movies, directors..."
              aria-label="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSearch();
                }
              }}
              className="search-input"
            />
            <Button className="btn-search" onClick={handleSearch}>
              <FaSearch />
            </Button>
            <Button
              className="btn-add-movie"
              onClick={() => router.push("/add-movie")}
            >
              <FaPlus /> Add Movie
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
