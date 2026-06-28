import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Check,
  CircleDollarSign,
  Crown,
  ExternalLink,
  Gamepad2,
  Mic2,
  PanelsTopLeft,
  RadioTower,
  ShieldCheck,
  Sparkles,
  Trophy,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { FaqList } from "@/components/faq-list";
import { HeroDashboard } from "@/components/hero-dashboard";
import { MotionLayer } from "@/components/motion-layer";
import { PlanCta } from "@/components/plan-cta";
import { ShowcaseSection } from "@/components/showcase-section";
import { SiteHeader } from "@/components/site-header";

const demoUrl = process.env.NEXT_PUBLIC_DEMO_SERVER_URL || "#contact";
const contactDiscord = process.env.NEXT_PUBLIC_CONTACT_DISCORD || "準備中";

const badges = ["月額3,000円〜", "最低契約1ヶ月", "人数追加料金なし", "解約後データ3ヶ月保持", "バグ対応無料"];

const audiences = [
  {
    icon: RadioTower,
    title: "配信者コミュニティ",
    catch: "配信外でも、リスナーが集まる場所へ。",
    text: "通話、雑談、イベント、ランキングで、配信がない日にも常連が戻る導線を作ります。",
  },
  {
    icon: Gamepad2,
    title: "ゲームサーバー",
    catch: "遊ぶ理由が増えるDiscordへ。",
    text: "ランク、報酬、ショップ、イベント導線で、ゲーム外のDiscordにも参加理由を増やします。",
  },
  {
    icon: Crown,
    title: "国家運営・RP",
    catch: "Discord内に、ひとつの国を。",
    text: "独自通貨、ショップ、役職、経済バランスを組み合わせて、世界観のある運用を支えます。",
  },
  {
    icon: Mic2,
    title: "雑談・通話サーバー",
    catch: "暇な時間が、参加したくなる時間に。",
    text: "VCランク、自動VC、寝落ち、相性診断で、通話が始まるきっかけを増やします。",
  },
];

const capabilities: Array<{
  icon: LucideIcon;
  title: string;
  text: string;
  items: string[];
}> = [
  {
    icon: CircleDollarSign,
    title: "経済圏Bot",
    text: "サーバー内に、稼ぐ・使う・集める流れを作るコア機能です。",
    items: ["独自通貨", "デイリー報酬", "送金", "ショップ", "ロール購入", "ランキング", "Jackpot Pool", "Currency Sink"],
  },
  {
    icon: Trophy,
    title: "ランク・活動報酬",
    text: "テキストも通話も、参加が積み上がる体験に変える報酬設計です。",
    items: ["TEXT XP", "VOICE XP", "VC報酬", "VCランク", "活動ランキング", "イベント報酬", "継続導線"],
  },
  {
    icon: ShieldCheck,
    title: "運営支援",
    text: "毎日の管理を軽くして、運営がコミュニティ作りに集中できる仕組みです。",
    items: ["チケット", "ロールパネル", "評価ロール", "自動VC", "投票", "モデレーション", "パネル送信"],
  },
  {
    icon: Mic2,
    title: "通話・体験型Bot",
    text: "話す理由や盛り上がる話題を作る、エンタメ寄りの体験機能です。",
    items: ["寝落ちマッチング", "声診断", "相性診断", "MBTI風表示", "通話イベント補助", "DM送信"],
  },
  {
    icon: PanelsTopLeft,
    title: "Web・Activity",
    text: "Discordログイン、管理画面、Activityまでつなぐ拡張レイヤーです。",
    items: ["Discordログイン", "参加ポータル", "申請フォーム", "ランキングページ", "管理ダッシュボード", "Discord Activity"],
  },
];

const packages = [
  ["配信者コミュニティ向け", "配信外でもリスナーが戻りやすいように、雑談・通話・イベント・ランキングをつなぎます。"],
  ["ゲームサーバー向け", "ランク、報酬、ショップ、ミニゲームで、ゲーム外のDiscordにも遊ぶ理由を作ります。"],
  ["国家運営・RP向け", "独自通貨、役職、ショップ、経済バランスで、Discord内の国や街を運用しやすくします。"],
  ["雑談・通話サーバー向け", "VCランク、自動VC、寝落ち、相性診断で、通話が始まるきっかけを増やします。"],
];

