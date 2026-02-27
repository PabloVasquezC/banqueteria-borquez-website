import { NextResponse } from "next/server";
import { Resend } from "resend";
import { jsPDF } from "jspdf";

const TIPO_LABELS: Record<string, string> = {
    matrimonio: "Matrimonio",
    empresa: "Evento Corporativo",
    aniversario: "Aniversario",
    otro: "Otro",
};

interface DatosCotizacion {
    nombre: string;
    email: string;
    telefono: string;
    fecha: string;
    tipo: string;
    cantidad: string;
    consultas?: string;
}

function generarPDFBuffer(datos: DatosCotizacion): Buffer {
    const doc = new jsPDF();

    const primaryColor: [number, number, number] = [18, 18, 18];
    const accentColor: [number, number, number] = [180, 140, 80];
    const lightGray: [number, number, number] = [245, 245, 242];

    const hoy = new Date();
    const fechaTexto = `${String(hoy.getDate()).padStart(2, "0")}/${String(hoy.getMonth() + 1).padStart(2, "0")}/${hoy.getFullYear()}`;
    const nroCotizacion = `BBQ-${hoy.getFullYear()}${String(hoy.getMonth() + 1).padStart(2, "0")}${String(hoy.getDate()).padStart(2, "0")}-${Math.floor(Math.random() * 9000) + 1000}`;

    // Banner superior
    doc.setFillColor(...primaryColor);
    doc.rect(0, 0, 210, 38, "F");

    doc.setFillColor(...accentColor);
    doc.rect(0, 36, 210, 2, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(255, 255, 255);
    doc.text("COTIZACIÓN DE EVENTO", 15, 18);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(180, 140, 80);
    doc.text("BORQUEZ BANQUETERÍA · EVENTOS DE EXCELENCIA", 15, 28);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(200, 200, 200);
    doc.text(`N° ${nroCotizacion}`, 195, 18, { align: "right" });
    doc.setFont("helvetica", "normal");
    doc.text(`Fecha: ${fechaTexto}`, 195, 26, { align: "right" });

    // Información del cliente
    let y = 52;

    doc.setFillColor(...lightGray);
    doc.rect(15, y - 5, 180, 7, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(...accentColor);
    doc.text("INFORMACIÓN DEL CLIENTE", 18, y);

    doc.setDrawColor(...accentColor);
    doc.setLineWidth(0.5);
    doc.line(15, y + 2, 195, y + 2);

    y += 10;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(40, 40, 40);

    doc.setFont("helvetica", "bold");
    doc.text("Nombre:", 15, y);
    doc.setFont("helvetica", "normal");
    doc.text(datos.nombre, 42, y);

    doc.setFont("helvetica", "bold");
    doc.text("Email:", 15, y + 7);
    doc.setFont("helvetica", "normal");
    doc.text(datos.email, 42, y + 7);

    doc.setFont("helvetica", "bold");
    doc.text("Teléfono:", 110, y);
    doc.setFont("helvetica", "normal");
    doc.text(datos.telefono, 135, y);

    y += 18;

    // Detalles del evento
    doc.setFillColor(...lightGray);
    doc.rect(15, y - 5, 180, 7, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(...accentColor);
    doc.text("DETALLES DEL EVENTO", 18, y);

    doc.setDrawColor(...accentColor);
    doc.line(15, y + 2, 195, y + 2);

    y += 10;

    const tipoLabel = TIPO_LABELS[datos.tipo] || datos.tipo || "—";
    const filas = [
        { label: "Tipo de Evento:", valor: tipoLabel, col: "left" },
        { label: "Fecha del Evento:", valor: datos.fecha || "Por confirmar", col: "right" },
        { label: "N° de Invitados:", valor: `${datos.cantidad} personas`, col: "left" },
    ];

    doc.setFontSize(10);
    doc.setTextColor(40, 40, 40);

    filas.forEach((f, i) => {
        const xLabel = f.col === "left" ? 15 : 110;
        const xValor = f.col === "left" ? 52 : 152;
        const row = Math.floor(i / 2);
        const yRow = y + row * 8;

        doc.setFont("helvetica", "bold");
        doc.text(f.label, xLabel, yRow);
        doc.setFont("helvetica", "normal");
        doc.text(f.valor, xValor, yRow);
    });

    y += 20;

    // Observaciones
    if (datos.consultas && datos.consultas.trim()) {
        doc.setFillColor(...lightGray);
        doc.rect(15, y - 5, 180, 7, "F");
        doc.setFont("helvetica", "bold");
        doc.setFontSize(8);
        doc.setTextColor(...accentColor);
        doc.text("CONSULTAS / OBSERVACIONES", 18, y);

        doc.setDrawColor(...accentColor);
        doc.line(15, y + 2, 195, y + 2);

        y += 10;

        doc.setFont("helvetica", "italic");
        doc.setFontSize(9);
        doc.setTextColor(80, 80, 80);

        const lines = doc.splitTextToSize(datos.consultas, 175);
        doc.text(lines, 18, y);
        y += lines.length * 5 + 8;
    }

    // Box importante
    y = Math.max(y, 200);
    doc.setDrawColor(...accentColor);
    doc.setLineWidth(0.3);
    doc.setFillColor(252, 249, 243);
    doc.roundedRect(15, y, 180, 20, 2, 2, "FD");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(...accentColor);
    doc.text("IMPORTANTE:", 20, y + 7);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(80, 80, 80);
    doc.text(
        "Esta cotización es una propuesta preliminar. Los precios finales se confirmarán tras una reunión con nuestro equipo.",
        20,
        y + 14
    );

    // Pie de página
    const pageH = doc.internal.pageSize.height;

    doc.setFillColor(...primaryColor);
    doc.rect(0, pageH - 20, 210, 20, "F");

    doc.setFillColor(...accentColor);
    doc.rect(0, pageH - 20, 210, 1, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(180, 140, 80);
    doc.text("BORQUEZ BANQUETERÍA", 105, pageH - 13, { align: "center" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(160, 160, 160);
    doc.text("www.borquezbanqueteria.cl · Eventos privados y corporativos", 105, pageH - 7, {
        align: "center",
    });

    // Retornar como Buffer
    const pdfArrayBuffer = doc.output("arraybuffer");
    return Buffer.from(pdfArrayBuffer);
}

export async function POST(req: Request) {
    try {
        if (!process.env.RESEND_API_KEY) {
            console.error("RESEND_API_KEY is not defined");
            return NextResponse.json({ error: "Configuración de correo incompleta" }, { status: 500 });
        }

        const resend = new Resend(process.env.RESEND_API_KEY);

        const body = await req.json();
        const datos: DatosCotizacion = { ...body };


        const pdfBuffer = generarPDFBuffer(datos);
        const nombreArchivo = `Cotizacion_Borquez_${datos.nombre.replace(/[^a-zA-Z0-9]/g, "_")}.pdf`;

        const { error } = await resend.emails.send({
            from: "Borquez Banquetería <onboarding@resend.dev>",
            to: [
                "vascor.pablo@gmail.com",
                // "practica.sercotec@gmail.com", // habilitar cuando el dominio esté verificado en resend.com/domains
            ],
            subject: `Nueva Cotización de ${datos.nombre} — ${TIPO_LABELS[datos.tipo] || datos.tipo}`,
            html: `
        <div style="font-family: sans-serif; color: #333; max-width: 600px; margin: 0 auto;">
          <div style="background: #121212; padding: 24px 32px; border-bottom: 2px solid #b48c50;">
            <h1 style="color: #b48c50; margin: 0; font-size: 20px; letter-spacing: 2px;">BORQUEZ BANQUETERÍA</h1>
            <p style="color: #aaa; margin: 4px 0 0; font-size: 12px;">NUEVA SOLICITUD DE COTIZACIÓN</p>
          </div>
          <div style="padding: 32px;">
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr><td style="color: #888; padding: 6px 0; width: 40%;">Nombre</td><td style="font-weight: bold;">${datos.nombre}</td></tr>
              <tr><td style="color: #888; padding: 6px 0;">Email</td><td>${datos.email}</td></tr>
              <tr><td style="color: #888; padding: 6px 0;">Teléfono</td><td>${datos.telefono}</td></tr>
              <tr><td style="color: #888; padding: 6px 0;">Tipo de evento</td><td>${TIPO_LABELS[datos.tipo] || datos.tipo}</td></tr>
              <tr><td style="color: #888; padding: 6px 0;">Fecha del evento</td><td>${datos.fecha}</td></tr>
              <tr><td style="color: #888; padding: 6px 0;">N° invitados</td><td>${datos.cantidad} personas</td></tr>

              ${datos.consultas ? `<tr><td style="color: #888; padding: 6px 0; vertical-align: top;">Observaciones</td><td>${datos.consultas}</td></tr>` : ""}
            </table>
            <p style="margin-top: 24px; font-size: 13px; color: #666;">El PDF de cotización completo se adjunta a este correo.</p>
          </div>
          <div style="background: #f5f5f2; padding: 16px 32px; text-align: center; font-size: 11px; color: #999;">
            Borquez Banquetería · www.borquezbanqueteria.cl
          </div>
        </div>
      `,
            attachments: [
                {
                    filename: nombreArchivo,
                    content: pdfBuffer,
                },
            ],
        });

        if (error) {
            console.error("Error enviando email:", error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ ok: true });
    } catch (err) {
        console.error("Error en /api/send-cotizacion:", err);
        return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
    }
}
