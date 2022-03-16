import { CheckIcon, XIcon } from "@heroicons/react/outline";
import { useState } from "react";

export default function VotesContainer(props) {
  const [isUp, setIsUp] = useState();
  const [isDown, setIsDown] = useState();

  function setUp() {
    setIsUp(true);
    setIsDown(false);
  }

  function setDown() {
    setIsDown(true);
    setIsUp(false);
  }

  return (
    <div className="sm:w-6/12 w-9/12 bg-[#9945FF] bg-opacity-10 mt-4 h-32 flex flex-col items-center justify-between rounded-xl">
      <div className="flex w-11/12 flex-col h-2/3 items-center justify-between">
        <div className="flex flex-col text-sm">
          <p className="mb-2 mt-1">{props.vote.get("adTitle")}</p>
        </div>
        <div className="text-xs mb-2">
          <p className="">{props.vote.get("adDescription")}</p>
        </div>
      </div>
      <div className="w-9/12 flex h-1/6 flex-row items-center justify-between mr-4 mb-2 space-x-2">
        <p className="text-xs">{props.vote.get("link")}</p>
        <div className="flex items-center w-2/12 justify-between ">
          <div
            onClick={setUp}
            className={` cursor-pointer text-sm bg-black bg-opacity-20 p-1 rounded-xl ${
              isUp && "text-green-500"
            }`}
          >
            <CheckIcon className="h-3" />
          </div>
          <div
            onClick={setDown}
            className={`cursor-pointer text-sm bg-black bg-opacity-20 p-1 rounded-xl ${
              isDown && "text-red-500"
            }`}
          >
            <XIcon className="h-3" />
          </div>
        </div>
      </div>
    </div>
  );
}
