import Providers from "@/providers/providers";
import type { Metadata } from "next";
import { Roboto_Flex } from "next/font/google";
import "./globals.css";

const roboto_Flex = Roboto_Flex({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "understand it",
  description:
    "Visit rebakure.com to explore things I'm learning and building.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="cupcake">
      <Providers>
        <body className={`${roboto_Flex.className} antialiased`}>
          {children}
        </body>
      </Providers>
    </html>
  );
}
