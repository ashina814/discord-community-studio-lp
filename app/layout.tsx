import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Discord Community Studio",
  description:
    "Discordコミュニティ向けBot・Web・Activity開発サービス。経済圏、ランク、VC報酬、Web連携まで相談できます。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
