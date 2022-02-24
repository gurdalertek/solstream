import requests from "../utils/requests";
import { useRouter } from "next/router";

export default function Navbar() {
  const router = useRouter();

  function navigate() {
    router.push(`/?genre=${key}`);
  }

  return (
    <nav className="relative">
      <div className="flex px-10 sm:px-20 text-lg whitespace-nowrap space-x-10 bg-[#14F195] my-2 sm:space-x-20 overflow-x-scroll scrollbar-hide">
        {Object.entries(requests).map(([key, { title, url }]) => (
          <h2
            key={key}
            onClick={navigate}
            className="cursor-pointer hover:text-black transition duration-100 my-2 transform hover:scale-125 text-[#2c3531] active:text-teal-400"
          >
            {title}
          </h2>
        ))}
      </div>
      <div className="absolute top-0 right-0 bg-gradient-to-l from-[#14F195] h-10 w-1/12" />
    </nav>
  );
}
