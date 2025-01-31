import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieCard from "./MovieCard";
import Loading from "./Loading";

const ExplorePage = () => {
  const [pageNum, setPageNum] = useState(1);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  let { explore } = useParams();
  // >>>>>>>>
  // fetchData Function
  // >>>>>>>>
  async function fetchData() {
    try {
      setLoading(true);
      let { data } = await axios(`discover/${explore}`, {
        params: {
          page: pageNum,
        },
      });

      setData((prev) => {
        // VIP
        // Get existing IDs to check against
        const existingIds = new Set(prev.map((movie) => movie.id));
        // Filter out duplicates from new results
        const newUniqueResults = data?.results.filter(
          (movie) => !existingIds.has(movie.id)
        );
        return [...prev, ...newUniqueResults];
      });
      setTotalPages(data?.total_pages);
    } catch (error) {
      setError(error?.message);
      console.log("Error.......", error?.message);
    } finally {
      setLoading(false);
    }
  }
  // >>>>>>>>
  // handleScroll Function
  // >>>>>>>>
  function handleScroll() {
    if (
      window.innerHeight + window.scrollY >=
        document.documentElement.offsetHeight - 100 &&
      pageNum < totalPages &&
      !loading
    ) {
      setPageNum((prev) => prev + 1);
    }
  }
  //>>>>>>>>>>>>> (useEffcet) cases
  useEffect(() => {
    setPageNum(1);
    setData([]);
    fetchData();
  }, [explore]);
  // >>>>>>>>>>>>>>>>>>>
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, [totalPages, loading, pageNum]);
  // >>>>>>>>>>>>>>>>>>>
  useEffect(() => {
    fetchData();
  }, [pageNum]);
  //>>>>>>>>>>>>> (useEffcet) cases

  return (
    <section className="pt-24">
      <div className="container">
        <h1 className="capitalize text-xl font-semibold mb-3">
          popular {explore} show
        </h1>
        <div className="row">
          {loading && <Loading />}
          {data.length == 0 && error && (
            <div
              className="p-4 mb-2 w-full text-center text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {error}
            </div>
          )}
          {data?.length > 0 &&
            data.map((movie) => {
              return (
                <div
                  className="w-full sm:w-[42%] md:w-[32%] lg:w-[22%]"
                  key={movie.id}
                >
                  <MovieCard
                    movie={movie}
                    mediaType={explore}
                    className="w-full"
                  />
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default ExplorePage;
