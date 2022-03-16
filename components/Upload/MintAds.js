import { useMoralis } from "react-moralis";
import { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
// import solstream from "../../utils/solstream";
import idl from "../../utils/solstream.json";
import { Provider, Program } from "@project-serum/anchor";
import * as anchor from "@project-serum/anchor";
// import program from "./Program";
import { useAnchorWallet } from "@solana/wallet-adapter-react";

import {
  clusterApiUrl,
  Connection,
  Keypair,
  SystemProgram,
  Transaction,
  PublicKey,
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

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

export default function MintVideos() {
  const { Moralis, user } = useMoralis();

  const [selected, setSelected] = useState();
  const [categories, setCategories] = useState([]);
  const [selectedId, setSelectedId] = useState(new Map());
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const ChannelCategory = Moralis.Object.extend("ChannelCategory");
    const query = new Moralis.Query(ChannelCategory);
    query.find().then((results) => {
      let r = [];
      let rmap = new Map();
      results.forEach((result) => {
        r.push({ id: result.id, Category: result.get("Category") });
        rmap[result.get("Category")] = result.id;
      });
      setCategories(r);
      setSelectedId(rmap);
    });
  }, []);

  async function createAd(e) {
    e.preventDefault();
    setIsUploading(true);
    const adTitle = document.getElementById("adTitle").value;
    const adDescription = document.getElementById("adDescription").value;
    const adLink = document.getElementById("link").value;
    const selectedCategory = selected;

    const metadata = {
      name: adTitle,
      description: adDescription,
      hyperlink: adLink,
      category: selectedCategory,
    };

    const metadataFile = new Moralis.File("metadata.json", {
      base64: btoa(JSON.stringify(metadata)),
    });

    await metadataFile.saveIPFS();
    const metadataURI = metadataFile.ipfs();

    const AdContent = new Moralis.Object.extend("AdContent");
    const adContent = new AdContent();

    const ChannelCategory = Moralis.Object.extend("ChannelCategory");
    const category = new ChannelCategory();
    category.set("objectId", selectedId[selected]);

    adContent.set("adTitle", adTitle);
    adContent.set("adDescription", adDescription);
    adContent.set("link", adLink);
    adContent.set("category", category);
    adContent.save().then((object) => {
      contractCall(object);
      setIsUploading(false);
      alert("saved");
    });
  }

  const date = new Date();
  let time = date.getTime() + 432000;

  async function contractCall(object) {
    // const wallet = await window.solana.connect();

    const ad = anchor.web3.Keypair.generate();
    // const provider = new anchor.Provider(
    //   connection,
    //   await window.solana.connect(),
    //   anchor.Provider.defaultOptions()
    // );

    // Address of the deployed program.
    const programId = new anchor.web3.PublicKey(idl.metadata.address);

    // Generate the program client from IDL.
    // const program = new Program(idl, programId, provider);

    const program = new anchor.Program(idl, programId);

    // Execute the RPC.

    // await program.rpc.initialize();

    await program.rpc.createAd(
      object.get("adTitle"),
      object.get("adDescription"),
      object.id,

      new anchor.BN(time),
      {
        accounts: {
          ad: ad.publicKey,
          author: new PublicKey(user.get("solAddress")),
          systemProgram: anchor.web3.SystemProgram.programId,

          // Accounts here...
        },
        signers: [
          ad,
          // Key pairs of signers here...
        ],
      }
    );
    object.set("pubKey", ad.publicKey.toBase58());
    object.set("active", true);
    object.save();
    console.log(ad.PublicKey.toBase58());
  }

  return (
    <div className=" flex flex-col items-center justify-center my-8">
      <h1 className="mb-8">Upload Advertisement</h1>
      <form className="flex flex-col w-full items-center justify-center space-y-8">
        <input
          id={"adTitle"}
          type={"text"}
          placeholder="Title"
          className="bg-[#9945FF] w-full  bg-opacity-10 outline-none py-2 rounded-xl px-2"
        />
        <input
          id={"link"}
          type={"text"}
          placeholder="Weblink"
          className="bg-[#9945FF] w-full  bg-opacity-10 outline-none py-2 rounded-xl px-2"
        />
        <textarea
          id={"adDescription"}
          type={"text"}
          placeholder="Description (max characters 150)"
          className="bg-[#9945FF] w-full  bg-opacity-10 outline-none py-2 rounded-xl px-2"
        />
        <div className="w-72">
          <Listbox value={selected} onChange={setSelected}>
            <div className="relative mt-1">
              <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-[#9945FF] bg-opacity-10 rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
                <span className="block truncate">
                  {selected ? selected : "Choose Category"}
                </span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <SelectorIcon
                    className="w-5 h-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {categories.map((category, categoryIdx) => (
                    <Listbox.Option
                      key={categoryIdx}
                      className={({ active }) =>
                        `cursor-default select-none relative py-2 pl-10 pr-4 ${
                          active
                            ? "text-amber-900 bg-amber-100"
                            : "text-gray-900"
                        }`
                      }
                      value={category.Category}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {category.Category}
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                              <CheckIcon
                                className="w-5 h-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>
        <button
          onClick={createAd}
          className="border-2 border-[#14F195] p-2 m-4 rounded-lg whitespace-nowrap"
        >
          Confirm
        </button>
        {isUploading && <h1>Uploading</h1>}
      </form>
    </div>
  );
}
