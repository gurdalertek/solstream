import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { useMoralisSolanaApi, useMoralisSolanaCall } from "react-moralis";
import Image from "next/image";

export default function Account() {
  const { user } = useMoralis();

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

  const [isGovernor, setIsGovernor] = useState();

  useEffect(() => {
    if (user) setUserAddress(user.get("solAddress"));
  }, [user]);

  function mintToken() {
    // contract Call to transfer token from Token Account to User Account
  }

  return (
    <div className="mt-8 flex flex-col items-center justify-center">
      <h1>User Address</h1>
      <h1 className="">{userAddress}</h1>
      <div className="bg-black bg-opacity-25 mt-24 w-6/12 flex flex-col items-center justify-center mb-8 rounded-xl">
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
    </div>
  );
}
