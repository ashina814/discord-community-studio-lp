import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { FaqList } from "@/components/faq-list";
import { HeroConsole } from "@/components/hero-console";
import { MotionLayer } from "@/components/motion-layer";
import { PlanCta } from "@/components/plan-cta";
import { SiteHeader } from "@/components/site-header";
import { publicPath } from "@/lib/public-path";

const demoUrl = process.env.NEXT_PUBLIC_DEMO_SERVER_URL || "#contact";
const contactDiscord = process.env.NEXT_PUBLIC_CONTACT_DISCORD || "準備中";

const heroStats = [
  ["150+", "FEATURES"],
  ["3,000円〜", "MONTHLY"],
  ["Bot · Web · Activity", "BUILD SCOPE"],
];

const marquee = [
  "独自通貨",
  "VCランク",
  "ショップ",
  "寝落ちマッチング",
  "相性診断",
  "Discord Activity",
  "Jackpot Pool",
  "自動VC",
  "管理ダッシュボード",
  "デイリー報酬",
  "ロールパネル",
  "声診断",
];

const audiences = [
  {
    label: "STREAMER",
    title: "配信外でも、リスナーが集まる場所へ。",
    text: "配信がない日にも、通話・ランキング・報酬がゆるく回り続ける導線を作ります。",
  },
  {
    label: "GAMING",
    title: "遊ぶ理由が増えるDiscordへ。",
    text: "VC報酬、ランク、ショップ、イベント導線で、ゲーム外の時間にも参加理由を増やします。",
  },
  {
    label: "NATION / RP",
    title: "Discord内に、ひとつの国を。",
    text: "独自通貨、役職、ショップ、経済バランスを組み合わせ、世界観のある運営を支えます。",
  },
  {
    label: "VOICE",
    title: "暇な時間が、参加したくなる時間に。",
    text: "寝落ちマッチング、声診断、相性診断、自動VCで、通話が始まるきっかけを作ります。",
  },
];

const capabilities = [
  {
    title: "経済圏Bot",
    text: "稼ぐ、使う、集める流れをサーバー内に作るコア機能です。",
    tags: ["独自通貨", "デイリー報酬", "ショップ", "送金", "Currency Sink", "Jackpot Pool", "Game Balance"],
  },
  {
    title: "ランク・活動報酬",
    text: "テキストも通話も、参加が積み上がる体験に変える報酬設計です。",
    tags: ["TEXT XP", "VOICE XP", "VC報酬", "活動ランキング", "イベント報酬", "継続導線"],
  },
  {
    title: "運営支援",
    text: "管理作業を軽くし、運営がコミュニティ作りに集中できるようにします。",
    tags: ["チケット", "ロールパネル", "自動VC", "投票", "評価ロール", "パネル送信"],
  },
  {
    title: "通話・体験型Bot",
    text: "話す理由や盛り上がる話題を作る、エンタメ寄りの体験機能です。",
    tags: ["寝落ちマッチング", "声診断", "相性診断", "MBTI風表示", "通話イベント補助"],
  },
  {
    title: "Web・Activity",
    text: "Discordログイン、管理画面、Activityまでつなぐ拡張レイヤーです。",
    tags: ["Discordログイン", "参加ポータル", "ランキングページ", "管理ダッシュボード", "Discord Activity"],
  },
];

const showcase = [
  {
    label: "[ economy dashboard ]",
    title: "経済チューニング画面",
    text: "通貨の流通量、消費先、ランキングを見ながら、サーバーの空気に合わせてGame Balanceを調整します。",
  },
  {
    label: "[ role panel ]",
    title: "操作パネル / ロール連携",
    text: "ショップ購入、ロール付与、チケット、自動VCなどを、メンバーが迷わず使えるUIにまとめます。",
  },
  {
    label: "[ voice experience ]",
    title: "声診断・相性診断",
    text: "通話を盛り上げるためのエンタメ機能として、診断結果やランキングをDiscord/Webへ自然に出します。",
  },
];

