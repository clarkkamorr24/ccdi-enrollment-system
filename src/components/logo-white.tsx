import Image from "next/image";
import logo from "../../public/icon-white.png";

export default function LogoWhite() {
  return <Image alt="logo" src={logo} height={45} width={45} />;
}
