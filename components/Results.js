import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import VideoItems from "./VideoItems";

export default function Results() {
  const { Moralis } = useMoralis();
  const [cities, setCities] = useState([]);
  const [nature, setNature] = useState([]);
  const [culture, setCulture] = useState([]);
  const [crypto, setCrypto] = useState([]);

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

  // NATURE USE EFFECT

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

  // CULTURE USE EFFECT

  useEffect(() => {
    const VideoContent = Moralis.Object.extend("VideoContent");
    const query = new Moralis.Query(VideoContent);

    const ChannelCategory = Moralis.Object.extend("ChannelCategory");
    const category = new ChannelCategory();

    category.set("objectId", "B55id0GM7e6Qdxr2gb9LC9zj");
    query.equalTo("category", category);
    query.limit(4);

    query.find().then(function (results) {
      let category = [];
      results.forEach((result) => {
        category.push(result);
      });
      setCulture(category);
      console.log(culture);
    });
  }, []);

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
      <h1 className="flex text-xl flex-start items-center justify-center ml-8 my-8 w-1/12">
        {" "}
        CITIES{" "}
      </h1>
      <div className="flex items-center justify-center p-2 space-x-4">
        {cities.map((video, index) => {
          return <VideoItems key={index} video={video} />;
        })}
      </div>
      <hr className="mt-4" />
      <h1 className="flex text-xl flex-start items-center justify-center ml-8 my-8 w-1/12">
        {" "}
        NATURE{" "}
      </h1>
      <div className="flex items-center justify-center p-2 space-x-4">
        {nature.map((video, index) => {
          return <VideoItems key={index} video={video} />;
        })}
      </div>
      <hr className="mt-4 text-[#9945FF]" />
      <h1 className="flex flex-start text-xl items-center justify-center ml-8 my-8 w-1/12">
        {" "}
        CULTURE{" "}
      </h1>
      <div className="flex items-center justify-center p-2 space-x-4">
        {culture.map((video, index) => {
          return <VideoItems key={index} video={video} />;
        })}
        {culture.map((video, index) => {
          return <VideoItems key={index} video={video} />;
        })}
      </div>
      <hr className="mt-4 text-[#9945FF]" />
      <h1 className="flex flex-start text-xl items-center justify-center ml-8 my-8 w-1/12">
        {" "}
        CRYPTO{" "}
      </h1>
      <div className="flex items-center justify-center p-2 space-x-4">
        {crypto.map((video, index) => {
          return <VideoItems key={index} video={video} />;
        })}
      </div>
      <hr className="mt-4 text-[#9945FF]" />
    </div>
  );
}
