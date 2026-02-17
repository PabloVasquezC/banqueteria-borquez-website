"use client"
import { useEffect } from "react"
import "@/app/globals.css"


export function N8nChat() {
  useEffect(() => {
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

  return null;
}
