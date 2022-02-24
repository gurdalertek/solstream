import VideoItems from "../VideoItems";

export default function Uploads() {
  return (
    <div className="flex flex-col justify-center">
      <h1 className="flex flex-start items-center justify-center mb-4 mt-8 w-1/12">
        RECENTLY
      </h1>
      <div className="flex items-center justify-center p-2 space-x-4">
        <VideoItems />
        <VideoItems />
        <VideoItems />
      </div>
    </div>
  );
}
