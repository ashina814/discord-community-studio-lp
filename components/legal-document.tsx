import Link from "next/link";

export function LegalDocument({ title, body }: { title: string; body: string }) {
  const lines = body.trim().split("\n");

  return (
    <main className="min-h-screen bg-void px-5 py-12 text-white sm:px-8 lg:px-12">
      <article className="glass mx-auto max-w-4xl rounded-2xl p-6 sm:p-10">
        <Link href="/" className="text-sm font-bold text-cyan">
          トップへ戻る
        </Link>
        <h1 className="mt-6 text-3xl font-black leading-tight sm:text-5xl">{title}</h1>
        <div className="mt-8 space-y-4">
          {lines.map((line, index) => renderLine(line, index))}
        </div>
      </article>
    </main>
  );
}

function renderLine(line: string, index: number) {
  const trimmed = line.trim();

  if (!trimmed) {
    return <div key={index} className="h-2" />;
  }

  if (trimmed.startsWith("## ")) {
    return (
      <h2 key={index} className="pt-6 text-2xl font-black leading-tight text-white">
        {trimmed.slice(3)}
      </h2>
    );
  }

  if (trimmed.startsWith("### ")) {
    return (
      <h3 key={index} className="pt-4 text-lg font-black leading-tight text-cyan">
        {trimmed.slice(4)}
      </h3>
    );
  }

  if (trimmed.startsWith("* ")) {
    return (
      <p key={index} className="flex gap-3 pl-2 text-sm leading-7 text-slate-300 sm:text-base">
        <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-discord" />
        <span>{trimmed.slice(2)}</span>
      </p>
    );
  }

  return (
    <p key={index} className="text-sm leading-8 text-slate-300 sm:text-base">
      {trimmed}
    </p>
  );
}
