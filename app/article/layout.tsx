import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Image,
} from "@nextui-org/react";
import Link from "next/link";
import { ThemeSwitch } from "../../components/theme-switch";
import { Links } from "../../utils/utils";

type Props = { children: React.ReactNode };

export default function Layout({ children }: Props) {
  return (
    <>
      <Navbar isBordered>
        <NavbarBrand>
          <Link
            href="/"
            style={{
              display: "flex",
              flexDirection: "row",
              alignContent: "center",
            }}
          >
            <Image
              src="/icons/kainuri-black.svg"
              height="36px"
              width="36px"
              alt="kainuri"
              style={{ borderRadius: "0" }}
            />
            <p className="font-bold text-inherit ms-4">KAIST Vision</p>
          </Link>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link href={Links.kaist} target="_blank">
              KAIST
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href={Links.kaistAdmission} target="_blank">
              입학처
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href={Links.kainuri} target="_blank">
              카이누리
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <ThemeSwitch />
        </NavbarContent>
      </Navbar>
      {children}
    </>
  );
}
