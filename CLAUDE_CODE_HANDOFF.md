# Botix LP v2 / Claude Code 引き継ぎメモ

作成日: 2026-06-28

## 概要

Discordコミュニティ向け Bot / Web / Activity 開発サービスのLPを、Botixブランドの v2 デザインへ全面リデザイン済みです。

公開URL:

```txt
https://ashina814.github.io/discord-community-studio-lp/
```

GitHub Repository:

```txt
https://github.com/ashina814/discord-community-studio-lp
```

## 現在の実装状態

完了済み:

* Next.js App Router LP
* GitHub Pages向け静的エクスポート
* GitHub Actions build -> deploy
* GitHub Pagesサブパス配信対応
* Botixロゴ / マーク反映
* v2デザイン全面反映
* HeroのライブConsole化
* Hero背景の薄いBotixゴーストロゴ演出
* Hero直下のキーワードマーキー
* Showcaseをシンプルな3カード構成へ変更
* 料金CTA -> フォーム自動入力連携
* FAQアコーディオン
* 問い合わせフォームの外部フォーム連携前提化
* `prefers-reduced-motion` 対応
* 利用規約 / プライバシーポリシー / 特商法ページ維持

## デザイン方針

採用コンセプト:

```txt
ただ動くBotより、続くコミュニティを。
```

方向性:

* ダークテーマ
* 紫や金の強調を抑え、青を主軸にした上品なBotix感
* テンプレSaaSではなく、Discordコミュニティ開発スタジオ感
* 過剰なネオン / 派手なパーティクル / 投資っぽい表現は避ける
* Heroだけ強く、他セクションは余白と情報整理で見せる

主な色:

```txt
background: #07090E
alt background: #090C12
card: #0E1119 / #10141D -> #0C1017
primary blue: #4D86FF
bright blue: #74A0FF
green: #46E3A8
purple: #8B7BFF
```

フォント:

```txt
Unbounded
Space Mono
Noto Sans JP
```

`app/layout.tsx` にGoogle Fontsのlinkを追加済み。

## 主要ファイル

LP本体:

```txt
app/page.tsx
```

グローバルCSS / v2デザイントークン / アニメーション:

```txt
app/globals.css
tailwind.config.ts
```

ヘッダー:

```txt
components/site-header.tsx
```

Hero右側Console:

```txt
components/hero-console.tsx
```

問い合わせフォーム:

```txt
components/contact-form.tsx
```

料金CTA連動:

```txt
components/plan-cta.tsx
```

FAQ:

```txt
components/faq-list.tsx
```

スクロールリビール:

```txt
components/motion-layer.tsx
```

公開アセットのパス補助:

```txt
lib/public-path.ts
```

規約ページ:

```txt
app/terms/page.tsx
app/privacy/page.tsx
app/legal/page.tsx
components/legal-document.tsx
content/legal.ts
```

GitHub Pages:

```txt
next.config.ts
.github/workflows/deploy.yml
```

## v2の主な変更点

### Hero

コピー:

```txt
ただ動くBotより、
続くコミュニティを。
```

右側は旧 `components/hero-dashboard.tsx` ではなく、新規 `components/hero-console.tsx` を使用。

Hero Consoleの挙動:

* メンバー数が `0 -> 1,284` にカウントアップ
* 活動フィードが約2.4秒ごとに入れ替わる
* `ACTIVE / IN VC / GIL/DAY` のミニ統計バー
* `prefers-reduced-motion` では数値とアニメーションを抑制

Hero背景:

* `public/brand/botix-logo.png` を大きく薄く配置
* `opacity` を低めにして可読性を確保
* `mask-image` で端をフェード
* 青系radial glow
* ゆっくりfloat

### Showcase

旧タブ/モーダルUIは使わず、Hero直下寄りの流れでシンプルな3カードに変更。

現状はプレースホルダー:

```txt
[ economy dashboard ]
[ role panel ]
[ voice experience ]
```

今後、実スクショを入れるなら `public/showcase/` に差し替え。

### Pricing

4プラン:

* 汎用プラン: 月額3,000円〜
* カスタムプラン: 月額6,000円〜
* 運用強化プラン: 月額9,800円〜
* オーダーメイド: 初期20,000円〜

カスタムプランを `POPULAR` として強調。

`PlanCta` は `select-plan` カスタムイベントを維持。

### Contact Form

既存の項目とロジックを維持し、見た目だけv2へ変更。

必須:

* お名前 / ハンドルネーム
* Discord ID または連絡先
* サーバージャンル
* 相談内容

静的サイトのため、Discord Webhookへの直接送信は無効。

外部フォームを使う場合:

```txt
NEXT_PUBLIC_CONTACT_FORM_URL
```

を設定すると、入力値をURLSearchParamsで付けて `window.open` します。

## GitHub Pages対応

`next.config.ts` は静的エクスポート対応済み。

重要設定:

```ts
output: "export"
trailingSlash: true
basePath
assetPrefix
images.unoptimized: true
```

GitHub Actions上では `GITHUB_REPOSITORY` から自動でbasePathを推定します。

現在のbasePath:

```txt
/discord-community-studio-lp
```

画像は必ず `publicPath()` 経由。

```ts
import { publicPath } from "@/lib/public-path";

publicPath("/brand/botix-logo.png")
```

## 表現ルール

使う表現:

* カジノ風ミニゲーム
* 換金不可のゲーム内通貨
* エンタメ機能
* Jackpot Pool
* Currency Sink
* Game Balance
* Gil

避ける表現:

* Casino Revenue
* 売上
* 収益
* ¥表記
* 現実のお金に見える表記

## 検証済み

通常ビルド:

```bash
npm.cmd run build
```

成功。

GitHub Pages想定ビルド:

```powershell
$env:GITHUB_ACTIONS='true'
$env:GITHUB_REPOSITORY='ashina814/discord-community-studio-lp'
npm.cmd run build
```

成功。

出力HTMLで以下のようにbasePath付き画像参照を確認済み。

```txt
/discord-community-studio-lp/brand/botix-logo.png
/discord-community-studio-lp/brand/botix-mark.png
```

## ローカルGitの注意

元の `.git` は壊れていて、通常の `git status` が失敗する可能性があります。

現在は一時Git管理領域として `.tmp-git/` を使っています。

例:

```powershell
git --git-dir="C:\Users\kout2\OneDrive\Web\Web 広告用\.tmp-git" --work-tree="C:\Users\kout2\OneDrive\Web\Web 広告用" status --short
```

## 次にやるなら

* 実スクショを `public/showcase/` に追加してShowcaseの本物感を上げる
* フォーム外部連携先を `NEXT_PUBLIC_CONTACT_FORM_URL` に設定
* デモサーバーURLを `NEXT_PUBLIC_DEMO_SERVER_URL` に設定
* 特商法ページのプレースホルダーを本番情報に差し替え
* OGP画像 / favicon をBotixロゴで追加
