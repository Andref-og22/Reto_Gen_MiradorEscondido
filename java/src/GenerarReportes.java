import java.io.IOException;
import java.util.List;

// Apoyo de la expedición. Ejecuta esta clase después de completar las rutas.
public class GenerarReportes {
    public static void main(String[] args) throws IOException {
        List<Ruta> rutas = RutasDelParque.crear();
        String salida = "const reportesParque = {\n";

        for (String codigo : List.of("A", "B", "C")) {
            ReporteParque reporte = obtenerReporte(codigo);
            salida += "  " + codigo + ": {\n";
            salida += "    nombre: \"" + reporte.getNombre() + "\",\n";
            salida += "    rutas: [\n";
            for (Ruta ruta : rutas) {
                boolean disponible = ruta.estaDisponible(reporte);
                String motivo = disponible ? "" : ruta.motivoDeCierre();
                salida += "      { id: \"" + ruta.getId() + "\", disponible: "
                        + disponible + ", motivo: \"" + motivo + "\" },\n";
            }
            salida += "    ]\n  },\n";
        }
        salida += "};\n";

        ArchivosExpedicion.guardarAvance(0);
        ArchivosExpedicion.escribir("reportes.js", salida);
        System.out.println("Reportes A, B y C guardados en web/reportes.js.");
    }

    private static ReporteParque obtenerReporte(String codigo) {
        return switch (codigo) {
            case "A" -> new ReporteParque("Reporte A · Llovió", true, false);
            case "B" -> new ReporteParque("Reporte B · Teleférico en mantenimiento", false, true);
            case "C" -> new ReporteParque("Reporte C · Lluvia y mantenimiento", true, true);
            default -> throw new IllegalArgumentException("Usa el reporte A, B o C.");
        };
    }
}
