import MintVideos from "./MintVideos";
import MintAds from "./MintAds";
import Image from "next/image";
import { useState } from "react";
import { SwitchHorizontalIcon } from "@heroicons/react/outline";

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
      <h1 className="flex text-xl font-bold mb-4">UPLOAD</h1>

      <div className="bg-black bg-opacity-25 w-6/12 flex flex-col items-center justify-center mb-8 rounded-xl">
        <div className="flex flex-row items-center w-6/12 justify-evenly mt-8">
          <button
            className={`border-2 border-[#14F195] p-2 m-4 rounded-lg whitespace-nowrap ${
              isVideo && "text-white underline"
            }`}
            onClick={isVid}
          >
            Video Content
          </button>
          <SwitchHorizontalIcon className="h-5" />
          <button
            className={`border-2 border-[#14F195] p-2 m-4 rounded-lg whitespace-nowrap ${
              !isVideo && "text-white underline"
            }`}
            onClick={isAd}
          >
            Advertisement
          </button>
        </div>
        {isVideo ? <MintVideos /> : <MintAds />}
      </div>
    </div>
  );
}
