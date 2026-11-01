"use client";

import { useFormStatus } from "react-dom";
import { toggleProgress } from "@/app/actions";

function Submit({ done }: { done: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={`btn btn-sm ${done ? "btn-ghost" : "btn-dark"}`}
      aria-pressed={done}
    >
      {done ? (
        <svg viewBox="0 0 24 24" width="15" height="15" fill="none" aria-hidden>
          <path d="m5 13 4 4L19 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" width="15" height="15" fill="none" aria-hidden>
          <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="2" />
        </svg>
      )}
      {pending ? "..." : done ? "Compris ✓" : "Marquer comme compris"}
    </button>
  );
}

export function ToggleComplete({
  kind,
  slug,
  subjectSlug,
  done,
  labels,
}: {
  kind: "lesson" | "exercise" | "exam";
  slug: string;
  subjectSlug: string;
  done: boolean;
  labels?: { done: string; todo: string };
}) {
  const text = labels ?? {
    done: "Compris ✓",
    todo: kind === "exam" ? "Marquer comme travaillé" : "Marquer comme compris",
  };

  return (
    <form action={toggleProgress}>
      <input type="hidden" name="kind" value={kind} />
      <input type="hidden" name="slug" value={slug} />
      <input type="hidden" name="subjectSlug" value={subjectSlug} />
      <span className="hidden">{text.done}</span>
      <Submit done={done} />
    </form>
  );
}
