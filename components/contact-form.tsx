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

const genres = ["配信者コミュニティ", "ゲームサーバー", "国家運営 / RP", "雑談 / 通話", "その他"];

const plans = ["汎用プラン", "カスタムプラン", "運用強化プラン", "オーダーメイド開発", "まだ相談したい"];

const externalContactFormUrl = process.env.NEXT_PUBLIC_CONTACT_FORM_URL;

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [notice, setNotice] = useState("");
  const [highlight, setHighlight] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  const canSubmit = useMemo(() => {
    return form.name.trim() && (form.discordId.trim() || form.contact.trim()) && form.genre.trim() && form.message.trim();
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
      setNotice("現在この静的ページでは直接送信を無効化しています。外部フォームを使う場合は NEXT_PUBLIC_CONTACT_FORM_URL を設定してください。");
      return;
    }

    setStatus("submitting");
    setNotice("外部フォームを開いています。このページから直接Discord Webhookへは送信されません。");

    const params = new URLSearchParams(Object.entries(form).filter(([, value]) => value.trim().length > 0));
    const separator = externalContactFormUrl.includes("?") ? "&" : "?";
    const url = `${externalContactFormUrl}${separator}${params.toString()}`;

    try {
      window.open(url, "_blank", "noopener,noreferrer");
      setStatus("success");
      setNotice("外部フォームを開きました。表示されたフォームから送信してください。");
    } catch (error) {
      setStatus("error");
      setNotice(error instanceof Error ? `外部フォームを開けませんでした。${error.message}` : "外部フォームを開けませんでした。時間をおいて再度お試しください。");
    }
  };

  return (
    <form ref={formRef} onSubmit={submit} className={highlight ? "contact-card form-highlight" : "contact-card"}>
      {form.plan ? (
        <div className="mb-4">
          <span className="selected-plan-chip">PLAN&nbsp;&nbsp;{form.plan}</span>
        </div>
      ) : null}

      {notice ? (
        <div className={`form-notice ${status === "success" ? "form-notice-success" : ""} ${status === "error" ? "form-notice-error" : ""}`}>
          {notice}
        </div>
      ) : null}

      <div className="form-grid">
        <Field label="NAME / お名前" required>
          <input ref={nameRef} value={form.name} onChange={(event) => update("name", event.target.value)} placeholder="例: neko_admin" className="field" />
        </Field>

        <Field label="DISCORD ID">
          <input value={form.discordId} onChange={(event) => update("discordId", event.target.value)} placeholder="例: username" className="field" />
        </Field>

        <Field label="CONTACT / 連絡先">
          <input value={form.contact} onChange={(event) => update("contact", event.target.value)} placeholder="メール、X、Discord以外の連絡先" className="field" />
        </Field>

        <Field label="SERVER / サーバー名">
          <input value={form.serverName} onChange={(event) => update("serverName", event.target.value)} placeholder="例: 夜更かしゲーム部" className="field" />
        </Field>

        <Field label="MEMBERS / 人数">
          <input value={form.memberCount} onChange={(event) => update("memberCount", event.target.value)} placeholder="例: 80人" className="field" />
        </Field>

        <Field label="GENRE / ジャンル" required>
          <select value={form.genre} onChange={(event) => update("genre", event.target.value)} className="field">
            <option value="">選択してください</option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </Field>

        <Field label="PLAN / 希望プラン">
          <select value={form.plan} onChange={(event) => update("plan", event.target.value)} className="field">
            <option value="">選択してください</option>
            {plans.map((plan) => (
              <option key={plan} value={plan}>
                {plan}
              </option>
            ))}
          </select>
        </Field>

        <Field label="BUDGET / 予算感">
          <input value={form.budget} onChange={(event) => update("budget", event.target.value)} placeholder="例: 月額1万円以内" className="field" />
        </Field>

        <Field label="FEATURES / 欲しい機能" full>
          <textarea value={form.features} onChange={(event) => update("features", event.target.value)} placeholder="経済Bot、VCランク、ショップ、診断Botなど" className="field" />
        </Field>

        <Field label="WORLD / 世界観・方向性" full>
          <textarea value={form.concept} onChange={(event) => update("concept", event.target.value)} placeholder="サーバーの雰囲気、通貨名、遊び方のイメージなど" className="field" />
        </Field>

        <Field label="TIMING / 導入希望時期" full>
          <input value={form.timing} onChange={(event) => update("timing", event.target.value)} placeholder="例: 今月中 / 相談して決めたい" className="field" />
        </Field>

        <Field label="MESSAGE / 相談内容" required full>
          <textarea value={form.message} onChange={(event) => update("message", event.target.value)} placeholder="まだ固まっていない内容でも大丈夫です。今困っていることや、作りたい雰囲気を書いてください。" className="field" />
        </Field>
      </div>

      <div className="form-actions">
        <button type="submit" disabled={status === "submitting"} className="bx-primary-btn">
          {status === "submitting" ? (
            <>
              <span className="spinner" />
              送信準備中
            </>
          ) : (
            "相談内容を送信する"
          )}
        </button>
        {!notice ? <p className="form-help">必須は、お名前・ジャンル・相談内容・Discord IDまたは連絡先です。</p> : null}
      </div>
    </form>
  );
}

function Field({
  label,
  required,
  full,
  children,
}: {
  label: string;
  required?: boolean;
  full?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className={full ? "form-field form-field-full" : "form-field"}>
      <span className="form-label">
        {label}
        {required ? <span className="required-badge">REQ</span> : null}
      </span>
      {children}
    </label>
  );
}
