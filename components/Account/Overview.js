import Image from "next/image";
import Uploads from "./Uploads";
export default function Account() {
  return (
    <div className="mt-8 flex flex-col items-center justify-center">
      <Image
        className="object-contain"
        height={75}
        width={125}
        src="https://links.papareact.com/ua6"
      />
      <h1 className="">USERNAME</h1>
      <Uploads />
    </div>
  );
}
