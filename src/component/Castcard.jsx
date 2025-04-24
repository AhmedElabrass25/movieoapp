const Castcard = ({ cast }) => {
  return (
    <>
      <div
        className="mb-3 flex flex-col justify-center items-center"
        key={cast.id}
      >
        <div className="imgDiv w-16 h-16 sm:w-36 sm:h-36 rounded-full overflow-hidden">
          {cast?.profile_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w500${cast?.profile_path}`}
              className="w-full h-full object-cover object-center rounded-full hover:scale-125 transition-all duration-300 ease-in"
              alt="cast image"
            />
          ) : (
            <p className="capitalize text-lg flex items-center justify-center h-full bg-n">
              Image not found
            </p>
          )}
        </div>
        <div className="w-full bg-black/50 py-4 px-2 backdrop-blur-3xl rounded-bl-sm rounded-br-sm text-center">
          <h2 className="text-ellipsis line-clamp-1 font-bold">{cast?.name}</h2>
          <p className="w-full">{cast?.character}</p>
        </div>
      </div>
    </>
  );
};

export default Castcard;
