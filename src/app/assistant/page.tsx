import { AIAssistant } from "@/components/ai-assistant";
import { PageHeader, PageShell } from "@/components/ui";

export default function AssistantPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Assistant pédagogique"
        title="Pose tes questions à l&apos;assistant Bac Coach"
        description={
          <p>
            L&apos;assistant s&apos;appuie sur les fiches de cours du programme officiel tunisien pour répondre à tes questions
            sur une notion, t&apos;indiquer la méthode d&apos;un exercice ou te diriger vers le bon quiz. Il garde l&apos;historique de
            tes conversations, lié à ton compte.
          </p>
        }
      />
      <AIAssistant />
    </PageShell>
  );
}
