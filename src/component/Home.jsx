import Slider from "react-slick";
import MovieCard from "./MovieCard";
import BannerHome from "./BannerHome";
import useFetching from "../hooks/useFetching";
import Loading from "./Loading";

const Home = () => {
  const {
    data: trendingMovies,
    loading: tloading,
    error: terror,
  } = useFetching("trending/all/week");
  const {
    data: nowPlayingMovies,
    loading: nloading,
    error: nerror,
  } = useFetching("movie/now_playing");
  const {
    data: toprated,
    loading: toploading,
    error: toperror,
  } = useFetching("movie/top_rated");
  const {
    data: popularMovies,
    loading: ploading,
    error: perror,
  } = useFetching("movie/popular");
  const {
    data: onAirMovies,
    loading: oloading,
    error: oerror,
  } = useFetching("movie/popular");

  const error = terror || nerror || toperror || perror || oerror;

  const settings = {
    arrows: false,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
  };

  const settings2 = {
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
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section>
      <div className="content w-full">
        {error && (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {error}
          </div>
        )}
        {/* Banner Slider */}
        {tloading ? (
          <Loading />
        ) : (
          <Slider {...settings} className="w-full h-full">
            {trendingMovies?.length > 0 &&
              trendingMovies.map((movie) => (
                <BannerHome key={movie.id} movie={movie} />
              ))}
          </Slider>
        )}

        {/* Trending Movies */}
        <div className="container my-6">
          <h1 className="mb-5 text-white font-bold text-3xl capitalize">
            Trending Shows
          </h1>
          <div className="row">
            {tloading ? (
              <Loading />
            ) : (
              <Slider {...settings2} className="w-full">
                {trendingMovies?.length > 0 &&
                  trendingMovies.map((movie) => (
                    <MovieCard
                      key={movie.id}
                      movie={movie}
                      mediaType={"movie"}
                    />
                  ))}
              </Slider>
            )}
          </div>
        </div>

        {/* Now Playing Movies */}
        <div className="container my-6">
          <h1 className="mb-5 text-white font-bold text-3xl capitalize">
            Now Playing
          </h1>
          <div className="row">
            {nloading ? (
              <Loading />
            ) : (
              <Slider {...settings2} className="w-full">
                {nowPlayingMovies?.length > 0 &&
                  nowPlayingMovies.map((movie) => (
                    <MovieCard
                      key={movie.id}
                      movie={movie}
                      mediaType={"movie"}
                    />
                  ))}
              </Slider>
            )}
          </div>
        </div>

        {/* Top Rated Movies */}
        <div className="container my-6">
          <h1 className="mb-5 text-white font-bold text-3xl capitalize">
            Top Rated
          </h1>
          <div className="row">
            {toploading ? (
              <Loading />
            ) : (
              <Slider {...settings2} className="w-full">
                {toprated?.length > 0 &&
                  toprated.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} mediaType={"tv"} />
                  ))}
              </Slider>
            )}
          </div>
        </div>

        {/* Popular Movies */}
        <div className="container my-6">
          <h1 className="mb-5 text-white font-bold text-3xl capitalize">
            Popular
          </h1>
          <div className="row">
            {ploading ? (
              <Loading />
            ) : (
              <Slider {...settings2} className="w-full">
                {popularMovies?.length > 0 &&
                  popularMovies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} mediaType={"tv"} />
                  ))}
              </Slider>
            )}
          </div>
        </div>

        {/* On Air Movies */}
        <div className="container my-6">
          <h1 className="mb-5 text-white font-bold text-3xl capitalize">
            on air
          </h1>
          <div className="row">
            {oloading ? (
              <Loading />
            ) : (
              <Slider {...settings2} className="w-full">
                {onAirMovies?.length > 0 &&
                  onAirMovies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} mediaType={"tv"} />
                  ))}
              </Slider>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
