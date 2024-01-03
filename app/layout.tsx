import type { Metadata } from "next";
import { Providers } from "./providers";
import { Box, Heading, Image } from "@chakra-ui/react";
import Link from "next/link";

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
    <html lang="en">
      <body>
        <Providers>
          <Box
            width="100vw"
            height="52px"
            flexDir="row"
            display="flex"
            alignItems="center"
            paddingX="24px"
            bgGradient="linear(to-r, #ff7427, #ffc002)"
          >
            <Image src="/icons/kainuri-white.svg" height="24px" alt="kainuri" />
            <Link href="/">
              <Heading size="md" color="white" ms="24px">
                KAIST Vision
              </Heading>
            </Link>
            <Box flex="1" />
            <Link href="https://kaist.ac.kr" target="_blank">
              <Heading size="md" color="white" px="24px">
                KAIST
              </Heading>
            </Link>
            <Link href="https://admission.kaist.ac.kr" target="_blank">
              <Heading size="md" color="white" px="24px">
                입학처
              </Heading>
            </Link>
            <Link href="https://kainuri.kaist.ac.kr" target="_blank">
              <Heading size="md" color="white" px="24px">
                카이누리
              </Heading>
            </Link>
          </Box>
          {children}
        </Providers>
      </body>
    </html>
  );
}
