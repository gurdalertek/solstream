export default function Results() {
  function openWindow() {
    //execute window opener
    alert("openWindow");
  }
  return (
    <div
      onClick={openWindow}
      className="border-[#14F195] border-2 cursor-pointer rounded-lg bg-black w-96 h-64 flex flex-col"
    >
      <h1 className="py-1 pl-1 border-b bg-[#2c3531] rounded-t-lg border-[#14F195]">
        TITLE
      </h1>
      <p className="flex items-center justify-center h-full text-[#9945FF]">
        CONTENT
      </p>
      <p className="py-1 pl-1 border-t bg-[#2c3531] rounded-b-lg border-[#14F195]">
        CREATOR
      </p>
    </div>
  );
}
