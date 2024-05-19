import "./globals.css";
import type { Metadata } from "next";
import { Providers } from "./providers";
import Link from "next/link";
import { GoogleAnalytics } from "@next/third-parties/google";
import {
  Image,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { ThemeSwitch } from "../components/theme-switch";

export const metadata: Metadata = {
  title: "KAIST Vision",
  description: "카이누리가 만드는 카이스트 웹진",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light">
      <body>
        <Providers>
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
                <Link href="https://kaist.ac.kr" target="_blank">
                  KAIST
                </Link>
              </NavbarItem>
              <NavbarItem>
                <Link href="https://admission.kaist.ac.kr" target="_blank">
                  입학처
                </Link>
              </NavbarItem>
              <NavbarItem>
                <Link href="https://kainuri.kaist.ac.kr" target="_blank">
                  카이누리
                </Link>
              </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
              <ThemeSwitch />
            </NavbarContent>
          </Navbar>
          {children}
        </Providers>
        <GoogleAnalytics gaId="G-S5XHBJF9N1" />
      </body>
    </html>
  );
}
