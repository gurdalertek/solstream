import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import VotesContainer from "../Governance/VotesContainer";

export default function Uploads() {
  const { user, Moralis } = useMoralis();

  const [votes, setVotes] = useState([]);

  useEffect(() => {
    const AdContent = Moralis.Object.extend("AdContent");
    const query = new Moralis.Query(AdContent);

    const vote = [];

    query.find().then(function (results) {
      results.forEach((result) => {
        vote.push(result);
      });
      setVotes(vote);
    });
    console.log(votes);
  }, []);

  return (
    <div className="mt-8 flex flex-col items-center justify-center">
      <h1 className="flex text-xl font-bold mb-4">COLLECTION</h1>
      <div className="mt-8 flex flex-row"></div>
      <div className="bg-black bg-opacity-25 mt-8 sm:w-6/12 w-full flex flex-col items-center justify-center mb-8 rounded-xl">
        <div className="flex w-full flex-col items-center justify-center my-8">
          <p className="text-xl mb-8 font-bold">Your advertisement proposals</p>
          Total Ads: {votes.length}
          {votes.map((vote, index) => {
            return <VotesContainer vote={vote} key={index} />;
          })}
        </div>
      </div>
    </div>
  );
}
