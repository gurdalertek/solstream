export default function MintVideos() {
  function createVideo(e) {
    // prevent default
    alert("create video");
  }
  return (
    <div className=" flex flex-col items-center justify-center my-8">
      <h1 className="mb-8 ">Upload Ads</h1>
      <form className="flex flex-col items-cennter justify-center space-y-8">
        <input
          type={"text"}
          placeholder="Title"
          className="bg-[#9945FF] bg-opacity-10 outline-none py-2 rounded-xl px-2"
        />
        <textarea
          type={"text"}
          placeholder="Description"
          className="bg-[#9945FF] bg-opacity-10 outline-none py-2 rounded-xl px-2"
        />
        <input
          type={"file"}
          className="bg-[#9945FF] bg-opacity-10 outline-none py-2 rounded-xl px-2"
        />
        <button
          onSubmit={createVideo}
          className="border-2 border-[#14F195] p-2 m-4 rounded-lg whitespace-nowrap"
        >
          Confirm
        </button>
      </form>
    </div>
  );
}
