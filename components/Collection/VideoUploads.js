import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import VideoItems from "../VideoItems";

export default function VideoUploads() {
  const { Moralis } = useMoralis();

  const [nature, setNature] = useState();

  useEffect(() => {
    const VideoContent = Moralis.Object.extend("VideoContent");
    const query = new Moralis.Query(VideoContent);

    const ChannelCategory = Moralis.Object.extend("ChannelCategory");
    const category = new ChannelCategory();

    category.set("objectId", "k2S3qyAbqVTmOMgFG8gNr7e0");
    query.equalTo("category", category);
    query.limit(4);

    query.find().then(function (results) {
      let category = [];
      results.forEach((result) => {
        category.push(result);
      });
      setNature(category);
      console.log(nature);
    });
  }, []);

  return (
    <div className="flex w-full flex-col justify-center">
      <h1 className="flex flex-start text-xl items-center whitespace-nowrap justify-center ml-8 my-8 w-1/12">
        {" "}
        Your Videos{" "}
      </h1>
      <div className="flex items-center justify-center p-2 space-x-4">
        {/* {nature.map((video, index) => {
          return <VideoItems key={index} video={video} />;
        })} */}
      </div>
      <hr className="mt-4 w-full " />
    </div>
  );
}
