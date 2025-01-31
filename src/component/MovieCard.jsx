import moment from "moment";
import { Link } from "react-router-dom";

const MovieCard = ({ movie, mediaType }) => {
  return (
    <>
      <div className="card w-full px-1 mb-5 rounded-sm">
        <Link to={`/${mediaType}/${movie?.id}`}>
          <div className="imgDiv w-full h-80 rounded-sm relative overflow-hidden">
            {movie?.backdrop_path || movie?.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/original${
                  movie?.backdrop_path || movie?.poster_path
                }`}
                className="w-full h-full object-cover rounded-sm hover:scale-125 transition-all duration-300 ease-in"
                alt="movie image"
              />
            ) : (
              <p className="capitalize text-lg flex items-center justify-center h-full bg-n">
                Image not found
              </p>
            )}

            <div className="absolute w-full bottom-0 bg-black/50 py-4 px-2 backdrop-blur-3xl rounded-bl-sm rounded-br-sm">
              <h2 className="text-ellipsis line-clamp-1 font-bold">
                {movie?.title || movie?.name}
              </h2>
              <p className="w-full flex items-center justify-between mt-4">
                <span>
                  {movie?.release_date
                    ? moment(movie.release_date).format("MMM Do YY")
                    : movie?.first_air_date
                    ? moment(movie.first_air_date).format("MMM Do YY")
                    : "Date Not Available"}
                </span>
                <span>
                  {movie?.vote_average ? movie.vote_average.toFixed(1) : "N/A"}{" "}
                  <i className="fa-solid fa-star text-orange-400"></i>
                </span>
              </p>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default MovieCard;
