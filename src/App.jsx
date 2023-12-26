import { React, useEffect, useState } from "react";
import "./App.css";
import MovieCard from "./MovieCard.jsx";
import OMDB_API_KEY from "./api_key";
import SearchIcon from "./search.svg";

const API_URL = "http://www.omdbapi.com/?apikey=" + OMDB_API_KEY;

// const movieObject = {
//   Title: "Harry Potter and the Deathly Hallows: Part 2",
//   Year: "2011",
//   imdbID: "tt1201607",
//   Type: "movie",
//   Poster:
//     "https://m.media-amazon.com/images/M/MV5BMGVmMWNiMDktYjQ0Mi00MWIxLTk0N2UtN2ZlYTdkN2IzNDNlXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg",
// };


const App = () => {
  const [movieObjects, setMovieObjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovieObjects(data.Search);
  };

  useEffect(() => {
    searchMovies(searchTerm);
  }, []);

  return (
    <div className="app">
      <h1>MovieLand</h1>

      <div className="search">
        <input
          placeholder="Search for movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && searchMovies(searchTerm)}
        />
        <img
          src={SearchIcon}
          alt="Search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {movieObjects?.length > 0 ? (
        <div className="container">
          {movieObjects.map((movieObj) => (
            <MovieCard key={movieObj.imdbID} movieObject={movieObj} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found...</h2>
        </div>
      )}
    </div>
  );
};

export default App;
