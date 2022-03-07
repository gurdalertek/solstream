import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { useMoralisSolanaApi, useMoralisSolanaCall } from "react-moralis";

export default function Account() {
  const { user } = useMoralis();

  const { account } = useMoralisSolanaApi();

  const options = {
    network: "devnet",
    address: "HsXZnAba2...",
  };
  const { fetch, data, isLoading } = useMoralisSolanaCall(
    account.getNFTs,
    options
  );

  const [userAddress, setUserAddress] = useState();

  const [isGovernor, setIsGovernor] = useState();

  useEffect(() => {
    if (user) setUserAddress(user.get("solAddress"));
  }, [user]);

  return (
    <div className="mt-8 flex flex-col items-center justify-center">
      {/* <Image
        className="object-contain"
        height={75}
        width={125}
        src="https://links.papareact.com/ua6"
      /> */}
      <h1 className="">{userAddress}</h1>
    </div>
  );
}
