public class ReporteParque {
    private final String nombre;
    private final boolean llovio;
    private final boolean telefericoEnMantenimiento;

    public ReporteParque(String nombre, boolean llovio, boolean telefericoEnMantenimiento) {
        this.nombre = nombre;
        this.llovio = llovio;
        this.telefericoEnMantenimiento = telefericoEnMantenimiento;
    }

    public String getNombre() {
        return nombre;
    }

    public boolean llovio() {
        return llovio;
    }

    public boolean telefericoEnMantenimiento() {
        return telefericoEnMantenimiento;
    }
}
