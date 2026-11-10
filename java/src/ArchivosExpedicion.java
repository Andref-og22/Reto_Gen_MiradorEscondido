import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;

final class ArchivosExpedicion {
    private ArchivosExpedicion() {
    }

    static void escribir(String archivo, String contenido) throws IOException {
        Path carpetaWeb = Path.of("web");
        if (!Files.isRegularFile(Path.of("ABRIR-PRIMERO.html")) || !Files.isDirectory(carpetaWeb)) {
            throw new IOException("Ejecuta desde la carpeta que contiene ABRIR-PRIMERO.html y web.");
        }
        Files.writeString(carpetaWeb.resolve(archivo), contenido, StandardCharsets.UTF_8);
    }

    static void guardarAvance(int total) throws IOException {
        escribir("avance-pruebas.js", "const avancePruebas = { total: " + total + " };\n");
    }
}
