import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Botix | Discord Bots. Built Better.",
  description:
    "BotixはDiscordコミュニティ向けのBot、Web、Activityを制作する小規模開発スタジオです。経済圏、ランク、VC報酬、運営支援、Discord連携Webまで相談できます。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Unbounded:wght@400;500;600;700;800&family=Space+Mono:wght@400;700&family=Noto+Sans+JP:wght@400;500;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