const prices = [
  {
    name: "汎用プラン",
    price: "月額3,000円〜",
    lead: "まずは基本Botから",
    note: "小さく始めたいサーバー向け。",
    items: ["基本Bot導入", "経済機能", "通貨 / デイリー / 送金", "ランク / XP", "VC / TEXT XP", "カジノ風ミニゲーム", "ショップ", "チケット", "基本保守", "バグ対応無料"],
  },
  {
    name: "カスタムプラン",
    price: "月額6,000円〜",
    lead: "世界観に合わせて調整",
    note: "一番相談されやすい標準プラン。",
    highlight: true,
    items: ["汎用プランの内容", "通貨名・報酬量の調整", "ショップ内容の調整", "Game Balance調整", "VC / TEXTランク調整", "独自コマンド2つまで無料", "専用サーバーまたはDMで相談"],
  },
  {
    name: "運用強化プラン",
    price: "月額9,800円〜",
    lead: "成長中サーバー向け",
    note: "運用しながら改善したい方向け。",
    items: ["カスタムプランの内容", "定期的な経済バランス調整", "イベント設計相談", "通話・寝落ち・相性系の相談", "優先対応", "独自コマンド4つまで無料", "運用提案"],
  },
  {
    name: "オーダーメイド",
    price: "初期20,000円〜",
    lead: "+ 月額保守3,000円〜",
    note: "WebやActivityまで作りたい方向け。",
    items: ["Discord連携Web", "Discord Activity", "声診断 / 相性診断Bot", "専用Bot", "管理ダッシュボード", "外部API連携", "独自ゲーム", "世界観ログインページ"],
  },
];

const reassurance = [
  ["小さく始められる", "最低契約1ヶ月。まずは小さく試せます。"],
  ["人数追加料金なし", "サーバー人数による追加料金は基本ありません。"],
  ["データ保持", "解約後もデータを3ヶ月保持します。"],
  ["バグ対応無料", "こちらの不具合は無料で対応します。"],
  ["換金不可設計", "カジノ風ミニゲームは、現実のお金や景品と連動しないゲーム内通貨で提供します。"],
  ["相談しやすい運用", "DMまたは専用サーバーで相談できます。緊急対応・夜間対応は可能な範囲で対応します。"],
];

const steps = [
  ["01", "無料相談", "ジャンル、人数、やりたい世界観をヒアリングします。"],
  ["02", "プラン提案", "必要な機能と運用負荷に合わせて、無理のない構成を提案します。"],
  ["03", "初期設定", "通貨名、報酬、ランク、ショップ、パネルを設定します。"],
  ["04", "テスト運用", "導入前に、デモサーバーやテスト環境で動きを確認できます。"],
  ["05", "本運用開始", "運用しながら、必要に応じて相談・改善します。"],
];

