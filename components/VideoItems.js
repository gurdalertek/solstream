import { useEffect, useRef, useState } from "react";
import { useMoralis } from "react-moralis";
import { VideoJS } from "./VideoJs";
import "videojs-overlay/dist/videojs-overlay.js";
import overlay from "videojs-overlay";

export default function VideoItems(props) {
  const { Moralis } = useMoralis();

  const [videoJsOptions, setVideoJsOptions] = useState({
    controls: true,
    responsive: true,
    fluid: true,
    poster: props.video.get("pictureFile"),
    sources: [
      {
        src: props.video.get("videoFile"),
        type: "video/mp4",
      },
    ],
  });

  const [nature, setNature] = useState([]);

  const playerRef = useRef(null);

  useEffect(() => {
    const AdContent = Moralis.Object.extend("AdContent");
    const query = new Moralis.Query(AdContent);

    const ChannelCategory = Moralis.Object.extend("ChannelCategory");
    const category = new ChannelCategory();

    // NATURE
    category.set("objectId", props.video.get("category").id);
    query.equalTo("category", category);
    query.limit(4);

    query.find().then(function (results) {
      let category = [];
      results.forEach((result) => {
        console.log(result);
        category.push({
          content: result.get("adDescription"),
          start: 3,
          end: 33,
        });
      });
      setNature(category);
      console.log(nature);
      console.log(category);

      playerRef.current.overlay({
        overlays: category,
      });
    });
  }, []);

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

  return (
    <div className="border-[#14F195] border-2 cursor-pointer rounded-lg bg-[#2c3531] w-96 h-64 flex flex-col">
      <h1 className="py-1 pl-1 border-b bg-[#2c3531] rounded-t-lg border-[#14F195]">
        {props.video.get("videoTitle")}
      </h1>
      <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
    </div>
  );
}