const prices = [
  {
    name: "汎用プラン",
    price: "月額3,000円〜",
    lead: "STARTER",
    note: "まずは基本Botから小さく始めたいサーバー向け。",
    items: ["基本Bot導入", "独自通貨 / デイリー", "ランク / XP", "VC報酬", "ショップ", "基本保守", "バグ対応無料"],
  },
  {
    name: "カスタムプラン",
    price: "月額6,000円〜",
    lead: "CUSTOM",
    note: "世界観に合わせて調整したい、一番相談されやすい標準プラン。",
    highlight: true,
    items: ["汎用プランの内容", "通貨名・報酬量調整", "ショップ内容調整", "Game Balance調整", "独自コマンド2つまで無料", "DM / 専用サーバー相談"],
  },
  {
    name: "運用強化プラン",
    price: "月額9,800円〜",
    lead: "GROWTH",
    note: "運用しながらイベントや経済バランスを改善したい方向け。",
    items: ["カスタムプランの内容", "定期的なバランス調整", "イベント設計相談", "通話体験の相談", "優先対応", "独自コマンド4つまで無料"],
  },
  {
    name: "オーダーメイド",
    price: "初期20,000円〜",
    lead: "BESPOKE",
    note: "+ 月額保守3,000円〜。WebやActivityまで作りたい方向け。",
    items: ["Discord連携Web", "Discord Activity", "声診断 / 相性診断Bot", "専用Bot", "管理ダッシュボード", "外部API連携"],
  },
];

const steps = [
  ["01", "無料相談", "ジャンル、人数、やりたい世界観をヒアリングします。"],
  ["02", "プラン提案", "必要な機能と運用負荷に合わせて、無理のない構成を提案します。"],
  ["03", "初期設定", "通貨名、報酬、ランク、ショップ、パネルを設定します。"],
  ["04", "テスト運用", "導入前に、デモサーバーやテスト環境で動きを確認できます。"],
  ["05", "本運用開始", "運用しながら、必要に応じて相談・改善します。"],
];

const trust = [
  ["小さく始められる", "最低契約1ヶ月。まずは小さく試せます。"],
  ["人数追加料金なし", "サーバー人数による追加料金は基本ありません。"],
  ["データ保持", "解約後もデータを3ヶ月保持します。"],
  ["バグ対応無料", "こちらの実装ミスや設定ミスによる不具合は無料で対応します。"],
  ["換金不可設計", "カジノ風ミニゲームは、現実のお金や景品と連動しないゲーム内通貨で提供します。"],
  ["相談しやすい運用", "DMまたは専用サーバーで相談できます。夜間・緊急対応は可能な範囲で対応します。"],
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

const notes = [
  ["カジノ風ミニゲームについて", "換金不可のゲーム内通貨で楽しむコミュニティ機能です。現実のお金、景品、換金性のある報酬とは連動しません。"],
  ["音声診断・相性診断について", "通話を盛り上げるためのエンタメ機能です。性格、能力、心理状態、健康状態、科学的な相性を断定するものではありません。"],
  ["サポートについて", "緊急対応・夜間対応は可能な範囲で対応しますが、即時対応を保証するものではありません。"],
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden">
      <MotionLayer />
      <SiteHeader />
      <Hero />
      <KeywordMarquee />
      <AudienceSection />
      <CapabilitiesSection />
      <ShowcaseSection />
      <PricingSection />
      <FlowSection />
      <TrustSection />
      <DemoSection />
      <FaqSection />
      <ContactSection />
      <NotesSection />
      <Footer />
      <a href="#contact" className="mobile-bottom-cta">
        無料で相談する
      </a>
    </main>
  );
}

