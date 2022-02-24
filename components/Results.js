import { Router, useRouter } from "next/router";
import VideoItems from "./VideoItems";

export default function Results() {
  const router = useRouter();

  function openAccount() {
    router.push("/account");
  }
  return (
    <div className="flex flex-col justify-center">
      <h1 className="flex flex-start items-center justify-center ml-8 my-8 border-b w-1/12">
        {" "}
        TRENDING{" "}
      </h1>
      <div className="flex items-center justify-center p-2 space-x-4">
        <VideoItems />
        <VideoItems />
        <VideoItems />
      </div>
      <hr className="mt-4" />
      <h1 className="flex flex-start items-center justify-center ml-8 my-8 border-b w-1/12">
        {" "}
        CITIES{" "}
      </h1>
      <div className="flex items-center justify-center p-2 space-x-4">
        <VideoItems />
        <VideoItems />
        <VideoItems />
      </div>
      <hr className="mt-4 text-[#9945FF]" />
      <h1 className="flex flex-start items-center justify-center ml-8 my-8 border-b w-1/12">
        {" "}
        QUOTES{" "}
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
