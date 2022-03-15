import { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { useMoralis, useMoralisFile } from "react-moralis";

export default function MintVideos() {
  const { Moralis } = useMoralis();
  const { saveFile } = useMoralisFile();

  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState();

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

  async function createVideo(e) {
    e.preventDefault();

    setIsUploading(true);

    const videoTitle = document.getElementById("videoTitle").value;
    const videoDescription = document.getElementById("videoDescription").value;
    const videoFile = document.getElementById("videoFile").files[0];
    const pictureFile = document.getElementById("pictureFile").files[0];
    const selectedCategory = selected;

    let ipfsVideo = "";
    let ipfsThumbnail = "";

    if (videoFile) {
      console.log("uploading file");
      console.log(videoFile);
      await saveFile("video", videoFile, { saveIPFS: true }).then(
        async (hash) => {
          console.log(hash);
          ipfsVideo = hash._ipfs;
        }
      );
    }
    if (pictureFile) {
      console.log("uploading file");
      await saveFile("thumbnail", pictureFile, { saveIPFS: true }).then(
        async (hash) => {
          console.log(hash);
          ipfsThumbnail = hash._ipfs;
        }
      );
    }

    const metadata = {
      name: videoTitle,
      content: ipfsVideo,
      thumbnail: ipfsThumbnail,
      description: videoDescription,
      category: selectedCategory,
    };

    const metadataFile = new Moralis.File("metadata.json", {
      base64: btoa(JSON.stringify(metadata)),
    });

    await metadataFile.saveIPFS();
    const metadataURI = metadataFile.ipfs();

    const VideoContent = new Moralis.Object.extend("VideoContent");
    const videoContent = new VideoContent();

    const ChannelCategory = Moralis.Object.extend("ChannelCategory");
    const category = new ChannelCategory();
    category.set("objectId", selectedId[selected]);

    videoContent.set("videoTitle", videoTitle);
    videoContent.set("videoDescription", videoDescription);
    videoContent.set("videoFile", ipfsVideo);
    videoContent.set("pictureFile", ipfsThumbnail);
    videoContent.set("category", category);
    videoContent.save().then((object) => {
      // contractCall(object);
      setIsUploading(false);

      alert("saved, you can safely exit the page now.");
    });
  }

  return (
    <div className=" flex flex-col items-center justify-center my-8">
      <h1 className="mb-8 ">Upload Video</h1>
      <form className="flex flex-col items-center w-full justify-center space-y-8">
        <input
          id={"videoTitle"}
          type={"text"}
          placeholder="Title"
          className="bg-[#9945FF] w-full bg-opacity-10 outline-none py-2 rounded-xl px-2"
        />
        <textarea
          id={"videoDescription"}
          type={"text"}
          placeholder="Description"
          className="bg-[#9945FF] w-full bg-opacity-10 outline-none py-2 rounded-xl px-2"
        />
        <div>
          <p>Video Content</p>
          <input
            id="videoFile"
            type={"file"}
            className="bg-[#9945FF] bg-opacity-10 outline-none py-2 rounded-xl px-2"
          />
        </div>
        <div>
          <p>Thumbnail</p>
          <input
            id="pictureFile"
            type={"file"}
            className="bg-[#9945FF] bg-opacity-10 outline-none py-2 rounded-xl px-2"
          />
        </div>
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
          // onSubmit={createVideo}
          onClick={createVideo}
          className="border-2 border-[#14F195] p-2 m-4 rounded-lg whitespace-nowrap"
        >
          Confirm
        </button>
        {isUploading && <h1>Uploading</h1>}
      </form>
    </div>
  );
}
