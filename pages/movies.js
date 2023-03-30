import { useState } from "react";
import useSWR from "swr";

const fetcher = async (url) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Movies not found.!");
  return res.json();
};

const Movies = () => {
  const [movie, setMovie] = useState("");
  const [rating, setRating] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const movieObj = {
      id: Date.now(),
      movieName: movie,
      rating,
    };

    console.log(movieObj);

    const res = await fetch("/api/movies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movieObj),
    });
    const json = res.json();
  };

  const { data, error, isValidating } = useSWR("/api/movies", fetcher);

  const isLoading = !data && !error && isValidating;

  if (isLoading) return <h2>loading...</h2>;
  if (error) return <h2>{error.message}</h2>;

  return (
    <div>
      <h2>List of Movies</h2>
      <h2>Submit New Movie</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="write a movie name"
          value={movie}
          onChange={(e) => setMovie(e.target.value)}
        />
        <input
          type="text"
          placeholder="write rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
        <button type="submit">Add Movie</button>
      </form>
      {data?.map((movie) => (
        <div key={movie.id}>
          <h3>
            Name : {movie.movieName} and Rating : {movie.rating}
          </h3>
        </div>
      ))}
    </div>
  );
};

export default Movies;
