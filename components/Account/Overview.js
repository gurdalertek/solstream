import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { useMoralisSolanaApi, useMoralisSolanaCall } from "react-moralis";
import Image from "next/image";
import VotesContainer from "../Governance/VotesContainer";
import { SwitchHorizontalIcon } from "@heroicons/react/outline";

export default function Account() {
  const { user, Moralis } = useMoralis();

  // const { account } = useMoralisSolanaApi();

  // const options = {
  //   network: "devnet",
  //   address: "HsXZnAba2...",
  // };
  // const { fetch, data, isLoading } = useMoralisSolanaCall(
  //   account.getNFTs,
  //   options
  // );

  const [userAddress, setUserAddress] = useState();

  const [votes, setVotes] = useState();

  const [isGovernor, setIsGovernor] = useState();

  useEffect(() => {
    if (user) setUserAddress(user.get("solAddress"));
    //if (user holds governance token){
    // setIsGovernor(true)}
  }, [user]);

  function mintToken() {
    // contract Call to transfer token from Token Account to User Account
  }

  function govSwitch() {
    if (isGovernor) setIsGovernor(false);
    else {
      setIsGovernor(true);
    }
  }

  // useEffect(() => {
  //   const AdContent = Moralis.Object.extend("AdContent");
  //   const query = new Moralis.Query(AdContent);
  //   const votes = new AdContent();
  //   query.find().then(function (results) {
  //     results.forEach((result) => {
  //       console.log(result);
  //     });
  //   });
  //   setVotes(votes);
  // }, []);

  return (
    <div className="mt-8 flex flex-col items-center justify-center">
      <h1>User</h1>
      <h1
        onClick={() => navigator.clipboard.writeText(userAddress)}
        className="cursor-pointer hover:underline flex active:text-[#9945FF]"
      >
        {/* {userAddress.slice(0, 8).concat("...")} */}
        {userAddress}
      </h1>
      <div className="mt-8 flex flex-row">
        <button
          className={`border-2 border-[#14F195] flex flex-row items-center p-2 m-4 rounded-lg whitespace-nowrap`}
          onClick={govSwitch}
        >
          {!isGovernor ? "Votes" : "Governance Token"}
          <SwitchHorizontalIcon className="h-3 ml-2" />
        </button>
      </div>
      {isGovernor ? (
        <div className="bg-black bg-opacity-25 mt-8 sm:w-6/12 w-full flex flex-col items-center justify-center mb-8 rounded-xl">
          <div className="flex w-full flex-col items-center justify-center my-8">
            <p className="text-xl font-bold">Votes</p>
            <p className="flex mt-2 mb-4">Advertisements you voted for</p>
            {/* {votes.map((vote, index) => {
              return <VotesContainer key={index} />;
            })} */}
            <VotesContainer />
            <VotesContainer />
            <VotesContainer />
          </div>
        </div>
      ) : (
        <div className="bg-black bg-opacity-25 mt-8 w-6/12 flex flex-col items-center justify-center mb-8 rounded-xl">
          <div className="flex flex-col items-center justify-center mt-8">
            <p className="text-xl font-bold">Mint governance token</p>
            <p className="flex mt-2">
              governance tokens allow a user to vote on proposed advertisements
              for video content.
            </p>
            <Image
              className="object-contain"
              height={250}
              width={250}
              src="/img.png"
            />
            <button
              className={`border-2 border-[#14F195] p-2 m-4 rounded-lg whitespace-nowrap`}
              onClick={mintToken}
            >
              Mint Token
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
