import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import VideoItems from "./VideoItems";

export default function Results() {
  const { Moralis } = useMoralis();
  const [cities, setCities] = useState([]);
  const [nature, setNature] = useState([]);
  const [culture, setCulture] = useState([]);
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    const VideoContent = Moralis.Object.extend("VideoContent");
    const query = new Moralis.Query(VideoContent);

    const ChannelCategory = Moralis.Object.extend("ChannelCategory");
    const category = new ChannelCategory();

    category.set("objectId", "F4Pc5hBl3vp4QzXMaKT3SknH");
    query.equalTo("category", category);

    query.find().then(function (results) {
      let category = [];
      results.forEach((result) => {
        category.push(result);
      });
      setNature(category);
      console.log(category);
    });
  }, []);

  return (
    <div className="flex flex-col justify-center">
      <h1 className="flex flex-start items-center justify-center ml-8 my-8 w-1/12">
        {" "}
        CITIES{" "}
      </h1>
      <div className="flex items-center justify-center p-2 space-x-4">
        <VideoItems />
        <VideoItems />
        <VideoItems />
      </div>
      <hr className="mt-4" />
      <h1 className="flex flex-start items-center justify-center ml-8 my-8 w-1/12">
        {" "}
        NATURE{" "}
      </h1>
      <div className="flex items-center justify-center p-2 space-x-4">
        <VideoItems />
        <VideoItems />
        <VideoItems />
      </div>
      <hr className="mt-4 text-[#9945FF]" />
      <h1 className="flex flex-start items-center justify-center ml-8 my-8 w-1/12">
        {" "}
        CULTURE{" "}
      </h1>
      <div className="flex items-center justify-center p-2 space-x-4">
        <VideoItems />
        <VideoItems />
        <VideoItems />
      </div>
      <hr className="mt-4 text-[#9945FF]" />
      <h1 className="flex flex-start items-center justify-center ml-8 my-8 w-1/12">
        {" "}
        CRYPTO{" "}
      </h1>
      <div className="flex items-center justify-center p-2 space-x-4">
        <VideoItems />
        <VideoItems />
        <VideoItems />
      </div>
      <hr className="mt-4 text-[#9945FF]" />
    </div>
  );
}
