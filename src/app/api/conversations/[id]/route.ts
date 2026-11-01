import { NextResponse } from "next/server";
import { getStudent } from "@/lib/data";
import { getConversation, getMessages } from "@/lib/ai";

export const dynamic = "force-dynamic";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const student = await getStudent();
    const conversation = await getConversation(Number(id), student.id);
    if (!conversation) {
      return NextResponse.json({ error: "Conversation introuvable." }, { status: 404 });
    }
    const messages = await getMessages(conversation.id);
    return NextResponse.json({ conversation, messages });
  } catch {
    return NextResponse.json({ error: "Erreur lors du chargement des messages." }, { status: 500 });
  }
}
