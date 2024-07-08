import "./globals.css";
import type { Metadata } from "next";
import { Providers } from "./providers";
import { GoogleAnalytics } from "@next/third-parties/google";
import styles from "./layout.module.css";

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
          {children}
          <footer className={styles.footer}>
            <div className={styles.footerContent}>
              <p>
                우)34141 대전광역시 유성구 대학로 291 KAIST, 창의학습관(E11)
                505호
              </p>
              <p>
                COPYRIGHT (C) {new Date().getFullYear()} by KAIST Student
                Ambassador KAINURI. ALL RIGHTS RESERVED.
              </p>
            </div>
          </footer>
        </Providers>
        <GoogleAnalytics gaId="G-S5XHBJF9N1" />
      </body>
    </html>
  );
}