function Hero() {
  return (
    <section id="top" className="bx-hero">
      <div className="bx-hero-grid" aria-hidden="true" />
      <div className="bx-hero-glow" aria-hidden="true" />
      <div className="bx-ghost-logo" aria-hidden="true">
        <Image src={publicPath("/brand/botix-logo.png")} alt="" fill sizes="940px" className="object-contain" priority />
      </div>

      <div className="bx-container bx-hero-inner">
        <div data-reveal>
          <p className="bx-eyebrow">( Botix — Discord Community Studio )</p>
          <h1 className="bx-hero-title">
            <small>ただ動くBotより、</small>
            <strong>
              続く<span className="bx-gradient-word">コミュニティ</span>を。
            </strong>
          </h1>
          <p className="bx-hero-copy">
            独自通貨、ランク、VC報酬、ショップ、通話体験、Discord連携Webまで。サーバーの空気に合わせて、遊び・交流・運営が自然に回り続ける仕組みを、丁寧に設計します。
          </p>
          <div className="bx-hero-actions">
            <a href="#contact" className="bx-primary-btn">
              無料で相談する
              <ArrowRight size={17} />
            </a>
            <a href="#features" className="bx-secondary-btn">
              できることを見る
            </a>
          </div>
          <div className="bx-hero-stats" aria-label="Botix service stats">
            {heroStats.map(([value, label]) => (
              <div key={label} className="bx-hero-stat">
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
        <HeroConsole />
      </div>
    </section>
  );
}

function KeywordMarquee() {
  const renderRow = (copy: string) => (
    <div className="bx-marquee-row" aria-hidden="true">
      {marquee.map((word) => (
        <span key={`${copy}-${word}`} className="inline-flex items-center gap-[18px]">
          <span className="bx-marquee-word">{word}</span>
          <span className="bx-marquee-dot" />
        </span>
      ))}
    </div>
  );

  return (
    <div className="bx-marquee" aria-hidden="true">
      <div className="bx-marquee-track">
        {renderRow("a")}
        {renderRow("b")}
      </div>
    </div>
  );
}

function AudienceSection() {
  return (
    <Section id="audience" number="01" label="Guild Types" title="サーバーの空気に合わせて、参加する理由を設計する。">
      <div className="bx-audience-list">
        {audiences.map((item, index) => (
          <article key={item.label} className="bx-audience-row" data-reveal>
            <span className="bx-outline-number">{String(index + 1).padStart(2, "0")}</span>
            <div>
              <p className="bx-audience-label">{item.label}</p>
              <h3>{item.title}</h3>
            </div>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}

function CapabilitiesSection() {
  return (
    <Section
      id="features"
      number="02"
      label="Capabilities"
      title={
        <>
          遊び・交流・運営が、<span className="bx-gradient-word">自然に回る</span>Discordへ。
        </>
      }
      copy="機能をただ足すのではなく、通貨、ランク、通話、管理、Webをつなげて、サーバーの雰囲気に合う仕組みとして設計します。"
      alt
    >
      <div className="bx-capability-layout">
        <div className="bx-sticky-copy" data-reveal>
          <p className="bx-section-kicker">( BUILD SCOPE )</p>
          <h3 className="bx-section-title">Bot / Web / Activity をひとつの流れに。</h3>
          <p className="bx-section-copy">
            参加、報酬、消費、会話、運営の動線を整理して、メンバーが自然に戻ってくるコミュニティ体験を作ります。
          </p>
          <div className="bx-pill-row">
            <span className="bx-pill">BOT</span>
            <span className="bx-pill">WEB</span>
            <span className="bx-pill">ACTIVITY</span>
          </div>
        </div>
        <div className="bx-capability-grid">
          {capabilities.map((item, index) => (
            <article key={item.title} className="bx-capability-card" data-reveal>
              <span className="bx-card-number">{String(index + 1).padStart(2, "0")}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <div className="bx-tag-list">
                {item.tags.map((tag) => (
                  <span key={tag} className="bx-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}

function ShowcaseSection() {
  return (
    <Section
      id="showcase"
      number="03"
      label="Showcase"
      title="実際に、こういう体験を作れます。"
      copy="架空SaaSっぽい大きな画面より、Discordで本当に使う運営パネルや体験UIを想像しやすい見せ方に寄せています。"
    >
      <div className="bx-card-grid">
        {showcase.map((item) => (
          <article key={item.title} className="bx-showcase-card" data-reveal>
            <div className="bx-showcase-shot">
              <span className="bx-shot-label">{item.label}</span>
            </div>
            <div className="bx-showcase-body">
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          </article>
        ))}
      </div>
      <p className="bx-code-note">// 実スクリーンショットは public/showcase/ に差し替え予定</p>
    </Section>
  );
}

function PricingSection() {
  return (
    <Section id="pricing" number="04" label="Pricing" title="わかりやすい月額で、必要な分だけ。" copy="正式な金額は、導入内容・必要機能・運用負荷に応じて、事前に見積もりまたは案内内容で提示します。" alt>
      <div className="bx-price-grid">
        {prices.map((plan) => (
          <article key={plan.name} className={plan.highlight ? "bx-price-card bx-price-card-popular" : "bx-price-card"} data-reveal>
            {plan.highlight ? <span className="bx-popular-tab">POPULAR</span> : null}
            <p className="bx-plan-lead">{plan.lead}</p>
            <h3>{plan.name}</h3>
            <p className="bx-price">{plan.price}</p>
            <p className="bx-price-note">{plan.note}</p>
            <ul className="bx-check-list">
              {plan.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <PlanCta plan={plan.name} highlight={plan.highlight}>
              {planCtaLabel(plan.name)}
            </PlanCta>
          </article>
        ))}
      </div>
      <p className="bx-pricing-note">// 極端な高負荷運用や特殊な常時処理が必要な場合は事前相談となります。</p>
    </Section>
  );
}

function FlowSection() {
  return (
    <Section id="flow" number="05" label="Launch Flow" title="相談から本運用まで、迷わず。">
      <div className="bx-flow-grid">
        {steps.map(([number, title, text]) => (
          <article key={number} className="bx-step-card" data-reveal>
            <span className="bx-outline-number">{number}</span>
            <div className="bx-step-line" />
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}

function TrustSection() {
  return (
    <Section id="trust" number="06" label="Trust" title="安心して、相談できる。" alt>
      <div className="bx-card-grid">
        {trust.map(([title, text]) => (
          <article key={title} className="bx-trust-card" data-reveal>
            <span className="bx-trust-icon" />
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}

function DemoSection() {
  return (
    <section id="demo" className="bx-section">
      <div className="bx-container">
        <div className="bx-demo-banner" data-reveal>
          <div className="bx-demo-inner">
            <div>
              <p className="bx-section-kicker">DEMO SERVER</p>
              <h2 className="bx-section-title">触ってから、決められる。</h2>
              <p className="bx-section-copy">
                通貨、ランキング、カジノ風ミニゲーム、VC報酬、ショップ、診断系機能などを、導入前に確認できます。
              </p>
            </div>
            <a href={demoUrl} className="bx-white-btn">
              デモサーバーを見る
              <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <Section id="faq" number="07" label="FAQ" title="よくある質問" alt>
      <FaqList faqs={faqs} />
    </Section>
  );
}

function ContactSection() {
  return (
    <Section
      id="contact"
      label="Consulting"
      title="あなたのサーバーに合う仕組みを、一緒に考えます。"
      copy="まだ内容が固まっていなくても大丈夫です。「こういうサーバーにしたい」「今ここで困っている」くらいから相談できます。"
    >
      <div className="bx-contact-grid">
        <aside className="bx-contact-aside" data-reveal>
          <p className="bx-section-kicker">BEFORE SENDING</p>
          <ul>
            <li>
              <span className="bx-diamond" />
              <span>サーバー人数、ジャンル、欲しい機能がざっくりでも分かると提案しやすいです。</span>
            </li>
            <li>
              <span className="bx-diamond" />
              <span>Discord IDまたは連絡先のどちらかは必須です。</span>
            </li>
            <li>
              <span className="bx-diamond" />
              <span>連絡先 Discord: {contactDiscord}</span>
            </li>
          </ul>
        </aside>
        <ContactForm />
      </div>
    </Section>
  );
}

function NotesSection() {
  return (
    <Section id="notes" label="Notes" title="安心して使うための注意事項">
      <div className="bx-card-grid">
        {notes.map(([title, text]) => (
          <article key={title} className="bx-note-card" data-reveal>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}

function Section({
  id,
  number,
  label,
  title,
  copy,
  alt,
  children,
}: {
  id: string;
  number?: string;
  label: string;
  title: React.ReactNode;
  copy?: string;
  alt?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={alt ? "bx-section bx-section-alt" : "bx-section"}>
      <div className="bx-container">
        <div className="bx-section-head" data-reveal>
          <p className="bx-section-kicker">{number ? `( ${number} / ${label} )` : `( ${label} )`}</p>
          <h2 className="bx-section-title">{title}</h2>
          {copy ? <p className="bx-section-copy">{copy}</p> : null}
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
    <footer className="bx-footer">
      <div className="bx-container">
        <div className="bx-footer-top">
          <div>
            <a href="#top" className="bx-brand">
              <span className="bx-brand-mark">
                <Image src={publicPath("/brand/botix-mark.png")} alt="Botix" fill sizes="36px" className="object-contain" />
              </span>
              <span>
                <span className="bx-brand-name">Botix</span>
                <span className="bx-brand-tag">Discord Bots. Built Better.</span>
              </span>
            </a>
            <p className="bx-section-copy">
              Discordコミュニティ向けのBot、Web、Activityを丁寧に制作する小規模開発スタジオです。
            </p>
          </div>
          <nav className="bx-footer-links" aria-label="フッターナビゲーション">
            {links.map(([label, href]) => (
              <Link key={label} href={href}>
                {label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="bx-footer-logo-wrap" aria-hidden="true">
          <div className="bx-footer-logo">
            <Image src={publicPath("/brand/botix-logo.png")} alt="" fill sizes="640px" className="object-contain" />
          </div>
        </div>
        <p className="bx-copyright">© 2026 Botix.</p>
      </div>
    </footer>
  );
}
