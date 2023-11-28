import type { Metadata } from "next";
import { Providers } from "./providers";

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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
