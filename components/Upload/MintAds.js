import { useMoralis } from "react-moralis";

export default function MintVideos() {
  const { Moralis } = useMoralis();

  async function createAd(e) {
    e.preventDefault();
    const adTitle = document.getElementById("adTitle").value;
    const adDescription = document.getElementById("adDescription").value;
    const adLink = document.getElementById("link").value;

    const metadata = {
      name: adTitle,
      description: adDescription,
      hyperlink: adLink,
    };

    const metadataFile = new Moralis.File("metadata.json", {
      base64: btoa(JSON.stringify(metadata)),
    });

    await metadataFile.saveIPFS();
    const metadataURI = metadataFile.ipfs();

    const AdContent = new Moralis.Object.extend("AdContent");
    const adContent = new AdContent();

    adContent.set("adTitle", adTitle);
    adContent.set("adDescription", adDescription);
    adContent.set("link", adLink);
    adContent.save().then((object) => {
      // contractCall(object);
      alert("saved");
    });
  }

  return (
    <div className=" flex flex-col items-center justify-center my-8">
      <h1 className="mb-8">Upload Advertisement</h1>
      <form className="flex flex-col items-cennter justify-center space-y-8">
        <input
          id={"adTitle"}
          type={"text"}
          placeholder="Title"
          className="bg-[#9945FF] bg-opacity-10 outline-none py-2 rounded-xl px-2"
        />
        <input
          id={"link"}
          type={"text"}
          placeholder="Weblink"
          className="bg-[#9945FF] bg-opacity-10 outline-none py-2 rounded-xl px-2"
        />
        <textarea
          id={"adDescription"}
          type={"text"}
          placeholder="Description"
          className="bg-[#9945FF] bg-opacity-10 outline-none py-2 rounded-xl px-2"
        />
        <button
          onClick={createAd}
          className="border-2 border-[#14F195] p-2 m-4 rounded-lg whitespace-nowrap"
        >
          Confirm
        </button>
      </form>
    </div>
  );
}
