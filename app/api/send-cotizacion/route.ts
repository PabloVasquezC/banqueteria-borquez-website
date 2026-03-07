import { NextResponse } from "next/server";
import { Resend } from "resend";
import { jsPDF } from "jspdf";

interface DatosCotizacion {
    nombre: string;
    email: string;
    telefono: string;
    fecha: string;
    consultas?: string;
}

const LOGO_SVG_STR = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" fill="none">
  <circle cx="60" cy="60" r="56" stroke="#C9A84C" stroke-width="1.5" stroke-dasharray="4 3" opacity="0.5"/>
  <path d="M28 78 L92 78 L88 58 L74 70 L60 44 L46 70 L32 58 Z"
        fill="none" stroke="#C9A84C" stroke-width="2" stroke-linejoin="round"/>
  <circle cx="60" cy="42" r="4" fill="#C9A84C" opacity="0.9"/>
  <circle cx="30" cy="56" r="3" fill="#C9A84C" opacity="0.7"/>
  <circle cx="90" cy="56" r="3" fill="#C9A84C" opacity="0.7"/>
  <rect x="26" y="78" width="68" height="4" rx="2" fill="#C9A84C" opacity="0.8"/>
  <rect x="30" y="84" width="60" height="2" rx="1" fill="#C9A84C" opacity="0.4"/>
