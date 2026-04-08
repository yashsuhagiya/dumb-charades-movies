import moviesData from "../../data/movies.json";
import type { Movie } from "@/lib/types";
import { MovieBrowser } from "@/components/MovieBrowser";

const movies = moviesData as Movie[];

export default function Home() {
  return <MovieBrowser movies={movies} />;
}
