public class Teleferico extends Ruta {
    public Teleferico() {
        super("teleferico");
    }

    @Override
    public boolean estaDisponible(ReporteParque reporte) {
        // PARADA 3: esta ruta abre únicamente cuando no hay mantenimiento.
        return true;
    }

    @Override
    public String motivoDeCierre() {
        return "El teleférico está cerrado por mantenimiento.";
    }
}
