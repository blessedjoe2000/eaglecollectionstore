import logo from "@/public/images/eaglecollectionlogo.png";
import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href={"/"}>
      <Image
        src={logo}
        alt="eagle collections logo"
        width="160"
        className="p-4 bg-black"
      />
    </Link>
  );
}
