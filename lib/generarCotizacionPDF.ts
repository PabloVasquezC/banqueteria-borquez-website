import { jsPDF } from "jspdf";

export interface DatosCotizacion {
    nombre: string;
    email: string;
    telefono: string;
    fecha: string;
    tipo: string;
    cantidad: string;
    consultas?: string;
    servicios?: string[];
}

const TIPO_LABELS: Record<string, string> = {
    matrimonio: "Matrimonio",
    empresa: "Evento Corporativo",
    aniversario: "Aniversario",
    otro: "Otro",
};

export async function generarCotizacionPDF(datos: DatosCotizacion): Promise<void> {
    const doc = new jsPDF();

    // --- Paleta de Colores ---
    const primaryColor: [number, number, number] = [18, 18, 18];    // Negro casi puro (elegante)
    const accentColor: [number, number, number] = [180, 140, 80];   // Dorado (gold del tema)
    const lightGray: [number, number, number] = [245, 245, 242];    // Fondo suave papel

    // --- Fecha y número de cotización ---
    const hoy = new Date();
    const fechaTexto = `${String(hoy.getDate()).padStart(2, "0")}/${String(hoy.getMonth() + 1).padStart(2, "0")}/${hoy.getFullYear()}`;
    const nroCotizacion = `BBQ-${hoy.getFullYear()}${String(hoy.getMonth() + 1).padStart(2, "0")}${String(hoy.getDate()).padStart(2, "0")}-${Math.floor(Math.random() * 9000) + 1000}`;
    const nombreArchivo = datos.nombre.replace(/[^a-zA-Z0-9]/g, "_");

    // ============================================================
    // 1. FONDO SUPERIOR (Banner elegante)
    // ============================================================
    doc.setFillColor(...primaryColor);
    doc.rect(0, 0, 210, 38, "F");

    // Línea dorada decorativa inferior del banner
    doc.setFillColor(...accentColor);
    doc.rect(0, 36, 210, 2, "F");

    // Título
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(255, 255, 255);
    doc.text("COTIZACIÓN DE EVENTO", 15, 18);

    // Subtítulo / Empresa
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(180, 140, 80); // dorado
    doc.text("BORQUEZ BANQUETERÍA · EVENTOS DE EXCELENCIA", 15, 28);

    // Nro cotización a la derecha
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(200, 200, 200);
    doc.text(`N° ${nroCotizacion}`, 195, 18, { align: "right" });
    doc.setFont("helvetica", "normal");
    doc.text(`Fecha: ${fechaTexto}`, 195, 26, { align: "right" });

    // ============================================================
    // 2. SECCIÓN CLIENTE
    // ============================================================
    let y = 52;

    // Encabezado sección
    doc.setFillColor(...lightGray);
    doc.rect(15, y - 5, 180, 7, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(...accentColor);
    doc.text("INFORMACIÓN DEL CLIENTE", 18, y);

    // Línea dorada
    doc.setDrawColor(...accentColor);
    doc.setLineWidth(0.5);
    doc.line(15, y + 2, 195, y + 2);

    y += 10;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(40, 40, 40);

    // Columna izquierda
    doc.setFont("helvetica", "bold");
    doc.text("Nombre:", 15, y);
    doc.setFont("helvetica", "normal");
    doc.text(datos.nombre, 42, y);

    doc.setFont("helvetica", "bold");
    doc.text("Email:", 15, y + 7);
    doc.setFont("helvetica", "normal");
    doc.text(datos.email, 42, y + 7);

    // Columna derecha
    doc.setFont("helvetica", "bold");
    doc.text("Teléfono:", 110, y);
    doc.setFont("helvetica", "normal");
    doc.text(datos.telefono, 135, y);

    y += 18;

    // ============================================================
    // 3. DETALLES DEL EVENTO
    // ============================================================
    doc.setFillColor(...lightGray);
    doc.rect(15, y - 5, 180, 7, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(...accentColor);
    doc.text("DETALLES DEL EVENTO", 18, y);

    doc.setDrawColor(...accentColor);
    doc.line(15, y + 2, 195, y + 2);

    y += 10;

    // Grid de datos del evento
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

    // ============================================================
    // 4. SERVICIOS SOLICITADOS
    // ============================================================
    doc.setFillColor(...lightGray);
    doc.rect(15, y - 5, 180, 7, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(...accentColor);
    doc.text("SERVICIOS SOLICITADOS", 18, y);

    doc.setDrawColor(...accentColor);
    doc.line(15, y + 2, 195, y + 2);

    y += 10;

    const serviciosSeleccionados = datos.servicios && datos.servicios.length > 0
        ? datos.servicios
        : ["Sin servicios especificados"];

    doc.setFontSize(9);
    doc.setTextColor(50, 50, 50);

    serviciosSeleccionados.forEach((srv, i) => {
        const col = i % 2;
        const row = Math.floor(i / 2);
        const xPos = col === 0 ? 20 : 110;
        const yPos = y + row * 8;

        doc.setFillColor(...accentColor);
        doc.circle(xPos - 3, yPos - 2, 1.2, "F");

        doc.setFont("helvetica", "normal");
        doc.setTextColor(50, 50, 50);
        doc.text(srv, xPos, yPos);
    });

    y += Math.ceil(serviciosSeleccionados.length / 2) * 8 + 8;

    // ============================================================
    // 5. OBSERVACIONES
    // ============================================================
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

        // Ajustar texto largo automáticamente
        const lines = doc.splitTextToSize(datos.consultas, 175);
        doc.text(lines, 18, y);
        y += lines.length * 5 + 8;
    }

    // ============================================================
    // 6. BOX IMPORTANTE (nota de validez)
    // ============================================================
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
        y + 14,
    );

    // ============================================================
    // 7. PIE DE PÁGINA
    // ============================================================
    const pageH = doc.internal.pageSize.height;

    doc.setFillColor(...primaryColor);
    doc.rect(0, pageH - 20, 210, 20, "F");

    // Línea dorada superior del footer
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

    // ============================================================
    // GUARDAR
    // ============================================================
    doc.save(`Cotizacion_Borquez_${nombreArchivo}.pdf`);
}
