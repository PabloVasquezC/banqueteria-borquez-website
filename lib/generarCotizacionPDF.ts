import { jsPDF } from "jspdf";

export interface DatosCotizacion {
    nombre: string;
    email: string;
    telefono: string;
    fecha: string;
    consultas?: string;
}

// Logo SVG de Borquez como data URI (base64)
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
const LOGO_SVG_BASE64 = "data:image/svg+xml;base64," + btoa(LOGO_SVG_STR);

function drawSectionHeader(
    doc: jsPDF,
    title: string,
    y: number,
    accentColor: [number, number, number],
    lightBg: [number, number, number]
): void {
    doc.setFillColor(...lightBg);
    doc.roundedRect(15, y - 5, 180, 9, 1, 1, "F");
    doc.setFillColor(...accentColor);
    doc.rect(15, y - 5, 3, 9, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(...accentColor);
    doc.text(title, 22, y + 0.5);
}

function drawDataRow(
    doc: jsPDF,
    label: string,
    value: string,
    x: number,
    y: number,
    labelWidth: number
): void {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(100, 90, 70);
    doc.text(label, x, y);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(30, 30, 30);
    doc.text(value || "—", x + labelWidth, y);
}

export async function generarCotizacionPDF(datos: DatosCotizacion): Promise<void> {
    const doc = new jsPDF({ unit: "mm", format: "a4" });

    // --- Paleta ---
    const dark: [number, number, number] = [22, 18, 12];
    const gold: [number, number, number] = [180, 140, 72];
    const goldLight: [number, number, number] = [201, 168, 76];
    const paperBg: [number, number, number] = [252, 250, 246];
    const sectionBg: [number, number, number] = [245, 241, 232];
    const white: [number, number, number] = [255, 255, 255];

    const pageW = doc.internal.pageSize.width;
    const pageH = doc.internal.pageSize.height;

    // --- Número y fecha de cotización ---
    const hoy = new Date();
    const fechaEmision = `${String(hoy.getDate()).padStart(2, "0")}/${String(hoy.getMonth() + 1).padStart(2, "0")}/${hoy.getFullYear()}`;
    const nroCotizacion = `BBQ-${hoy.getFullYear()}${String(hoy.getMonth() + 1).padStart(2, "0")}${String(hoy.getDate()).padStart(2, "0")}-${Math.floor(Math.random() * 9000) + 1000}`;
    const nombreArchivo = datos.nombre.replace(/[^a-zA-Z0-9]/g, "_");

    // Fondo general
    doc.setFillColor(...paperBg);
    doc.rect(0, 0, pageW, pageH, "F");

    // Header — oscuro con franja dorada
    doc.setFillColor(...dark);
    doc.rect(0, 0, pageW, 52, "F");
    doc.setFillColor(...gold);
    doc.rect(0, 50, pageW, 2, "F");

    // Logo
    try {
        doc.addImage(LOGO_SVG_BASE64, "SVG", 12, 8, 24, 24);
    } catch {
        doc.setDrawColor(...goldLight);
        doc.setLineWidth(0.8);
        doc.circle(24, 20, 10, "S");
    }

    // Nombre empresa
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.setTextColor(...white);
    doc.text("BÓRQUEZ", 42, 20);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(...gold);
    doc.setCharSpace(3);
    doc.text("B A N Q U E T E R Í A", 42, 27);
    doc.setCharSpace(0);

    // Título derecho
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor(...white);
    doc.text("COTIZACIÓN", pageW - 15, 20, { align: "right" });
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(...gold);
    doc.text(`N° ${nroCotizacion}`, pageW - 15, 29, { align: "right" });
    doc.setTextColor(160, 150, 130);
    doc.text(`Emitida: ${fechaEmision}`, pageW - 15, 36, { align: "right" });

    // ============================================================
    // SECCIÓN: DATOS DE CONTACTO
    // ============================================================
    let y = 64;
    drawSectionHeader(doc, "DATOS DE CONTACTO", y, gold, sectionBg);
    y += 13;

    doc.setFillColor(...white);
    doc.setDrawColor(225, 215, 195);
    doc.setLineWidth(0.3);
    doc.roundedRect(15, y - 4, 180, 30, 2, 2, "FD");
    doc.setDrawColor(225, 215, 195);
    doc.line(105, y - 4, 105, y + 26);

    drawDataRow(doc, "Nombre:", datos.nombre, 20, y + 5, 22);
    drawDataRow(doc, "Email:", datos.email, 20, y + 15, 22);
    drawDataRow(doc, "Teléfono:", datos.telefono, 112, y + 5, 24);

    y += 38;

    // ============================================================
    // SECCIÓN: DETALLES SOLICITADOS
    // ============================================================
    drawSectionHeader(doc, "DETALLES SOLICITADOS", y, gold, sectionBg);
    y += 13;

    doc.setFillColor(...white);
    doc.setDrawColor(225, 215, 195);
    doc.setLineWidth(0.3);
    doc.roundedRect(15, y - 4, 180, 20, 2, 2, "FD");

    let fechaEvento = datos.fecha || "Por confirmar";
    if (datos.fecha) {
        const [yyyy, mm, dd] = datos.fecha.split("-");
        const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
        const mesNombre = meses[parseInt(mm, 10) - 1] ?? mm;
        fechaEvento = `${dd} de ${mesNombre} de ${yyyy}`;
    }
    drawDataRow(doc, "Fecha del Evento:", fechaEvento, 20, y + 7, 34);

    y += 32;

    // ============================================================
    // SECCIÓN: OBSERVACIONES
    // ============================================================
    if (datos.consultas && datos.consultas.trim()) {
        drawSectionHeader(doc, "CONSULTAS / OBSERVACIONES", y, gold, sectionBg);
        y += 13;
        const lines = doc.splitTextToSize(datos.consultas.trim(), 168);
        const boxH = Math.max(20, lines.length * 5.5 + 10);
        doc.setFillColor(...white);
        doc.setDrawColor(225, 215, 195);
        doc.roundedRect(15, y - 4, 180, boxH, 2, 2, "FD");
        doc.setFont("helvetica", "italic");
        doc.setFontSize(9.5);
        doc.setTextColor(60, 55, 45);
        doc.text(lines, 22, y + 5);
        y += boxH + 12;
    }

    // ============================================================
    // BOX IMPORTANTE & PIE
    // ============================================================
    y = Math.max(y, 210);
    doc.setFillColor(255, 252, 242);
    doc.setDrawColor(...gold);
    doc.roundedRect(15, y, 180, 22, 2, 2, "FD");
    doc.setFillColor(...gold);
    doc.circle(24, y + 11, 4, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(...white);
    doc.text("!", 24, y + 13.5, { align: "center" });
    doc.setFontSize(8);
    doc.setTextColor(...gold);
    doc.text("IMPORTANTE", 32, y + 8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80, 70, 55);
    const notaLines = doc.splitTextToSize("Esta cotización es una propuesta preliminar. Los precios finales se confirmarán tras una reunión con nuestro equipo.", 148);
    doc.text(notaLines, 32, y + 16);

    doc.setFillColor(...dark);
    doc.rect(0, pageH - 22, pageW, 22, "F");
    doc.setFillColor(...gold);
    doc.rect(0, pageH - 22, pageW, 1.5, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(...gold);
    doc.text("BÓRQUEZ BANQUETERÍA", pageW / 2, pageH - 13, { align: "center" });
    doc.setFont("helvetica", "normal");
    doc.setFontSize(6.5);
    doc.setTextColor(150, 140, 120);
    doc.text("www.borquezbanqueteria.cl  ·  Banquetería & Eventos", pageW / 2, pageH - 7, { align: "center" });

    doc.save(`Cotizacion_Borquez_${nombreArchivo}.pdf`);
}
