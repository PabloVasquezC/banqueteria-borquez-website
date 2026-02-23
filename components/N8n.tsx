"use client"
import { useEffect } from "react"



export function N8nChat() {
  useEffect(() => {
    // Dynamically import the n8n chat CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/n8n/chat.css';
    document.head.appendChild(link);

    import("@n8n/chat").then(({ createChat }) => {
      createChat({
        webhookUrl:
          "https://n8n.fluxia.cl/webhook/a075f34c-9de6-4522-9bf8-a8c296ecea97/chat",
        mode: "window",
        chatInputKey: "chatInput",
        chatSessionKey: "sessionId",
        loadPreviousSession: true,
        showWelcomeScreen: false,
        initialMessages: [
          "👋 Hola! Soy el asistente virtual de Borquez Banqueteria y estoy aquí para ayudarte."
        ],
        i18n: {
          en: {
            title: "Borquez Banqueteria",
            subtitle: "Asistencia Virtual",
            inputPlaceholder: "Escribe aqui.",
            footer: "Implementado por Fluxia [https://fluxia.cl]",
            getStarted: "Comenzar",
            closeButtonTooltip: "Cerrar",
          },
        },
      });
    });
  }, []);

  return (
    <div className="fixed bottom-24 right-6 z-40 hidden md:block">
      <div className="relative rounded-lg border border-gold/20 bg-background/90 p-4 shadow-lg backdrop-blur-md">
        <p className="text-xs font-medium text-foreground">
          ¿Tienes dudas? <span className="text-gold">¡Hablemos!</span>
        </p>
        {/* Triangle arrow pointing down */}
        <div className="absolute -bottom-2 right-6 h-4 w-4 rotate-45 border-b border-r border-gold/20 bg-background/90"></div>
      </div>
    </div>
  );
}
