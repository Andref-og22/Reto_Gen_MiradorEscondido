public class PruebaRutas {
    public static void main(String[] args) {
        VerificadorRutas pruebas = new VerificadorRutas();
        Ruta sendero = new Sendero();
        ReporteParque diaSeco = new ReporteParque("Día seco", false, false);
        ReporteParque diaLluvioso = new ReporteParque("Día lluvioso", true, false);

        // PARADA 5: agrega dos llamadas a pruebas.verificar.
        // Cada llamada recibe el caso, el booleano esperado y el resultado del sendero.

        pruebas.finalizar();
    }
}
