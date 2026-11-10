import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class PruebaRutasJUnit {
    @Test
    void elSenderoAbreSiElDiaEstaSeco() {
        Ruta sendero = new Sendero();
        ReporteParque reporte = new ReporteParque("Día seco", false, false);

        assertTrue(sendero.estaDisponible(reporte));
    }

    @Test
    void elSenderoCierraSiLlovio() {
        Ruta sendero = new Sendero();
        ReporteParque reporte = new ReporteParque("Día lluvioso", true, false);

        // Completa esta comprobación con assertFalse y el resultado del sendero.
        throw new AssertionError("Completa el caso de lluvia");
    }
}
