import type { Metadata } from "next";
import { Archivo_Black, Work_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const archivoBlack = Archivo_Black({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
});

const workSans = Work_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-meta",
  subsets: ["latin"],
  weight: ["500", "600"],
});

export const metadata: Metadata = {
  title: "The Halal Money Masterclass — Abu Lahya",
  description:
    "100% halal. No face, no audience, no products. Just email. Free live session, July 12, 2:00 PM ET / 7:00 PM UK. 1,847+ brothers already registered.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${archivoBlack.variable} ${workSans.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink font-body">
        {children}
      </body>
    </html>
  );
}
