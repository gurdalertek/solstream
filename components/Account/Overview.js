import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { useMoralisSolanaApi, useMoralisSolanaCall } from "react-moralis";
import Image from "next/image";
import VotesContainer from "../Governance/VotesContainer";
import {
  CheckCircleIcon,
  SwitchHorizontalIcon,
} from "@heroicons/react/outline";
import {
  clusterApiUrl,
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  web3,
} from "@solana/web3.js";
import { Token, TOKEN_PROGRAM_ID, AccountLayout } from "@solana/spl-token";
import {
  getAccount,
  createMint,
  getMint,
  createAccount,
  mintTo,
  getOrCreateAssociatedTokenAccount,
  getAssociatedTokenAddress,
  transfer,
} from "@solana/spl-token";
import { actions, NodeWallet } from "@metaplex/js";

export default function Account() {
  const { user, Moralis } = useMoralis();

  const { account } = useMoralisSolanaApi();

  const [options, setOptions] = useState();

  const { fetch, data, isLoading } = useMoralisSolanaCall(
    account.getSPL,
    options
  );

  const [userAddress, setUserAddress] = useState();
  const [availableSup, setAvailableSup] = useState(10);

  // const [votes, setVotes] = useState();

  const [isGovernor, setIsGovernor] = useState();
  const [hasGovernor, setHasGovernor] = useState();

  useEffect(() => {
    if (user) {
      setUserAddress(user.get("solAddress"));
    }
    //if (user holds governance token){

    // setIsGovernor(true)}
  }, [user, data, isLoading]);

  const [tokenGovOwned, setTokenGovOwned] = useState();

  useEffect(() => {
    async function getTokens() {
      // Connect to cluster
      const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
      const tokenAccounts = await connection.getTokenAccountsByOwner(
        new PublicKey(user.get("solAddress")),
        {
          programId: TOKEN_PROGRAM_ID,
        }
      );
      tokenAccounts.value.forEach((e) => {
        const accountInfo = AccountLayout.decode(e.account.data);

        const tokenID = new PublicKey(accountInfo.mint).toBase58();

        if (
          tokenID == "5DTYyuw432dAjHRqEGNwkNqQSvHitQW26DvPTuuwPsHu" &&
          accountInfo.amount >= 1
        ) {
          setHasGovernor(true);
          setTokenGovOwned(parseInt(accountInfo.amount));
        }
      });
    }
    if (user) {
      getTokens();
    }
  }, [user]);

  useEffect(() => {
    async function getSupply() {
      // Connect to cluster
      const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
      const tokenAccounts = await connection.getTokenAccountsByOwner(
        new PublicKey("H4RaCd5EsEZybRW1qVzYqHmkVDBhrAnhgwXq7J8wbgi4"),
        {
          programId: TOKEN_PROGRAM_ID,
        }
      );
      tokenAccounts.value.forEach((e) => {
        const accountInfo = AccountLayout.decode(e.account.data);
        const tokenID = new PublicKey(accountInfo.mint).toBase58();

        if (tokenID == "5DTYyuw432dAjHRqEGNwkNqQSvHitQW26DvPTuuwPsHu") {
          console.log(accountInfo.amount);
          setAvailableSup(parseInt(accountInfo.amount));
        }
      });
    }

    getSupply();
  }, []);

  // useEffect(() => {
  //   async function getTotalSupply() {
  //     // Connect to cluster
  //     const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

  //     const mintInfo = await getMint(
  //       connection,
  //       new PublicKey("H4RaCd5EsEZybRW1qVzYqHmkVDBhrAnhgwXq7J8wbgi4")
  //     );
  //     // console.log(JSON.stringify(mintInfo));
  //   }

  //   getTotalSupply();
  // }, [user]);

  const SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID = new PublicKey(
    "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
  );

  let associatedAddress = "";

  async function findAssociatedTokenAddress(walletAddress, tokenMintAddress) {
    const array = await PublicKey.findProgramAddress(
      [
        walletAddress.toBuffer(),
        TOKEN_PROGRAM_ID.toBuffer(),
        tokenMintAddress.toBuffer(),
      ],
      SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID
    );
    associatedAddress = array[0];
    // setAssociatedAddress(array[0]);
    console.log(array[0]);
  }

  // Make a token ... add its token address
  const tokenAddress = "5DTYyuw432dAjHRqEGNwkNqQSvHitQW26DvPTuuwPsHu";
  const tokenAddressPublicKey = new PublicKey(tokenAddress);
  // make an account for the token
  const tokenAccount = "43jztX9LUHVzmiqM1wx6CJaVK7ZNFaXZKZXqdU2hyQBM";
  const tokenAccountPublicKey = new PublicKey(tokenAccount);

  async function mintToken() {
    // Connect to cluster
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

    // Generate a new wallet keypair and airdrop SOL
    // add the secret key in env file
    const fromWallet = Keypair.fromSecretKey(
      Uint8Array.from([
        81, 44, 238, 97, 221, 219, 78, 163, 163, 238, 171, 194, 50, 178, 32,
        130, 143, 102, 246, 161, 246, 179, 223, 125, 147, 31, 194, 201, 52, 41,
        4, 234, 238, 155, 132, 114, 144, 38, 86, 246, 244, 55, 188, 209, 154,
        130, 54, 68, 0, 165, 65, 110, 90, 75, 3, 223, 101, 84, 204, 238, 10,
        101, 81, 25,
      ])
    );

    console.log("From Wallet:", fromWallet.publicKey.toBase58());

    // Generate a new wallet to receive newly minted token
    let user = Moralis.User.current();
    const toWallet = new PublicKey(user.get("solAddress"));

    const gettingMint = await getMint(connection, tokenAddressPublicKey);
    console.log("mint", gettingMint);
    const mint = gettingMint.address;
    console.log(mint.toBase58());

    // Get the token account of the fromWallet address, and if it does not exist, create it
    const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      fromWallet,
      mint,
      fromWallet.publicKey
    );
    console.log("From Token Account:", fromTokenAccount);

    // // Get the token account of the toWallet address, and if it does not exist, create it
    const toTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      fromWallet,
      mint,
      toWallet
    );
    console.log("To Token Account:", toTokenAccount);

    const signature = await transfer(
      connection,
      fromWallet,
      fromTokenAccount.address,
      toTokenAccount.address,
      fromWallet.publicKey,
      1
    );
    console.log("transfer tx:", signature);
  }

  function govSwitch() {
    if (isGovernor) setIsGovernor(false);
    else {
      setIsGovernor(true);
    }
  }

  return (
    <div className="mt-8 flex flex-col items-center justify-center">
      <h1 className="flex text-xl font-bold mb-8">ACCOUNT</h1>
      <div
        onClick={() => navigator.clipboard.writeText(userAddress)}
        className="cursor-pointer hover:underline flex active:text-[#9945FF]"
      >
        {userAddress}
      </div>

      <div className="flex flex-row items-center w-6/12 justify-evenly mt-8">
        <button
          className={`border-2 border-[#14F195] p-2 m-4 rounded-lg whitespace-nowrap ${
            isGovernor && "text-white underline"
          }`}
          onClick={govSwitch}
        >
          Votes
        </button>
        <SwitchHorizontalIcon className="h-5" />
        <button
          className={`border-2 border-[#14F195] p-2 m-4 rounded-lg whitespace-nowrap ${
            !isGovernor && "text-white underline"
          }`}
          onClick={govSwitch}
        >
          Governance
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
          {!hasGovernor ? (
            <div className="flex flex-col items-center justify-center mt-8">
              <p className="text-xl font-bold">Mint governance token</p>
              <p className="flex mt-2">
                governance tokens allow a user to vote on proposed
                advertisements for video content.
              </p>

              {availableSup && (
                <div className="mt-4 text-white ">
                  TOTAL SUPPLY: {availableSup} / 10.000
                </div>
              )}

              <Image
                className="object-contain"
                height={250}
                width={250}
                src="/solstreamgov.png"
              />
              <button
                className={`border-2 border-[#14F195] p-2 m-4 rounded-lg whitespace-nowrap`}
                onClick={mintToken}
              >
                Mint Token
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-center h-96 flex-col">
              <div className="flex flex-row items-center justify-center">
                <div>GOVERNOR</div>
                <CheckCircleIcon className="h-4 ml-2 text-[#14F195]" />
              </div>
              <p className="mt-4 text-sm">Tokens Owned: {tokenGovOwned}</p>

              <Image
                className="object-contain"
                height={250}
                width={250}
                src="/solstreamgov.png"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
