import { useParams } from "react-router-dom";
import { useState } from "react";
import moment from "moment";
import Slider from "react-slick";
import Loading from "./Loading";
import CastCard from "./Castcard";
import MovieCard from "./MovieCard";
import PlayVideo from "./PlayVideo";
import useFetchDetails from "../hooks/useFetchDetails";
import useFetching from "../hooks/useFetching";

const DetailsPage = () => {
  const { explore, id } = useParams();
  const [playVideo, setPlayVideo] = useState(false);

  const {
    data: movieDetails,
    loading,
    errord,
  } = useFetchDetails(`${explore}/${id}`);
  const {
    data: movieCast,
    loadingCast,
    errorCast,
  } = useFetchDetails(`${explore}/${id}/credits`);
  const {
    data: relatedMovies,
    rloading,
    rerror,
  } = useFetching(`${explore}/${id}/similar`);
  const {
    data: recommendedMovies,
    reloading,
    reerror,
  } = useFetching(`${explore}/${id}/recommendations`);
  const error = errord || errorCast || rerror || reerror;

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 2 } },
      { breakpoint: 500, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  return (
    <>
      {loading && <Loading />}
      {error && (
        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">
          {error}
        </div>
      )}
      <section className="w-full h-full pt-28 bg-neutral-950 opacity-70">
        <div className="container">
          <h1 className="text-5xl capitalize mb-5">Movie Details</h1>

          {/* Movie Details */}
          <div className="w-full flex items-center justify-center">
            <div className="card px-1 mb-5 rounded-sm">
              <div className="imgDiv w-full h-full rounded-sm overflow-hidden mb-7 relative">
                {movieDetails?.backdrop_path || movieDetails?.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w780${
                      movieDetails?.backdrop_path || movieDetails?.poster_path
                    }`}
                    className="w-full h-full object-cover rounded-sm hover:scale-125 transition-all duration-300 ease-in"
                    alt={movieDetails?.title || "Movie image"}
                  />
                ) : (
                  <p className="capitalize text-lg flex items-center justify-center h-full bg-gray-800 text-white">
                    Image not found
                  </p>
                )}
                <div className="bg-black/10 p-5 absolute mx-3 mb-3 sm:mx-10 sm:mb-10 bottom-0">
                  <button
                    onClick={() => setPlayVideo(true)}
                    className="w-fit sm:w-[300px] capitalize  bg-white px-4 py-2 text-black rounded-sm font-bold text-lg hover:bg-gradient-to-l from-red-400 to-orange-400 transition-all duration-300 ease-linear hover:scale-105"
                  >
                    Play Now
                  </button>
                </div>
              </div>

              {/* Movie Details */}
              <div className="w-full bg-black/65 backdrop-blur-3xl rounded-bl-sm rounded-br-sm py-4 px-8 text-white">
                <h2 className="text-ellipsis line-clamp-1 text-3xl font-bold mb-3">
                  {movieDetails?.title || movieDetails?.name}
                </h2>

                <div className="text-lg tracking-[1px] text-neutral-400 mb-3">
                  <span className="text-white text-2xl capitalize">
                    Overview:
                  </span>
                  <p>{movieDetails?.overview || "No overview available."}</p>
                </div>

                <h3 className="text-xl font-bold mb-1">
                  Status: {movieDetails?.status || "Unknown"}
                </h3>
                <p className="capitalize text-lg mb-1">
                  Views: {movieDetails?.vote_count || "N/A"}
                </p>
                <p className="capitalize text-lg mb-1">
                  Original Language: {movieDetails?.original_language || "N/A"}
                </p>
                <p className="capitalize text-xl mb-1 text-orange-100">
                  Producer: {movieCast?.crew?.[0]?.name || "Not Available"}
                </p>
                <p className="w-full flex items-center justify-between mt-4">
                  <span>
                    {movieDetails?.release_date
                      ? moment(movieDetails.release_date).format("MMM Do YY")
                      : movieDetails?.first_air_date
                      ? moment(movieDetails.first_air_date).format("MMM Do YY")
                      : "Date Not Available"}
                  </span>
                  <span>
                    {movieDetails?.vote_average
                      ? movieDetails.vote_average.toFixed(1)
                      : "N/A"}{" "}
                    <i className="fa-solid fa-star text-orange-400"></i>
                  </span>
                </p>

                {/* Cast Section */}
                {loadingCast && <Loading />}
                <div className="castContent my-14">
                  <h2 className="text-2xl capitalize mb-5">The Cast:</h2>
                  <div className="w-full flex items-center justify-center flex-wrap gap-2">
                    {movieCast?.cast?.length > 0 ? (
                      movieCast.cast.map((cast) => (
                        <CastCard cast={cast} key={cast.id} />
                      ))
                    ) : (
                      <p>No cast information available.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Movies */}
          {rloading && <Loading />}
          <div className="relatedMovies">
            <h2 className="capitalize text-white text-4xl mb-3">
              Related Movies
            </h2>
            <div className="row">
              <Slider {...settings} className="w-full">
                {relatedMovies?.length > 0 ? (
                  relatedMovies.map((movie) => (
                    <div
                      className="w-full sm:w-[42%] md:w-[32%] lg:w-[22%]"
                      key={movie.id}
                    >
                      <MovieCard movie={movie} mediaType={explore} />
                    </div>
                  ))
                ) : (
                  <p>No related movies found.</p>
                )}
              </Slider>
            </div>
          </div>

          {/* Recommended Movies */}
          {reloading && <Loading />}
          <div className="relatedMovies">
            <h2 className="capitalize text-4xl mb-3">Recommended Movies</h2>
            <div className="row">
              <Slider {...settings} className="w-full">
                {recommendedMovies?.length > 0 ? (
                  recommendedMovies.map((movie) => (
                    <div
                      className="w-full sm:w-[42%] md:w-[32%] lg:w-[22%]"
                      key={movie.id}
                    >
                      <MovieCard movie={movie} mediaType={explore} />
                    </div>
                  ))
                ) : (
                  <p>No recommendations available.</p>
                )}
              </Slider>
            </div>
          </div>

          {/* Play Video */}
          {playVideo && (
            <PlayVideo
              videoId={id}
              setPlayVideo={setPlayVideo}
              explore={explore}
            />
          )}
        </div>
      </section>
    </>
  );
};

export default DetailsPage;
