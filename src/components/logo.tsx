import Image from "next/image";
import logo from "../../public/icon.png";

export default function Logo() {
  return <Image alt="logo" src={logo} height={80} width={100} />;
}
