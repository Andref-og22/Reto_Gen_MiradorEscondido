# Bonus · La misma prueba con JUnit 5

Haz este bonus después de que `PruebaRutas` pase. El núcleo de la aventura funciona con el JDK. Para el bonus necesitas JUnit 5, en un proyecto donde ya esté configurado o con el JAR de consola descargado.

1. Abre `PruebaRutasJUnit.java`. Un método ya comprueba el sendero en día seco.
2. Completa el segundo método con `assertFalse` para comprobar el día lluvioso.
3. Ejecuta ambas pruebas y relaciona sus resultados con las dos llamadas a `verificar` del desafío principal.

Si ya tienes JUnit en IntelliJ, agrega `java/src` como fuentes y este archivo como fuente de pruebas. Si prefieres terminal, descarga el [JAR de consola 1.11.4 de Maven Central](https://repo.maven.apache.org/maven2/org/junit/platform/junit-platform-console-standalone/1.11.4/junit-platform-console-standalone-1.11.4.jar). Guarda el JAR con ese nombre en la raíz extraída. Ejecuta desde esa raíz:

```text
javac --release 17 -encoding UTF-8 -cp junit-platform-console-standalone-1.11.4.jar -d java/out -sourcepath java/src bonus-junit5/PruebaRutasJUnit.java
java -jar junit-platform-console-standalone-1.11.4.jar execute --class-path java/out --select-class PruebaRutasJUnit
```

La [documentación de JUnit 5 sobre aserciones](https://docs.junit.org/5.11.4/user-guide/#writing-tests-assertions) muestra cómo comprobar un resultado esperado. La [sección Console Launcher](https://docs.junit.org/5.11.4/user-guide/#running-tests-console-launcher) explica cómo ejecutar una clase desde la terminal.
