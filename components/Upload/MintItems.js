import MintVideos from "./MintVideos";
import MintAds from "./MintAds";
import Image from "next/image";
import { useState } from "react";

export default function MintItems() {
  const [isVideo, setIsVideo] = useState(true);

  function isAd() {
    setIsVideo(false);
  }
  function isVid() {
    setIsVideo(true);
  }

  return (
    <div className="mt-8 flex flex-col items-center justify-center w-full ">
      <div className="bg-black bg-opacity-25 w-6/12 flex flex-col items-center justify-center mb-8 rounded-xl">
        <div className="flex flex-row items-center w-6/12 justify-evenly mt-8">
          <button
            className={`border-2 border-[#14F195] p-2 m-4 rounded-lg whitespace-nowrap ${
              isVideo && "underline"
            }`}
            onClick={isVid}
          >
            Content
          </button>
          <button
            className={`border-2 border-[#14F195] p-2 m-4 rounded-lg whitespace-nowrap ${
              !isVideo && "underline"
            }`}
            onClick={isAd}
          >
            Adspace
          </button>
        </div>
        {isVideo ? <MintVideos /> : <MintAds />}
      </div>
    </div>
  );
}
