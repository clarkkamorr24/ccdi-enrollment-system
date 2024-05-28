import Image from "next/image";
import logo from "../../public/icon.png";

export default function Logo() {
  return <Image alt="logo" src={logo} width={70} />;
}
