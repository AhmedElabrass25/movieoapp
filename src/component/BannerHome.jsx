import { Link } from "react-router-dom";

const BannerHome = ({ movie }) => {
  return (
    <>
      <div className="h-[100vh] w-full relative" key={movie.id}>
        <img
          className="w-full h-[100vh] object-cover"
          src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
          alt={movie?.title || "movies images"}
        />
        <div className="absolute bottom-5 left-5 p-5  drop-shadow-2xl shadow-2xl  bg-black/20">
          <h1 className="text-3xl lg:text-5xl font-semibold text-white drop-shadow-2xl mb-3">
            {movie?.title || movie?.name}
          </h1>
          <p className="text-ellipsis line-clamp-3 text-[18px] tracking-[1px] w-full lg:w-[600px] text-white mb-4">
            {movie?.overview}
          </p>
          <div className="details flex items-center mb-5">
            <div className="flex items-center">
              <span className="text-lg capitalize">
                Rating : {movie?.vote_average.toFixed(1)}
              </span>
              <i className="fa-solid fa-star text-orange-400 ms-2 text-lg"></i>
            </div>
            <span className="mx-5"> | </span>
            <p className="text-lg capitalize">
              view : {movie?.popularity.toFixed(1)}
            </p>
          </div>
          <Link
            to={`movie/${movie.id}`}
            className="capitalize bg-white px-4 py-2 text-black rounded-sm font-bold text-lg hover:bg-gradient-to-l from-red-400 to-orange-400 transition-all duration-300 ease-linear hover:scale-105"
          >
            play now
          </Link>
        </div>
      </div>
    </>
  );
};

export default BannerHome;
