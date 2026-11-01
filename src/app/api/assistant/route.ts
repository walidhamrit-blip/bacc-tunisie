import { NextResponse } from "next/server";
import { getStudent } from "@/lib/data";
import {
  addMessage,
  createConversation,
  ensureConversation,
  generateAnswer,
  getMessages,
} from "@/lib/ai";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message, conversationId } = body as {
      message?: string;
      conversationId?: number | null;
    };

    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return NextResponse.json({ error: "message requis" }, { status: 400 });
    }

    const student = await getStudent();
    const conversation = await ensureConversation(student.id, conversationId ?? null);

    await addMessage(conversation.id, "user", message);

    const { answer, sources } = await generateAnswer(message);

    await addMessage(conversation.id, "assistant", answer);

    const messages = await getMessages(conversation.id);

    return NextResponse.json({
      conversationId: conversation.id,
      title: conversation.title,
      answer,
      sources,
      messages,
    });
  } catch (error) {
    console.error("[assistant api]", error);
    return NextResponse.json(
      { error: "Erreur lors de la génération de la réponse." },
      { status: 500 },
    );
  }
}
