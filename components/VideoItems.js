import { useEffect, useRef, useState } from "react";
import { useMoralis } from "react-moralis";
import VideoJs, { VideoJS } from "./VideoJs";

export default function Results() {
  const { Moralis } = useMoralis();

  const [videoJsOptions, setVideoJsOptions] = useState({
    controls: true,
    responsive: true,
    fluid: true,
    poster:
      "https://ipfs.moralis.io:2053/ipfs/QmNaiFBVjsoNrUPD3beFaoTwxVzfycjtfLJqKXos2QKhFq",
    sources: [
      {
        src: "https://ipfs.moralis.io:2053/ipfs/QmcWkssGgLzxN6PPgfK4QjJwdwnc533QMmeyZGMoTmgvhz",
        // src: "https://ipfs.moralis.io:2053/ipfs/QmbAvrABx5zEk18uD8rrPf9hDrcwqPc3n5GpXYGB9NHfGF",
        type: "video/mp4",
      },
    ],
  });

  const playerRef = useRef(null);

  const handlePlayerReady = (player) => {
    playerRef.current = player;
    // you can handle player events here
    player.on("waiting", () => {
      console.log("player is waiting");
    });

    player.on("dispose", () => {
      console.log("player will dispose");
    });
  };

  useEffect(() => {
    setVideoJsOptions();
  }, []);

  return (
    <div className="border-[#14F195] border-2 cursor-pointer rounded-lg bg-[#2c3531] w-96 h-64 flex flex-col">
      <h1 className="py-1 pl-1 border-b bg-[#2c3531] rounded-t-lg border-[#14F195]">
        TITLE
      </h1>
      {/* <p className="flex items-center justify-center h-full text-[#9945FF]">
        CONTENT
      </p> */}
      <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
      {/* <p className="py-1 pl-1 border-t bg-[#2c3531] rounded-b-lg border-[#14F195]">
        CREATOR
      </p> */}
    </div>
  );
}
