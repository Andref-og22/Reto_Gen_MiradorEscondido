public abstract class Ruta {
    private final String id;

    protected Ruta(String id) {
        this.id = id;
    }

    public String getId() {
        return id;
    }

    public abstract boolean estaDisponible(ReporteParque reporte);

    public abstract String motivoDeCierre();
}