const faqs: Array<[string, string]> = [
  ["初心者でも導入できますか？", "はい。初期設定や導入はサポートします。サーバーの目的や雰囲気を聞いたうえで、必要な機能を一緒に決めます。"],
  ["サーバー人数で料金は変わりますか？", "基本的に人数による追加料金はありません。ただし、極端な高負荷運用や特殊な常時処理が必要な場合は、事前に相談します。"],
  ["最低契約期間はありますか？", "最低契約期間は1ヶ月です。まずは小さく試したいサーバーでも導入しやすいようにしています。"],
  ["解約後のデータはどうなりますか？", "解約後、データは原則3ヶ月保持します。保持期間内であれば、再契約時に復旧できる場合があります。"],
  ["バグが出た場合はどうなりますか？", "こちらの実装ミスや設定ミスによる不具合は無料で対応します。仕様変更や追加要望は別途相談となります。"],
  ["独自コマンドの追加はできますか？", "可能です。カスタムプラン以上では、独自コマンド追加を一定数まで無料で対応します。"],
  ["Webサイトやログインページも作れますか？", "可能です。Discordログイン、参加ポータル、ランキング、診断結果ページ、管理画面なども制作できます。"],
  ["Discord Activityも作れますか？", "可能です。Discord内で遊べるミニゲームや体験型コンテンツを、オーダーメイドで制作できます。"],
  ["カジノ風機能はありますか？", "あります。ただし、現実のお金や景品とは連動しない、換金不可のゲーム内通貨を使ったエンタメ機能として提供します。"],
  ["支払い方法は何がありますか？", "PayPay、銀行振込に対応予定です。その他の方法はご相談ください。"],
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-void text-white">
      <MotionLayer />
      <SiteHeader />
      <Hero />
      <ShowcaseSection />

      <Section id="audience" eyebrow="Guild Types" title="サーバーの空気に合わせて、参加理由を設計します">
        <div className="grid gap-4 md:grid-cols-2">
          {audiences.map((audience) => (
            <article key={audience.title} className="group interactive-card relative overflow-hidden rounded-2xl border border-slate-400/15 bg-white/[0.045] p-6" data-reveal>
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-discord/60 to-transparent" />
              <div className="flex items-start gap-4">
                <div className="rounded-2xl border border-discord/25 bg-discord/10 p-3 text-cyan">
                  <audience.icon size={24} strokeWidth={2.2} />
                </div>
                <div>
                  <p className="text-sm font-black uppercase text-slate-500">{audience.title}</p>
                  <h3 className="mt-2 text-2xl font-black leading-tight">{audience.catch}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-300">{audience.text}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <section id="features" className="section-shell relative border-y border-slate-400/10 bg-[#071225]">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
            <div className="lg:sticky lg:top-28" data-reveal>
              <p className="text-sm font-black uppercase text-cyan">Bot / Web / Activity</p>
              <h2 className="mt-3 text-3xl font-black leading-tight sm:text-4xl">遊び・交流・運営が自然に回るDiscordへ。</h2>
              <p className="mt-5 leading-8 text-slate-300">
                機能をただ並べるのではなく、通貨、ランク、通話、管理、Webをつなげて、サーバーの雰囲気に合う仕組みとして設計します。
              </p>
            </div>
            <div className="grid gap-4">
              {capabilities.map((category) => (
                <article key={category.title} className="feature-panel" data-reveal>
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] text-cyan shadow-glow">
                      <category.icon size={24} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black">{category.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-slate-400">{category.text}</p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {category.items.map((item) => (
                          <span key={item} className="rounded-full border border-slate-400/15 bg-black/20 px-3 py-2 text-xs font-bold text-slate-200">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Section id="packages" eyebrow="Use Cases" title="小さく始めて、必要に応じて育てていけます。">
        <div className="grid gap-4 md:grid-cols-2">
          {packages.map(([title, text], index) => (
            <article key={title} className="interactive-card relative overflow-hidden rounded-2xl border border-slate-400/15 bg-gradient-to-br from-white/[0.06] to-white/[0.025] p-6" data-reveal>
              <p className="text-xs font-black text-cyan">0{index + 1}</p>
              <h3 className="mt-4 text-2xl font-black">{title}</h3>
              <p className="mt-4 leading-7 text-slate-300">{text}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section id="trust" eyebrow="Trust" title="安心して相談できる理由">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {reassurance.map(([title, text]) => (
            <article key={title} className="rounded-2xl border border-slate-400/15 bg-white/[0.045] p-6" data-reveal>
              <ShieldCheck className="text-cyan" size={22} />
              <h3 className="mt-4 text-xl font-black">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">{text}</p>
            </article>
          ))}
        </div>
      </Section>

      <section id="pricing" className="section-shell relative bg-[#030711]">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 max-w-3xl" data-reveal>
            <p className="text-sm font-black uppercase text-cyan">Pricing</p>
            <h2 className="mt-3 text-3xl font-black leading-tight sm:text-4xl">わかりやすい月額から、必要な分だけ。</h2>
            <p className="mt-5 leading-8 text-slate-400">価格は大きく見せつつ、無理に煽らない構成にしています。正式な金額は導入内容に応じて事前に提示します。</p>
          </div>
          <div className="grid gap-4 lg:grid-cols-4">
            {prices.map((plan) => (
              <article key={plan.name} className={plan.highlight ? "price-card price-card-featured" : "price-card"} data-reveal>
                {plan.highlight ? (
                  <div className="mb-4 inline-flex rounded-full border border-discord/40 bg-discord/10 px-3 py-1 text-xs font-black text-cyan">
                    おすすめ
                  </div>
                ) : null}
                <p className="text-sm font-black text-slate-400">{plan.lead}</p>
                <h3 className="mt-3 text-2xl font-black">{plan.name}</h3>
                <p className="mt-5 text-3xl font-black leading-tight text-white">{plan.price}</p>
                <p className="mt-3 text-sm leading-6 text-slate-500">{plan.note}</p>
                <ul className="mt-7 space-y-3 text-sm leading-6 text-slate-300">
                  {plan.items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-cyan" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <PlanCta plan={plan.name}>{planCtaLabel(plan.name)}</PlanCta>
              </article>
            ))}
          </div>
          <p className="mt-4 text-sm leading-7 text-slate-500">
            極端な高負荷運用や特殊な常時処理が必要な場合は事前相談となります。
          </p>
        </div>
      </section>

      <Section id="demo" eyebrow="Demo Server" title="導入前に、デモサーバーで動きを確認できます。">
        <div className="relative overflow-hidden rounded-3xl border border-discord/25 bg-gradient-to-br from-discord/10 via-white/[0.045] to-cyan/10 p-6 sm:p-8" data-reveal>
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <p className="max-w-3xl leading-8 text-slate-300">
              通貨、ランキング、カジノ風ミニゲーム、VC報酬、ショップ、診断系機能などを体験できます。デモURLは環境変数 <code className="text-cyan">NEXT_PUBLIC_DEMO_SERVER_URL</code> から設定できます。
            </p>
            <a href={demoUrl} className="inline-flex items-center justify-center gap-2 rounded-xl border border-discord/35 bg-discord/10 px-6 py-4 text-sm font-black text-white transition hover:bg-discord/15">
              デモサーバーを見る
              <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </Section>

      <Section id="flow" eyebrow="Launch Flow" title="相談から本運用まで、迷わず進めます">
        <div className="grid gap-3 md:grid-cols-5">
          {steps.map(([step, title, text]) => (
            <article key={step} className="step-card interactive-card" data-reveal>
              <p className="font-mono text-sm font-black text-cyan">{step}</p>
              <h3 className="mt-5 text-xl font-black">{title}</h3>
              <p className="mt-4 text-sm leading-7 text-slate-400">{text}</p>
            </article>
          ))}
        </div>
      </Section>

      <section id="faq" className="bg-[#071225] px-5 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8">
            <p className="text-sm font-black uppercase text-cyan">FAQ</p>
            <h2 className="mt-3 text-3xl font-black leading-tight sm:text-4xl">よくある質問</h2>
          </div>
          <FaqList faqs={faqs} />
        </div>
      </section>

      <section id="contact" className="relative px-5 py-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm font-black uppercase text-cyan">Consulting</p>
            <h2 className="mt-3 text-3xl font-black leading-tight sm:text-4xl">まずは、やりたいことを聞かせてください。</h2>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              内容が固まっていなくても大丈夫です。「こういうサーバーにしたい」「今ここで困っている」くらいから相談できます。
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
            <aside className="rounded-3xl border border-slate-400/15 bg-white/[0.045] p-6">
              <div className="flex items-center gap-3 text-cyan">
                <Bot size={26} />
                <p className="text-sm font-black uppercase">Before sending</p>
              </div>
              <ul className="mt-6 space-y-4 text-sm leading-7 text-slate-300">
                <li>サーバー人数、ジャンル、欲しい機能がざっくりでも分かると提案しやすいです。</li>
                <li>Discord IDまたは連絡先のどちらかは必須です。</li>
                <li>連絡先 Discord: {contactDiscord}</li>
              </ul>
            </aside>
            <ContactForm />
          </div>
        </div>
      </section>

      <Section id="notes" eyebrow="Notes" title="安心して使うための注意事項">
        <div className="grid gap-4 lg:grid-cols-3">
          <Notice title="カジノ風ミニゲームについて">
            換金不可のゲーム内通貨で楽しむコミュニティ機能です。現実のお金、景品、換金性のある報酬とは連動しません。
          </Notice>
          <Notice title="音声診断・相性診断について">
            通話を盛り上げるためのエンタメ機能です。性格、能力、心理状態、健康状態、科学的な相性を断定するものではありません。
          </Notice>
          <Notice title="サポートについて">
            緊急対応・夜間対応は可能な範囲で対応しますが、即時対応を保証するものではありません。
          </Notice>
        </div>
      </Section>

      <Footer />
      <a href="#contact" className="mobile-bottom-cta">無料相談する</a>
    </main>
  );
}

function Hero() {
  return (
    <section id="top" className="relative px-5 pb-20 pt-14 sm:px-8 sm:pt-20 lg:px-12">
      <div className="grid-bg absolute inset-0" aria-hidden="true" />
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(30,136,255,0.13),transparent_32%,rgba(56,189,248,0.08)_68%,transparent)]" aria-hidden="true" />
      <div className="relative mx-auto grid min-h-[calc(100vh-88px)] max-w-6xl items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-discord/35 bg-discord/10 px-4 py-2 text-xs font-black uppercase text-cyan">
            <Sparkles size={15} />
            Botix / Discord Bots. Built Better.
          </div>
          <h1 className="max-w-4xl text-[2.8rem] font-black leading-[1.04] tracking-tight text-white sm:text-6xl lg:text-[4.6rem]">
            Discordコミュニティに、
            <span className="block bg-gradient-to-r from-white via-cyan to-discord bg-clip-text text-transparent">続く仕組みを。</span>
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
            独自通貨、ランク、VC報酬、ショップ、通話体験、Discord連携Webまで。
            サーバーの雰囲気に合わせて、遊び・交流・運営が自然に回る仕組みを作ります。
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#contact" className="neon-button">
              無料相談する
              <ArrowRight size={18} />
            </a>
            <a href={demoUrl} className="secondary-button">
              デモを見る
              <ExternalLink size={17} />
            </a>
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {badges.map((badge) => (
              <span key={badge} className="rounded-full border border-slate-400/15 bg-white/[0.045] px-3 py-2 text-[11px] font-bold text-slate-300 sm:text-xs">
                {badge}
              </span>
            ))}
          </div>
        </div>
        <HeroDashboard />
      </div>
    </section>
  );
}

function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="section-shell">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 max-w-3xl" data-reveal>
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="section-title">{title}</h2>
        </div>
        {children}
      </div>
    </section>
  );
}

function planCtaLabel(name: string) {
  if (name === "汎用プラン") return "汎用プランで相談";
  if (name === "カスタムプラン") return "カスタムプランで相談";
  if (name === "運用強化プラン") return "運用強化を相談";
  return "オーダーメイドを相談";
}

function Notice({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <article className="rounded-2xl border border-slate-400/15 bg-white/[0.045] p-6">
      <h3 className="text-xl font-black">{title}</h3>
      <p className="mt-4 text-sm leading-7 text-slate-300">{children}</p>
    </article>
  );
}

function Footer() {
  const links = [
    ["料金", "#pricing"],
    ["制作例", "#showcase"],
    ["FAQ", "#faq"],
    ["申し込み", "#contact"],
    ["デモサーバー", "#demo"],
    ["利用規約", "/terms"],
    ["プライバシーポリシー", "/privacy"],
    ["特定商取引法に基づく表記", "/legal"],
    ["連絡先", "#contact"],
  ];

  return (
    <footer className="border-t border-slate-400/15 bg-[#030711] px-5 py-10 sm:px-8 lg:px-12">
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[1fr_auto]">
        <div>
          <div className="flex items-center gap-3">
            <span className="relative h-12 w-12 overflow-hidden rounded-xl border border-discord/25 bg-[#071225]">
              <Image src="/brand/botix-logo.png" alt="Botix" fill sizes="48px" className="object-cover" />
            </span>
            <div>
              <p className="text-lg font-black">Botix</p>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan">Discord Bots. Built Better.</p>
            </div>
          </div>
          <p className="mt-4 max-w-xl text-sm leading-7 text-slate-400">
            Discordコミュニティ向けのBot、Web、Activityを丁寧に制作する小規模開発スタジオです。
          </p>
        </div>
        <div className="flex flex-wrap gap-3 text-sm font-bold text-slate-300 md:justify-end">
          {links.map(([label, href]) => (
            <Link key={label} href={href} className="rounded-lg border border-slate-400/15 px-3 py-2 hover:border-discord/45 hover:text-white">
              {label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
