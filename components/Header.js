import Image from "next/image";
import HeaderItem from "./HeaderItem";
import { useMoralis } from "react-moralis";
import {
  CollectionIcon,
  LightningBoltIcon,
  UserIcon,
  HomeIcon,
} from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Header() {
  const { user, isAuthenticated } = useMoralis();
  const [isUser, setIsUser] = useState();

  const router = useRouter();

  useEffect(() => {
    if (user) {
      // setIsUser(user.get("ethAddress"));
    }
  }, []);

  function openHome() {
    router.push("/");
  }
  function openAccount() {
    router.push("/account");
  }

  function openCollection() {
    router.push("/collection");
  }
  function openTrending() {
    router.push("/upload");
  }

  return (
    <header className="flex sticky  overflow-hidden flex-col p-5 sm:flex-row items-center justify-between h-auto">
      <div className="flex flex-grow justify-evenly max-w-2xl">
        <div onClick={openHome} className="">
          <HeaderItem title="HOME" Icon={HomeIcon} />
        </div>
        <div onClick={openTrending} className="">
          <HeaderItem title="UPLOAD" Icon={LightningBoltIcon} />
        </div>

        <div onClick={openCollection} className="">
          <HeaderItem title="COLLECTION" Icon={CollectionIcon} />
        </div>

        <div onClick={openAccount} className="">
          <HeaderItem title="ACCOUNT" Icon={UserIcon} />
        </div>
      </div>
      {/* <Image
        className="object-contain"
        height={75}
        width={125}
        src="https://links.papareact.com/ua6"
      /> */}
      <h1 className="text-white whitespace-nowrap">S O L S T R E A M</h1>
      {isUser ? (
        <button className="border-2 border-[#14F195] p-2 rounded-xl whitespace-nowrap">
          User
        </button>
      ) : (
        <button className="border-2 border-[#14F195] p-2 m-4 rounded-lg whitespace-nowrap">
          Connect User
        </button>
      )}
    </header>
  );
}