</svg>`;
const LOGO_SVG_BASE64 = "data:image/svg+xml;base64," + Buffer.from(LOGO_SVG_STR).toString("base64");

function drawSectionHeader(doc: jsPDF, title: string, y: number, gold: [number, number, number], sectionBg: [number, number, number]): void {
    doc.setFillColor(...sectionBg);
    doc.roundedRect(15, y - 5, 180, 9, 1, 1, "F");
    doc.setFillColor(...gold);
    doc.rect(15, y - 5, 3, 9, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(...gold);
    doc.text(title, 22, y + 0.5);
}

function drawDataRow(doc: jsPDF, label: string, value: string, x: number, y: number, labelWidth: number): void {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(100, 90, 70);
    doc.text(label, x, y);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(30, 30, 30);
    doc.text(value || "—", x + labelWidth, y);
}

function generarPDFBuffer(datos: DatosCotizacion): Buffer {
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    const dark: [number, number, number] = [22, 18, 12];
    const gold: [number, number, number] = [180, 140, 72];
    const paperBg: [number, number, number] = [252, 250, 246];
    const sectionBg: [number, number, number] = [245, 241, 232];
    const white: [number, number, number] = [255, 255, 255];
    const pageW = doc.internal.pageSize.width;
    const pageH = doc.internal.pageSize.height;

    const hoy = new Date();
    const fechaEmision = `${String(hoy.getDate()).padStart(2, "0")}/${String(hoy.getMonth() + 1).padStart(2, "0")}/${hoy.getFullYear()}`;
    const nroCotizacion = `BBQ-${hoy.getFullYear()}${String(hoy.getMonth() + 1).padStart(2, "0")}${String(hoy.getDate()).padStart(2, "0")}-${Math.floor(Math.random() * 9000) + 1000}`;

    doc.setFillColor(...paperBg);
    doc.rect(0, 0, pageW, pageH, "F");
    doc.setFillColor(...dark);
    doc.rect(0, 0, pageW, 52, "F");
    doc.setFillColor(...gold);
    doc.rect(0, 50, pageW, 2, "F");

    try { doc.addImage(LOGO_SVG_BASE64, "SVG", 12, 8, 24, 24); } catch { doc.setDrawColor(...gold); doc.circle(24, 20, 10, "S"); }

    doc.setFont("helvetica", "bold"); doc.setFontSize(20); doc.setTextColor(...white); doc.text("BÓRQUEZ", 42, 20);
    doc.setFont("helvetica", "normal"); doc.setFontSize(8); doc.setTextColor(...gold); doc.setCharSpace(3); doc.text("B A N Q U E T E R Í A", 42, 27); doc.setCharSpace(0);

    doc.setFont("helvetica", "bold"); doc.setFontSize(16); doc.setTextColor(...white); doc.text("COTIZACIÓN", pageW - 15, 20, { align: "right" });
    doc.setFont("helvetica", "normal"); doc.setFontSize(7.5); doc.setTextColor(...gold); doc.text(`N° ${nroCotizacion}`, pageW - 15, 29, { align: "right" });
    doc.setTextColor(160, 150, 130); doc.text(`Emitida: ${fechaEmision}`, pageW - 15, 36, { align: "right" });

    let y = 64;
    drawSectionHeader(doc, "DATOS DE CONTACTO", y, gold, sectionBg);
    y += 13;
    doc.setFillColor(...white); doc.setDrawColor(225, 215, 195); doc.setLineWidth(0.3); doc.roundedRect(15, y - 4, 180, 30, 2, 2, "FD");
    doc.line(105, y - 4, 105, y + 26);
    drawDataRow(doc, "Nombre:", datos.nombre, 20, y + 5, 22);
    drawDataRow(doc, "Email:", datos.email, 20, y + 15, 22);
    drawDataRow(doc, "Teléfono:", datos.telefono, 112, y + 5, 24);
    y += 38;

    drawSectionHeader(doc, "DETALLES SOLICITADOS", y, gold, sectionBg);
    y += 13;
    doc.setFillColor(...white); doc.setDrawColor(225, 215, 195); doc.roundedRect(15, y - 4, 180, 20, 2, 2, "FD");

    let fechaEvento = datos.fecha || "Por confirmar";
    if (datos.fecha) {
        const [yyyy, mm, dd] = datos.fecha.split("-");
        const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
        fechaEvento = `${dd} de ${meses[parseInt(mm, 10) - 1] ?? mm} de ${yyyy}`;
    }
    drawDataRow(doc, "Fecha del Evento:", fechaEvento, 20, y + 7, 34);
    y += 32;

    if (datos.consultas && datos.consultas.trim()) {
        drawSectionHeader(doc, "CONSULTAS / OBSERVACIONES", y, gold, sectionBg);
        y += 13;
        const lines = doc.splitTextToSize(datos.consultas.trim(), 168);
        const boxH = Math.max(20, lines.length * 5.5 + 10);
        doc.setFillColor(...white); doc.setDrawColor(225, 215, 195); doc.roundedRect(15, y - 4, 180, boxH, 2, 2, "FD");
        doc.setFont("helvetica", "italic"); doc.setFontSize(9.5); doc.setTextColor(60, 55, 45); doc.text(lines, 22, y + 5);
        y += boxH + 12;
    }

    y = Math.max(y, 210);
    doc.setFillColor(255, 252, 242); doc.setDrawColor(...gold); doc.roundedRect(15, y, 180, 22, 2, 2, "FD");
    doc.setFillColor(...gold); doc.circle(24, y + 11, 4, "F");
    doc.setFont("helvetica", "bold"); doc.setFontSize(9); doc.setTextColor(...white); doc.text("!", 24, y + 13.5, { align: "center" });
    doc.setFontSize(8); doc.setTextColor(...gold); doc.text("IMPORTANTE", 32, y + 8);
    const notaLines = doc.splitTextToSize("Esta cotización es una propuesta preliminar. Los precios finales se confirmarán tras una reunión con nuestro equipo.", 148);
    doc.setFont("helvetica", "normal"); doc.setTextColor(80, 70, 55); doc.text(notaLines, 32, y + 16);

    doc.setFillColor(...dark); doc.rect(0, pageH - 22, pageW, 22, "F");
    doc.setFillColor(...gold); doc.rect(0, pageH - 22, pageW, 1.5, "F");
    doc.setFont("helvetica", "bold"); doc.setFontSize(8); doc.setTextColor(...gold); doc.text("BÓRQUEZ BANQUETERÍA", pageW / 2, pageH - 13, { align: "center" });
    doc.setFont("helvetica", "normal"); doc.setFontSize(6.5); doc.setTextColor(150, 140, 120); doc.text("www.borquezbanqueteria.cl  ·  Banquetería & Eventos", pageW / 2, pageH - 7, { align: "center" });

    const pdfArrayBuffer = doc.output("arraybuffer");
    return Buffer.from(pdfArrayBuffer);
}

export async function POST(req: Request) {
    try {
        if (!process.env.RESEND_API_KEY) return NextResponse.json({ error: "Configuración de correo incompleta" }, { status: 500 });
        const resend = new Resend(process.env.RESEND_API_KEY);
        const body = await req.json();
        const datos: DatosCotizacion = {
            nombre: body.nombre,
            email: body.email,
            telefono: body.telefono,
            fecha: body.fecha,
            consultas: body.consultas
        };

        const pdfBuffer = generarPDFBuffer(datos);
        const nombreArchivo = `Cotizacion_Borquez_${datos.nombre.replace(/[^a-zA-Z0-9]/g, "_")}.pdf`;

        const { error } = await resend.emails.send({
            from: "Borquez Banquetería <onboarding@resend.dev>",
            to: ["vascor.pablo@gmail.com"],
            subject: `Nueva Cotización de ${datos.nombre}`,
            html: `
        <div style="font-family: sans-serif; color: #333; max-width: 600px; margin: 0 auto;">
          <div style="background: #16120c; padding: 24px 32px; border-bottom: 2px solid #b48c48;">
            <h1 style="color: #b48c48; margin: 0; font-size: 20px; letter-spacing: 2px;">BÓRQUEZ BANQUETERÍA</h1>
            <p style="color: #aaa; margin: 4px 0 0; font-size: 12px;">NUEVA SOLICITUD DE COTIZACIÓN</p>
          </div>
          <div style="padding: 32px;">
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr><td style="color: #888; padding: 6px 0; width: 40%;">Nombre</td><td style="font-weight: bold;">${datos.nombre}</td></tr>
              <tr><td style="color: #888; padding: 6px 0;">Email</td><td>${datos.email}</td></tr>
              <tr><td style="color: #888; padding: 6px 0;">Teléfono</td><td>${datos.telefono}</td></tr>
              <tr><td style="color: #888; padding: 6px 0;">Fecha del evento</td><td>${datos.fecha}</td></tr>
              ${datos.consultas ? `<tr><td style="color: #888; padding: 6px 0; vertical-align: top;">Observaciones</td><td>${datos.consultas}</td></tr>` : ""}
            </table>
            <p style="margin-top: 24px; font-size: 13px; color: #666;">El PDF de cotización completo se adjunta a este correo.</p>
          </div>
          <div style="background: #f5f5f2; padding: 16px 32px; text-align: center; font-size: 11px; color: #999;">
            Bórquez Banquetería · www.borquezbanqueteria.cl
          </div>
        </div>
      `,
            attachments: [{ filename: nombreArchivo, content: pdfBuffer }],
        });

        if (error) return NextResponse.json({ error: error.message }, { status: 500 });
        return NextResponse.json({ ok: true });
    } catch (err) {
        return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
    }
}
