public class Sendero extends Ruta {
    public Sendero() {
        super("sendero");
    }

    @Override
    public boolean estaDisponible(ReporteParque reporte) {
        // PARADA 3: esta ruta abre únicamente cuando no ha llovido.
        return true;
    }

    @Override
    public String motivoDeCierre() {
        return "El sendero está cerrado por lluvia.";
    }
}
