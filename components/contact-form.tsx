"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";

type FormStatus = "idle" | "submitting" | "success" | "error";

type FormState = {
  name: string;
  discordId: string;
  contact: string;
  serverName: string;
  memberCount: string;
  genre: string;
  plan: string;
  features: string;
  concept: string;
  budget: string;
  timing: string;
  message: string;
};

const initialState: FormState = {
  name: "",
  discordId: "",
  contact: "",
  serverName: "",
  memberCount: "",
  genre: "",
  plan: "",
  features: "",
  concept: "",
  budget: "",
  timing: "",
  message: "",
};

const genres = [
  "配信者コミュニティ",
  "ゲームサーバー",
  "国家運営 / RP",
  "雑談 / 通話",
  "その他",
];

const plans = [
  "汎用プラン",
  "カスタムプラン",
  "運用強化プラン",
  "オーダーメイド開発",
  "まだ相談したい",
];

const externalContactFormUrl = process.env.NEXT_PUBLIC_CONTACT_FORM_URL;

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [notice, setNotice] = useState("");
  const [highlight, setHighlight] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  const canSubmit = useMemo(() => {
    return (
      form.name.trim() &&
      (form.discordId.trim() || form.contact.trim()) &&
      form.genre.trim() &&
      form.message.trim()
    );
  }, [form]);

  const update = (key: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  useEffect(() => {
    const onSelectPlan = (event: Event) => {
      const detail = (event as CustomEvent<string>).detail;
      const plan = detail === "オーダーメイド" ? "オーダーメイド開発" : detail;
      setForm((current) => ({ ...current, plan }));
      setNotice(`${plan}で相談内容を入力できます。`);
      setStatus("idle");
      setHighlight(true);
      window.setTimeout(() => {
        formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
        nameRef.current?.focus({ preventScroll: true });
      }, 260);
      window.setTimeout(() => setHighlight(false), 1800);
    };

    window.addEventListener("select-plan", onSelectPlan);
    return () => window.removeEventListener("select-plan", onSelectPlan);
  }, []);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!canSubmit) {
      setStatus("error");
      setNotice("必須項目を入力してください。Discord IDまたは連絡先のどちらかが必要です。");
      return;
    }

    if (!externalContactFormUrl) {
      setStatus("error");
      setNotice(
        "GitHub Pages版ではフォーム送信を無効化しています。外部フォームを使う場合は NEXT_PUBLIC_CONTACT_FORM_URL を設定してください。",
      );
      return;
    }

    setStatus("submitting");
    setNotice("外部フォームを開いています。入力内容はこのページから直接送信されません。");

    const params = new URLSearchParams(
      Object.entries(form).filter(([, value]) => value.trim().length > 0),
    );
    const separator = externalContactFormUrl.includes("?") ? "&" : "?";
    const url = `${externalContactFormUrl}${separator}${params.toString()}`;

    try {
      window.open(url, "_blank", "noopener,noreferrer");
      setStatus("success");
      setNotice("外部フォームを開きました。表示されたフォームから送信してください。");
    } catch (error) {
      setStatus("error");
      setNotice(
        error instanceof Error
          ? `外部フォームを開けませんでした。${error.message}`
          : "外部フォームを開けませんでした。時間をおいて再度お試しください。",
      );
    }
  };

  return (
    <form ref={formRef} onSubmit={submit} className={highlight ? "glass form-highlight space-y-5 rounded-3xl p-5 sm:p-7" : "glass space-y-5 rounded-3xl p-5 sm:p-7"}>
      {notice ? (
        <div
          className={`rounded-2xl border px-4 py-3 text-sm leading-7 ${
            status === "success"
              ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-200"
              : status === "error"
                ? "border-rose-400/30 bg-rose-400/10 text-rose-200"
                : "border-discord/30 bg-discord/10 text-slate-200"
          }`}
        >
          {notice}
        </div>
      ) : null}
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="お名前 / ハンドルネーム" required>
          <input
            ref={nameRef}
            value={form.name}
            onChange={(event) => update("name", event.target.value)}
            placeholder="例：山田 / neko_admin"
            className="field"
          />
        </Field>
        <Field label="Discord ID">
          <input
            value={form.discordId}
            onChange={(event) => update("discordId", event.target.value)}
            placeholder="例：username#0000"
            className="field"
          />
        </Field>
        <Field label="連絡先">
          <input
            value={form.contact}
            onChange={(event) => update("contact", event.target.value)}
            placeholder="メール、X、Discord以外の連絡先"
            className="field"
          />
        </Field>
        <Field label="サーバー名">
          <input
            value={form.serverName}
            onChange={(event) => update("serverName", event.target.value)}
            placeholder="例：夜更かしゲーム部"
            className="field"
          />
        </Field>
        <Field label="サーバー人数">
          <input
            value={form.memberCount}
            onChange={(event) => update("memberCount", event.target.value)}
            placeholder="例：80人"
            className="field"
          />
        </Field>
        <Field label="サーバージャンル" required>
          <select
            value={form.genre}
            onChange={(event) => update("genre", event.target.value)}
            className="field"
          >
            <option value="">選択してください</option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </Field>
        <Field label="希望プラン">
          <select
            value={form.plan}
            onChange={(event) => update("plan", event.target.value)}
            className="field"
          >
            <option value="">選択してください</option>
            {plans.map((plan) => (
              <option key={plan} value={plan}>
                {plan}
              </option>
            ))}
          </select>
        </Field>
        <Field label="予算感">
          <input
            value={form.budget}
            onChange={(event) => update("budget", event.target.value)}
            placeholder="例：月額1万円以内"
            className="field"
          />
        </Field>
      </div>

      <Field label="欲しい機能">
        <textarea
          value={form.features}
          onChange={(event) => update("features", event.target.value)}
          placeholder="経済Bot、VCランク、ショップ、診断Botなど"
          className="field min-h-28"
        />
      </Field>
      <Field label="やりたい世界観・方向性">
        <textarea
          value={form.concept}
          onChange={(event) => update("concept", event.target.value)}
          placeholder="サーバーの雰囲気、通貨名、遊び方のイメージなど"
          className="field min-h-28"
        />
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="導入希望時期">
          <input
            value={form.timing}
            onChange={(event) => update("timing", event.target.value)}
            placeholder="例：今月中 / 相談して決めたい"
            className="field"
          />
        </Field>
      </div>
      <Field label="その他相談内容" required>
        <textarea
          value={form.message}
          onChange={(event) => update("message", event.target.value)}
          placeholder="相談したい内容を自由に書いてください"
          className="field min-h-36"
        />
      </Field>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-discord to-neon px-6 py-3 text-sm font-black text-white shadow-glow transition hover:translate-y-[-1px] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" ? (
            <span className="inline-flex items-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              送信中
            </span>
          ) : (
            externalContactFormUrl ? "外部フォームへ進む" : "無料相談の内容を確認する"
          )}
        </button>
        {!notice ? (
          <p className="text-sm text-slate-400">
            必須項目は、お名前、ジャンル、相談内容、Discord IDまたは連絡先です。
          </p>
        ) : null}
      </div>
    </form>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block text-sm font-bold text-slate-200">
      <span className="mb-2 flex items-center gap-2">
        {label}
        {required ? (
          <span className="rounded-full border border-discord/40 bg-discord/10 px-2 py-0.5 text-[11px] text-discord">
            必須
          </span>
        ) : null}
      </span>
      {children}
    </label>
  );
}
