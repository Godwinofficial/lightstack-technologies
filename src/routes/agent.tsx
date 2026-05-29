import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { AIAgentChat } from "@/components/AIAgentChat";

export const Route = createFileRoute("/agent")({
  head: () => ({
    meta: [
      { title: "Interactive AI Agent | Lightstack" },
      {
        name: "description",
        content:
          "Interact with Aletheia, the virtual AI consultant of Lightstack Technologies. Consult via text or enter Live Voice Mode to speak naturally.",
      },
    ],
  }),
  component: AgentPage,
});

function AgentPage() {
  return (
    <div className="min-h-screen bg-white text-[#001c4a] font-sans">
      <SiteHeader solid />
      <main className="flex flex-col">
        <AIAgentChat />
        <SiteFooter />
      </main>
    </div>
  );
}
