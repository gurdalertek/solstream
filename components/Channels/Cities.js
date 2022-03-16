import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import VideoItems from "../VideoItems";

export default function Results() {
  const { Moralis } = useMoralis();
  const [cities, setCities] = useState([]);

  // CITY USE EFFECT

  useEffect(() => {
    const VideoContent = Moralis.Object.extend("VideoContent");
    const query = new Moralis.Query(VideoContent);

    const ChannelCategory = Moralis.Object.extend("ChannelCategory");
    const category = new ChannelCategory();

    category.set("objectId", "1s39DicgpnWmRe8ihCCHB70e");
    query.equalTo("category", category);
    query.limit(4);

    query.find().then(function (results) {
      let category = [];
      results.forEach((result) => {
        category.push(result);
      });
      setCities(category);
      console.log(cities);
    });
  }, []);

  return (
    <div className="flex flex-col justify-center">
      <h1 className="flex text-xl flex-start items-center justify-center ml-8 my-8 w-1/12">
        {" "}
        CITIES{" "}
      </h1>
      <div className="flex items-center justify-center p-2 space-x-4">
        {cities.map((video, index) => {
          return <VideoItems key={index} video={video} />;
        })}
      </div>
    </div>
  );
}
