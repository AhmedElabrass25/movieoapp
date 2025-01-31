import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import Loading from "./Loading";
import MovieCard from "./MovieCard";

const API_KEY = "79fe13f4b684cf9436c166038c57f4a4";

const SearchPage = () => {
  let [query] = useSearchParams();
  let parameter = query.get("q");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);

  // >>>>>>>>
  // Fetch Data Function
  // >>>>>>>>
  const fetchData = async () => {
    if (!parameter) return;
    try {
      setLoading(true);
      let { data } = await axios.get(
        `https://api.themoviedb.org/3/search/movie`,
        {
          params: {
            api_key: API_KEY,
            query: parameter,
            page: page,
          },
        }
      );

      setData((prev) => {
        const existingIds = new Set(prev.map((movie) => movie.id));
        const newUniqueResults = data?.results?.filter(
          (movie) => !existingIds.has(movie.id)
        );
        return [...prev, ...newUniqueResults];
      });
    } catch (error) {
      setError(error?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  // >>>>>>>>
  // Handle Scroll with Debounce
  // >>>>>>>>
  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + window.scrollY >=
      document.documentElement.offsetHeight - 100
    ) {
      setPage((prev) => prev + 1);
    }
  }, []);

  useEffect(() => {
    setPage(1);
    setData([]);
    fetchData();
  }, [parameter]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    fetchData();
  }, [page]);

  return (
    <section className="pt-20">
      <div className="container">
        <h1 className="mb-5 text-white font-bold text-3xl capitalize">
          Search Results
        </h1>
        {loading && <Loading />}
        {error && (
          <div
            className="p-4 mb-2 w-full text-center text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {error}
          </div>
        )}
        <div className="row">
          {data?.length > 0 &&
            data.map((movie) => (
              <div
                className="w-full sm:w-[42%] md:w-[32%] lg:w-[22%]"
                key={movie.id}
              >
                <MovieCard movie={movie} mediaType="movie" />
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default SearchPage;
