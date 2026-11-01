import { NextResponse } from "next/server";
import { getStudent } from "@/lib/data";
import { createConversation, listConversations } from "@/lib/ai";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const student = await getStudent();
    const conversations = await listConversations(student.id);
    return NextResponse.json({ conversations });
  } catch {
    return NextResponse.json({ error: "Erreur lors du chargement des conversations." }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const student = await getStudent();
    const { title } = (await req.json()) as { title?: string };
    const conversation = await createConversation(student.id, title ?? "Nouvelle conversation");
    return NextResponse.json({ conversation });
  } catch {
    return NextResponse.json({ error: "Erreur lors de la création de la conversation." }, { status: 500 });
  }
}
