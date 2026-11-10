import java.io.IOException;

// Apoyo de la expedición. Compara resultados y comunica el avance a la página.
final class VerificadorRutas {
    private int comprobaciones;

    VerificadorRutas() {
        guardar(0);
    }

    void verificar(String caso, boolean esperado, boolean obtenido) {
        if (esperado != obtenido) {
            throw new AssertionError(caso + " | Esperado: " + esperado + " | Obtenido: " + obtenido);
        }
        comprobaciones++;
        System.out.println("OK | " + caso);
    }

    void finalizar() {
        if (comprobaciones != 2) {
            System.out.println("Pendiente: escribe dos comprobaciones en PruebaRutas.java.");
            return;
        }
        guardar(2);
        System.out.println("Dos comprobaciones pasaron. Vuelve a ABRIR-PRIMERO.html.");
    }

    private void guardar(int total) {
        try {
            ArchivosExpedicion.guardarAvance(total);
        } catch (IOException error) {
            throw new IllegalStateException(error.getMessage(), error);
        }
    }
}
