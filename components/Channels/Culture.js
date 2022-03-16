import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import VideoItems from "../VideoItems";

export default function Results() {
  const { Moralis } = useMoralis();
  const [culture, setCulture] = useState([]);

  // CULTURE USE EFFECT

  useEffect(() => {
    const VideoContent = Moralis.Object.extend("VideoContent");
    const query = new Moralis.Query(VideoContent);

    const ChannelCategory = Moralis.Object.extend("ChannelCategory");
    const category = new ChannelCategory();

    category.set("objectId", "B55id0GM7e6Qdxr2gb9LC9zj");
    query.equalTo("category", category);
    query.limit(2);

    query.find().then(function (results) {
      let category = [];
      results.forEach((result) => {
        category.push(result);
      });
      setCulture(category);
      console.log(culture);
    });
  }, []);

  return (
    <div className="flex flex-col justify-center">
      <h1 className="flex flex-start text-xl items-center justify-center ml-8 my-8 w-1/12">
        {" "}
        CULTURE{" "}
      </h1>
      <div className="flex items-center justify-center p-2 space-x-4">
        {culture.map((video, index) => {
          return <VideoItems key={index} video={video} />;
        })}
      </div>
    </div>
  );
}
