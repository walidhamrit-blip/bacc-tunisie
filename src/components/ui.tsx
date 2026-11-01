import Link from "next/link";
import type { ReactNode } from "react";
import type { LevelLabel } from "@/lib/data";

const TONE_STYLE: Record<LevelLabel["tone"], { bg: string; color: string }> = {
  emerald: { bg: "var(--green-soft)", color: "var(--green)" },
  sky: { bg: "var(--sky-soft)", color: "#1b45b8" },
  violet: { bg: "#f1eafe", color: "var(--violet)" },
  amber: { bg: "var(--gold-soft)", color: "#8a6200" },
  slate: { bg: "#eef0ee", color: "#47534d" },
};

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        {eyebrow ? <p className="eyebrow mb-2">{eyebrow}</p> : null}
        <h1 className="display text-3xl font-semibold text-[var(--ink)] sm:text-[2.5rem]">{title}</h1>
        {description ? <div className="mt-3 text-[0.95rem] text-[var(--ink-soft)]">{description}</div> : null}
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
    </div>
  );
}

export function PageShell({ children }: { children: ReactNode }) {
  return <div className="mx-auto w-full max-w-6xl px-4 py-9 sm:px-6 sm:py-12">{children}</div>;
}

export function LevelPill({ level, showShort = false }: { level: LevelLabel; showShort?: boolean }) {
  const style = TONE_STYLE[level.tone];
  return (
    <span className="badge" style={{ background: style.bg, color: style.color }}>
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: style.color }} />
      {level.label}
      {showShort ? <span className="opacity-60">· {level.short}</span> : null}
    </span>
  );
}

export function ProgressBar({
  value,
  tone = "var(--brand)",
  label,
}: {
  value: number;
  tone?: string;
  label?: string;
}) {
  const safe = Math.max(0, Math.min(100, value));
  return (
    <div>
      {label ? (
        <div className="mb-1 flex items-center justify-between text-[0.75rem] text-[var(--ink-soft)]">
          <span>{label}</span>
          <span className="font-semibold text-[var(--ink)]">{safe}%</span>
        </div>
      ) : null}
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${safe}%`, background: tone }} />
      </div>
    </div>
  );
}

export function SubjectGlyph({
  subject,
  size = 40,
}: {
  subject: { icon: string; accent: string };
  size?: number;
}) {
  return (
    <span
      className="grid shrink-0 place-items-center rounded-[12px] font-semibold"
      style={{
        width: size,
        height: size,
        background: `${subject.accent}14`,
        color: subject.accent,
        border: `1px solid ${subject.accent}26`,
        fontSize: size * 0.45,
      }}
      aria-hidden
    >
      {subject.icon}
    </span>
  );
}

export function StatCard({
  label,
  value,
  hint,
  tone = "var(--ink)",
}: {
  label: string;
  value: ReactNode;
  hint?: string;
  tone?: string;
}) {
  return (
    <div className="card p-4">
      <p className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-[var(--ink-soft)]">{label}</p>
      <p className="display mt-1 text-2xl font-semibold" style={{ color: tone }}>
        {value}
      </p>
      {hint ? <p className="mt-1 text-[0.75rem] text-[var(--ink-soft)]">{hint}</p> : null}
    </div>
  );
}

export function Callout({
  tone = "info",
  title,
  children,
}: {
  tone?: "info" | "warn" | "tip";
  title: string;
  children: ReactNode;
}) {
  const styles = {
    info: { background: "#f3f7ff", border: "#cfdcff", color: "#1b3f9a" },
    warn: { background: "#fff6e9", border: "#f3ddb5", color: "#7a4b04" },
    tip: { background: "var(--green-soft)", border: "#cbe2d2", color: "var(--green)" },
  }[tone];
  return (
    <div className="rounded-2xl border p-4" style={{ background: styles.background, borderColor: styles.border }}>
      <p className="text-sm font-bold" style={{ color: styles.color }}>
        {title}
      </p>
      <div className="mt-1 text-sm text-[var(--ink-soft)]">{children}</div>
    </div>
  );
}

export function EmptyState({
  title,
  text,
  action,
}: {
  title: string;
  text: string;
  action?: { href: string; label: string };
}) {
  return (
    <div className="card grid-pattern p-10 text-center">
      <p className="display text-xl font-semibold text-[var(--ink)]">{title}</p>
      <p className="mx-auto mt-2 max-w-md text-sm text-[var(--ink-soft)]">{text}</p>
      {action ? (
        <div className="mt-5 flex justify-center">
          <Link href={action.href} className="btn btn-primary">
            {action.label}
          </Link>
        </div>
      ) : null}
    </div>
  );
}

export function DifficultyDots({ level }: { level: number }) {
  return (
    <span className="inline-flex items-center gap-1" title={`Difficulté ${level}/3`}>
      {[1, 2, 3].map((dot) => (
        <span
          key={dot}
          className="h-1.5 w-1.5 rounded-full"
          style={{ background: dot <= level ? "var(--brand)" : "#ddd4c4" }}
        />
      ))}
    </span>
  );
}
