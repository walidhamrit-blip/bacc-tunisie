import type { LessonBlock } from "@/db/schema";

export function LessonBlocks({ blocks }: { blocks: LessonBlock[] }) {
  return (
    <div className="space-y-6">
      {blocks.map((block, index) => {
        if (block.type === "paragraph") {
          return (
            <section key={index}>
              {block.title ? (
                <h3 className="display mb-2 text-lg font-semibold text-[var(--ink)]">{block.title}</h3>
              ) : null}
              <p dir="auto" className="text-[0.95rem] leading-relaxed text-[var(--ink-soft)]">{block.text}</p>
            </section>
          );
        }

        if (block.type === "list") {
          return (
            <section key={index}>
              {block.title ? (
                <h3 className="display mb-2 text-lg font-semibold text-[var(--ink)]">{block.title}</h3>
              ) : null}
              <ul className="space-y-2">
                {block.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex gap-2.5 text-[0.92rem] text-[var(--ink-soft)]">
                    <span className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--brand)]" />
                    <span dir="auto">{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          );
        }

        if (block.type === "steps") {
          return (
            <section key={index} className="rounded-2xl border border-[var(--line)] bg-[#fcfaf5] p-4 sm:p-5">
              {block.title ? (
                <h3 className="display mb-3 text-lg font-semibold text-[var(--ink)]">{block.title}</h3>
              ) : null}
              <ol className="space-y-3">
                {block.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex gap-3">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[var(--ink)] text-[0.72rem] font-bold text-white">
                      {itemIndex + 1}
                    </span>
                    <span className="text-[0.92rem] leading-relaxed text-[var(--ink-soft)]">{item}</span>
                  </li>
                ))}
              </ol>
            </section>
          );
        }

        if (block.type === "formula") {
          return (
            <section
              key={index}
              className="rounded-2xl border border-[#d9e3d9] bg-[var(--green-soft)] p-4 sm:p-5"
            >
              {block.title ? (
                <p className="mb-2 text-[0.72rem] font-bold uppercase tracking-[0.12em] text-[var(--green)]">
                  {block.title}
                </p>
              ) : null}
              <p className="formula text-[1rem] font-semibold text-[#0d3a26] sm:text-[1.05rem]">{block.expression}</p>
              {block.note ? <p className="mt-2 text-[0.85rem] text-[#37564a]">{block.note}</p> : null}
            </section>
          );
        }

        if (block.type === "callout") {
          const palette = {
            info: { bg: "#f3f7ff", border: "#cfdcff", color: "#1b3f9a" },
            warn: { bg: "#fff6e9", border: "#f3ddb5", color: "#7a4b04" },
            tip: { bg: "var(--green-soft)", border: "#cbe2d2", color: "var(--green)" },
          }[block.tone];
          return (
            <section
              key={index}
              className="rounded-2xl border p-4"
              style={{ background: palette.bg, borderColor: palette.border }}
            >
              <p className="text-sm font-bold" style={{ color: palette.color }}>
                {block.title}
              </p>
              <p dir="auto" className="mt-1 text-[0.9rem] leading-relaxed text-[var(--ink-soft)]">{block.text}</p>
            </section>
          );
        }

        return (
          <section key={index} className="overflow-hidden rounded-2xl border border-[var(--line)]">
            {block.title ? (
              <p className="border-b border-[var(--line)] bg-[#fcfaf5] px-4 py-2.5 text-sm font-semibold text-[var(--ink)]">
                {block.title}
              </p>
            ) : null}
            <div className="overflow-x-auto">
              <table className="w-full min-w-[520px] border-collapse text-left text-[0.85rem]">
                <thead>
                  <tr className="bg-[#f7f3ea]">
                    {block.head.map((cell, cellIndex) => (
                      <th key={cellIndex} className="px-4 py-2.5 font-semibold text-[var(--ink)]">
                        {cell}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {block.rows.map((row, rowIndex) => (
                    <tr key={rowIndex} className="border-t border-[var(--line)]">
                      {row.map((cell, cellIndex) => (
                        <td key={cellIndex} dir="auto" className="px-4 py-2.5 align-top text-[var(--ink-soft)]">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        );
      })}
    </div>
  );
}
