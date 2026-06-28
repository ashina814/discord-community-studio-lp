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
      <body>{children}</body>
    </html>
  );
}
