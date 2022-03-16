import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import VideoItems from "../VideoItems";

export default function Results() {
  const { Moralis } = useMoralis();
  const [crypto, setCrypto] = useState([]);

  // CRYPTO USE EFFECT
  useEffect(() => {
    const VideoContent = Moralis.Object.extend("VideoContent");
    const query = new Moralis.Query(VideoContent);

    const ChannelCategory = Moralis.Object.extend("ChannelCategory");
    const category = new ChannelCategory();

    category.set("objectId", "AFeyVAoaurD6lzwLBWYW135N");
    query.equalTo("category", category);
    query.limit(4);

    query.find().then(function (results) {
      let category = [];
      results.forEach((result) => {
        category.push(result);
      });
      setCrypto(category);
      console.log(crypto);
    });
  }, []);

  return (
    <div className="flex flex-col justify-center">
      <h1 className="flex flex-start text-xl items-center justify-center ml-8 my-8 w-1/12">
        {" "}
        CRYPTO{" "}
      </h1>
      <div className="flex items-center justify-center p-2 space-x-4">
        {crypto.map((video, index) => {
          return <VideoItems key={index} video={video} />;
        })}
      </div>
    </div>
  );
}
