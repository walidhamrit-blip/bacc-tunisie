"use client";

import { useEffect, useRef, useState } from "react";

type Message = { id: number; role: "user" | "assistant"; content: string; createdAt: string };

type Source = { subjectSlug: string; title: string; chapter: string };

type Conversation = {
  id: number;
  title: string;
  updatedAt: string;
};

export function AIAssistant() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeId, setActiveId] = useState<number | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [sources, setSources] = useState<Source[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const res = await fetch("/api/conversations");
      if (!res.ok || !mounted) return;
      const data = await res.json();
      if (!mounted) return;
      setConversations(data.conversations ?? []);
      if (data.conversations?.[0]) setActiveId(data.conversations[0].id);
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const selectConversation = async (id: number) => {
    setActiveId(id);
    setMessages([]);
    setSources([]);
    setError("");
    const res = await fetch(`/api/conversations/${id}`);
    if (!res.ok) return;
    const data = await res.json();
    setMessages(data.messages ?? []);
  };

  const createNewConversation = async () => {
    const res = await fetch("/api/conversations", { method: "POST" });
    if (!res.ok) return;
    const data = await res.json();
    setConversations((prev) => [
      data.conversation,
      ...prev.filter((c) => c.id !== data.conversation.id),
    ]);
    setActiveId(data.conversation.id);
    setMessages([]);
    setSources([]);
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || sending || !activeId) return;
    setSending(true);
    setError("");
    setMessages([...messages, { id: -1, role: "user", content: text, createdAt: new Date().toISOString() }]);
    setInput("");

    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, conversationId: activeId }),
      });
      if (!res.ok) throw new Error("Échec de l&apos;assistant");
      const data = await res.json();

      setMessages((prev) => [...prev.filter((m) => m.id !== -1), ...(data.messages ?? [])]);
      setSources(data.sources ?? []);
      setActiveId(data.conversationId);

      // rafraîchir la liste pour avoir le nouveau titre / ordre
      const res2 = await fetch("/api/conversations");
      if (res2.ok) {
        const data2 = await res2.json();
        setConversations(data2.conversations ?? []);
      }
    } catch {
      setError("Impossible d&apos;obtenir une réponse pour le moment. Réessaie plus tard.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="flex flex-1 h-full max-h-[calc(100vh-160px)]">
      {/* Sidebar : conversations */}
      <aside className="hidden lg:flex w-72 flex-col border-r border-[var(--line)] bg-[#faf7f0]">
        <div className="p-4 border-b border-[var(--line)]">
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--ink-soft)]">
            Mes conversations
          </p>
          <button
            onClick={createNewConversation}
            className="mt-2 w-full flex items-center gap-2 text-sm font-semibold text-[var(--brand)]"
          >
            <span>+</span> Nouvelle conversation
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {conversations.length === 0 ? (
            <p className="text-xs text-center text-[var(--ink-soft)]">Aucune conversation pour l&apos;instant.</p>
          ) : (
            conversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => selectConversation(conv.id)}
                className={`w-full flex items-center gap-2 p-2 rounded-lg text-sm transition ${
                  activeId === conv.id
                    ? "bg-[var(--brand)] text-white"
                    : "text-[var(--ink-soft)] hover:bg-white hover:text-[var(--ink)]"
                }`}
              >
                <span className="mt-[0.15rem] h-1.5 w-1.5 shrink-0 rounded-full" aria-hidden>{conv.id}</span>
                <span className="truncate">{conv.title}</span>
              </button>
            ))
          )}
        </div>
      </aside>

      {/* Zone de chat */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="border-b border-[var(--line)] p-4 bg-[#fcfaf5]">
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-[var(--brand)]/10 text-[var(--brand)] font-bold">
              🤖
            </span>
            <div>
              <p className="font-semibold text-[var(--ink)]">
                {activeId ? "Assistant Bac Coach" : "Sélectionne une conversation"}
              </p>
              <p className="text-[0.7rem] text-[var(--ink-soft)]">
                Pose tes questions sur les cours du bac tunisien. Je m&apos;appuie sur les fiches du site.
              </p>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
          {error ? (
            <div className="rounded-xl border border-[#feb2b2] bg-[#fdeaed] p-3 text-sm text-[#7f1d1d]">
              {error}
            </div>
          ) : null}
          {messages.length === 0 && activeId !== null ? (
            <div className="rounded-xl border border-[var(--line)] p-6 text-center text-sm text-[var(--ink-soft)]">
              Aucune encore. Pose-moi une question sur une notion du programme (maths, physique, SVT, philosophie,
              français, anglais, arabe, histoire-géo, éco-gestion…).
            </div>
          ) : null}
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`max-w-[80%] rounded-xl p-3 ${
                msg.role === "user"
                  ? "ml-auto bg-[var(--brand)] text-white"
                  : "mr-auto border border-[var(--line)] bg-white text-[var(--ink)]"
              }`}
            >
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
            </div>
          ))}
          {sending ? (
            <div className="flex gap-2">
              <span className="rounded-full bg-[var(--brand)] text-[0.75rem] px-2.5 py-1 text-white">Écriture…</span>
            </div>
          ) : null}
          <div ref={messagesEndRef} />
        </main>

        {sources.length > 0 && (
          <section className="border-t border-[var(--line)] p-4 bg-[#f5f2ea]">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-[var(--ink-soft)] mb-2">
              Sources consultées
            </p>
            <ul className="text-xs text-[var(--ink-soft)] space-y-1">
              {sources.map((src, i) => (
                <li key={i}>
                  {src.chapter} — <span className="font-semibold text-[var(--ink)]">{src.title}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        <form onSubmit={sendMessage} className="border-t border-[var(--line)] p-4 bg-[#faf7f0]">
          <div className="flex gap-2">
            <input
              className="flex-1 rounded-lg border border-[var(--line)] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand)]"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Pose ta question (ex. : qu&apos;est-ce qu&apos;une suite auxiliaire ?)"
              disabled={sending || !activeId}
            />
            <button
              disabled={!input.trim() || sending || !activeId}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                sending || !activeId
                  ? "bg-[#ccc4b6] text-[var(--ink-soft)] cursor-not-allowed"
                  : "bg-[var(--brand)] text-white hover:bg-[#0b4cc6]"
              }`}
            >
              Envoyer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
