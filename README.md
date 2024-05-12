
---

# 365: Una canción para cada día

Este proyecto proporciona una canción diferente para cada día del año. Utiliza la API de YouTube para obtener una lista de reproducción especial y selecciona la canción correspondiente al día actual.
También incluye frases relacionadas con la música para acompañar la experiencia.
Perfecto para dedicarle a alguien.

## Cómo funciona

El proyecto utiliza HTML, CSS y JavaScript para crear una interfaz simple pero atractiva que muestra la canción del día junto con una cita inspiradora relacionada con la música.

### Archivos principales

- `index.html`: Contiene la estructura HTML de la aplicación, incluyendo los elementos visuales y los scripts necesarios.
- `styles.css`: Archivo CSS que proporciona estilos para la interfaz de usuario.
- `scripts/api.js`: Script JavaScript que maneja las llamadas a la API de YouTube para obtener la lista de reproducción y el video correspondiente al día. Incluso, puedes mandarle la canción que desees a través de la url.
- `scripts/quotes.js`: Script JavaScript que contiene una serie de citas inspiradoras relacionadas con la música.
- `scripts/text-change.js`: Script JavaScript que anima el texto del título principal para alternar entre "días" y "canciones".

### Otros archivos

- `assets/`: Directorio que contiene imágenes y otros recursos utilizados en la interfaz.
- `globals.js`: Archivo JavaScript que define variables globales como el ID de la lista de reproducción de YouTube y la clave de la API.

## Contribución

Si deseas contribuir a este proyecto, no dudes en enviar un pull request. ¡Estamos abiertos a nuevas ideas y mejoras!

## Autor

Este proyecto fue creado por [101rockyprojects](https://github.com/101rockyprojects).

## Elige la canción que desees:
El proyecto permite a través del parámetro `song` elegir la canción que desees dedicar con ayuda del id del video de dicho video en Youtube (la serie de caracteres luego del `watch?v=`).
### Ejemplo:

[Ejemplo práctico](https://101rockyprojects.github.io/365-days/?song=o-YBDTqX_ZU)
```
https://101rockyprojects.github.io/365-days/?song=o-YBDTqX_ZU
```
---