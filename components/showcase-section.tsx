"use client";

import Image from "next/image";
import { ExternalLink, X } from "lucide-react";
import { useEffect, useState } from "react";

type ShowcaseItem = {
  title: string;
  image: string;
  text: string;
  scene: string;
  tags: string[];
};

const showcases: ShowcaseItem[] = [
  {
    title: "Discord操作パネル",
    image: "/showcase/panel.png",
    text: "ロール、チケット、告知、イベント導線を、管理者が迷わず扱える画面に整理します。",
    scene: "運営メンバーが日常的に触る管理導線をまとめたいサーバー向け。",
    tags: ["Bot", "Panel", "Admin"],
  },
  {
    title: "経済チューニング",
    image: "/showcase/economy-settings.png",
    text: "報酬量、通貨回収、ショップ価格を見ながら、遊びやすい経済バランスに調整します。",
    scene: "独自通貨やショップを長く遊べる状態にしたいサーバー向け。",
    tags: ["Economy", "Rank", "Balance"],
  },
  {
    title: "声診断・相性診断",
    image: "/showcase/voice-diagnosis.png",
    text: "通話のきっかけになる診断コンテンツを、エンタメ機能として実装します。",
    scene: "雑談・通話サーバーで、初対面でも話題が生まれる仕組みが欲しいとき。",
    tags: ["Voice", "Bot", "Community"],
  },
  {
    title: "Discord連携Web",
    image: "/showcase/web-login.png",
    text: "Discordログイン、ランキング、申請フォーム、診断結果ページなどをWeb化します。",
    scene: "サーバー外にも世界観や参加導線を広げたいサーバー向け。",
    tags: ["Web", "Login", "Portal"],
  },
  {
    title: "Activity / ミニゲーム",
    image: "/showcase/activity.png",
    text: "Discord内で遊べるミニゲームやイベント用Activityを、目的に合わせて制作します。",
    scene: "イベント日やVC中に、みんなで触れる体験が欲しいとき。",
    tags: ["Activity", "Game", "Event"],
  },
];

export function ShowcaseSection() {
  const [selected, setSelected] = useState(0);
  const [active, setActive] = useState<ShowcaseItem | null>(null);
  const item = showcases[selected];

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section id="showcase" className="section-shell bg-[#030711]">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 max-w-3xl" data-reveal>
          <p className="eyebrow">Showcase</p>
          <h2 className="section-title">実際に、こういう体験を作れます。</h2>
          <p className="section-copy">
            Botの操作パネル、経済設定、診断結果、Discord連携Webなど、導入後の利用シーンが見える画面を中心に紹介します。
          </p>
        </div>
        <div className="mb-5 flex gap-2 overflow-x-auto pb-2" data-reveal>
          {showcases.map((showcase, index) => (
            <button
              key={showcase.title}
              type="button"
              onClick={() => setSelected(index)}
              className={selected === index ? "showcase-tab showcase-tab-active" : "showcase-tab"}
            >
              {showcase.title}
            </button>
          ))}
        </div>
        <article className="showcase-card" data-reveal>
          <button type="button" onClick={() => setActive(item)} className="showcase-media" aria-label={`${item.title}を拡大表示`}>
            <ShowcaseImage item={item} />
          </button>
          <div className="p-6 sm:p-8">
            <div className="mb-4 flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <span key={tag} className="tag-pill">
                  {tag}
                </span>
              ))}
            </div>
            <h3 className="text-2xl font-black">{item.title}</h3>
            <p className="mt-4 leading-8 text-slate-300">{item.text}</p>
            <p className="mt-4 text-sm leading-7 text-slate-500">{item.scene}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button type="button" onClick={() => setActive(item)} className="secondary-button px-5 py-3">
                詳しく見る
              </button>
              <a href="#demo" className="inline-flex items-center gap-2 rounded-xl border border-discord/35 bg-discord/10 px-5 py-3 text-sm font-black text-white transition hover:bg-discord/15">
                デモを見る
                <ExternalLink size={15} />
              </a>
            </div>
          </div>
        </article>
      </div>

      {active ? (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 p-4 backdrop-blur-md" onClick={() => setActive(null)}>
          <div className="modal-panel" onClick={(event) => event.stopPropagation()}>
            <button type="button" onClick={() => setActive(null)} className="absolute right-4 top-4 z-10 rounded-full border border-white/[0.08] bg-white/[0.08] p-2 text-slate-300 hover:text-white" aria-label="閉じる">
              <X size={18} />
            </button>
            <ShowcaseImage item={active} modal />
            <div className="p-6">
              <div className="mb-4 flex flex-wrap gap-2">
                {active.tags.map((tag) => (
                  <span key={tag} className="tag-pill">
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="text-2xl font-black">{active.title}</h3>
              <p className="mt-4 leading-8 text-slate-300">{active.text}</p>
              <p className="mt-3 text-sm leading-7 text-slate-500">活用できるサーバー例: {active.scene}</p>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

function ShowcaseImage({ item, modal }: { item: ShowcaseItem; modal?: boolean }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={modal ? "showcase-image showcase-image-modal" : "showcase-image"}>
      {!failed ? (
        <Image src={item.image} alt={`${item.title}のスクリーンショット`} fill sizes="(max-width: 768px) 100vw, 560px" className="object-cover" onError={() => setFailed(true)} />
      ) : (
        <div className="placeholder-screen">
          <div className="mb-5 flex gap-2">
            <span />
            <span />
            <span />
          </div>
          <p className="text-xs font-black uppercase text-cyan">{item.tags.join(" / ")}</p>
          <p className="mt-3 text-2xl font-black text-white">{item.title}</p>
          <div className="mt-6 grid gap-3">
            <i className="w-11/12" />
            <i className="w-4/5" />
            <i className="w-10/12" />
          </div>
          <div className="mt-6 grid grid-cols-3 gap-2">
            <b />
            <b />
            <b />
          </div>
        </div>
      )}
    </div>
  );
}
