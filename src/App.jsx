import { React, useEffect, useState } from "react";
import { RadioButton, RadioGroup } from "react-radio-buttons";
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
  const [searchTerm, setSearchTerm] = useState("Superman");
  const [searchType, setSearchType] = useState(""); // movie, series or episode

  const searchMovies = async (title, type) => {
    if (type === "all") {
      type = "";
    }
    const response = await fetch(`${API_URL}&s=${title}&type=${type}`);
    const data = await response.json();
    console.log(data);
    setMovieObjects(data.Search);
  };

  const search = () => searchMovies(searchTerm, searchType);

  useEffect(() => {
    search();
  }, [searchType]);

  console.log(searchType);

  return (
    <div className="app">
      <h1>MovieLand</h1>

      <div className="search">
        <input
          placeholder="Search for movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && search()}
        />
        <img src={SearchIcon} alt="Search" onClick={() => search()} />
      </div>

      <RadioGroup
        className="radio-buttons-group"
        horizontal
        // padding={10}
        onChange={setSearchType}
        value=""
      >
        <RadioButton value="all" rootColor="#a1a1a1" pointColor="#f9d3b4">
          All
        </RadioButton>
        <RadioButton value="movie" rootColor="#a1a1a1" pointColor="#f9d3b4">
          Movie
        </RadioButton>
        <RadioButton value="series" rootColor="#a1a1a1" pointColor="#f9d3b4">
          Series
        </RadioButton>
        <RadioButton value="episode" rootColor="#a1a1a1" pointColor="#f9d3b4">
          Episode
        </RadioButton>
      </RadioGroup>

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
