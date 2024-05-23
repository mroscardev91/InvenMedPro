# InvenMed Pro

InvenMed Pro es una solución integral diseñada para mejorar la gestión de inventarios y la relación con los pacientes en entornos médicos. Este proyecto busca facilitar las operaciones diarias en clínicas y hospitales, proporcionando herramientas eficientes y fáciles de usar.

## Características

- **Gestión de Inventarios:** Control detallado de los productos médicos, incluyendo entradas, salidas y stock actual.
- **Historial de Pacientes:** Registro completo de la información y el historial médico de los pacientes.
- **Alertas y Notificaciones:** Recordatorios automáticos para reabastecimiento de inventarios y citas de pacientes.
- **Informes y Estadísticas:** Generación de informes detallados sobre el uso de inventarios y estadísticas de pacientes.

## Requisitos del Sistema

- **Servidor Web:** Apache o Nginx
- **PHP:** Versión 7.4 o superior
- **Base de Datos:** MySQL 5.7 o superior
- **Node.js y npm:** Para la gestión de dependencias frontend

## Instalación

1. Clona este repositorio:
    ```bash
    git clone https://github.com/mroscardev91/InvenMedPro.git
    ```

2. Navega al directorio del proyecto:
    ```bash
    cd InvenMedPro
    ```

3. Instala las dependencias de PHP:
    ```bash
    composer install
    ```

4. Instala las dependencias de JavaScript:
    ```bash
    npm install
    ```

5. Configura el archivo de entorno `.env`:
    ```bash
    cp .env.example .env
    ```
   Luego, ajusta los parámetros de configuración según tu entorno.

6. Genera la clave de la aplicación:
    ```bash
    php artisan key:generate
    ```

7. Ejecuta las migraciones de la base de datos:
    ```bash
    php artisan migrate
    ```

8. Inicia el servidor de desarrollo:
    ```bash
    php artisan serve
    ```

## Uso

- **Dashboard:** Accede al panel principal para tener una vista general del estado del inventario
- **Gestión de Inventarios:** Añade, edita o elimina productos del inventario. Gestiona stock entrada y salida
- **Informes:** Genera y exporta informes en diferentes formatos (PDF, Excel).

## Contribución

¡Las contribuciones son bienvenidas! Por favor, sigue estos pasos:

1. Haz un fork del proyecto.
2. Crea una nueva rama (`git checkout -b feature/nueva-caracteristica`).
3. Realiza tus cambios y haz commit (`git commit -am 'Añadir nueva característica'`).
4. Haz push a la rama (`git push origin feature/nueva-caracteristica`).
5. Abre un Pull Request.

## Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.

Para más información, visita el [repositorio del proyecto en GitHub](https://github.com/mroscardev91/InvenMedPro).

