import useFetchDetails from "../hooks/useFetchDetails";

const PlayVideo = ({ setPlayVideo, videoId, explore }) => {
  console.log(videoId, explore);
  const { data: videoData } = useFetchDetails(`${explore}/${videoId}/videos`);
  //   console.log(videoData?.results[0]?.key);
  return (
    <section className="fixed w-full h-full top-0 bottom-0 left-0 right-0 z-[99999] bg-neutral-950 bg-opacity-50 text-white">
      <div className="container w-full h-full">
        <div className="flex items-center justify-center  w-full h-full">
          <div className="w-full h-[60vh] bg-black opacity-100 relative cursor-pointer">
            <i
              className="fa-solid fa-xmark absolute bg-white text-black py-2 px-4 top-0 right-0 text-[18px]"
              onClick={() => setPlayVideo(false)}
            ></i>
            <iframe
              src={`https://www.youtube.com/embed/${videoData?.results[0]?.key}`}
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlayVideo;
