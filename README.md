# Nombre del Proyecto

Descripción breve de tu proyecto. Esta es una API sencilla construida con Node.js, Express y Docker para proporcionar una base para el manejo de rutas con pruebas automatizadas y un pipeline CI/CD.

## Requisitos previos

Asegúrate de tener instalados los siguientes componentes antes de empezar:
- [Node.js](https://nodejs.org/) (versión 14 o superior)
- [npm](https://www.npmjs.com/) (versión 6 o superior)
- [Docker](https://www.docker.com/get-started)
- [Git](https://git-scm.com/)

## Instalación

Sigue estos pasos para configurar el proyecto localmente:

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/tu-repositorio.git
   cd tu-repositorio

2. Instala las dependencias del proyecto:
    npm instal

3. Configura el archivo .env en la raíz del proyecto. Crea un archivo .env y define las siguientes variables de entorno:
    PORT=4000
    ADMINISTRADOR=tu_nombre

## Uso

1. Ejecuta el servidor:
    npm start

2. El servidor se ejecutará en http://localhost:4000

3. Rutas disponibles:
    GET /: Devuelve "Hello, world!".
    GET /api: Devuelve { message: "API is running" }.
    GET /saludo: Devuelve un saludo basado en la variable ADMINISTRADOR del archivo .env.

## Testing

El proyecto incluye pruebas automatizadas con Jest y Supertest. Para ejecutar las pruebas:
    npm test

Pruebas cubiertas:
    GET /: Verifica que la ruta raíz responde con "Hello, world!".
    GET /api: Verifica que la ruta /api responde con el mensaje esperado.
    GET /saludo: Verifica que la ruta /saludo saluda correctamente basado en la variable de entorno ADMINISTRADOR.

# CI/CD

Este proyecto utiliza GitHub Actions para ejecutar un pipeline de CI/CD que se activa con cada push o pull request a la rama main.

El pipeline:
    1. Instala las dependencias.
    2. Ejecuta las pruebas automatizadas.
    3. (Opcional) Puede ser configurado para construir y desplegar la imagen Docker en DockerHub.

Puedes encontrar la configuración del pipeline en .github/workflows/ci-cd.yml.

# Docker

Puedes ejecutar este proyecto dentro de un contenedor Docker.

1. Construir la imagen:
    docker build -t nombre-de-tu-imagen .

2. Ejecutar el contenedor:
    docker run -p 4000:4000 --env-file .env nombre-de-tu-imagen

(Esto levantará el servidor en el puerto 4000, mapeado en tu máquina local al mismo puerto.)

# Contribuir

Si quieres contribuir al proyecto, sigue estos pasos:

    1. Crea un nuevo branch para tu funcionalidad:
        git checkout -b nueva-funcionalidad
    
    2. Realiza tus cambios y haz commit:
        git commit -m "Descripción de los cambios"
    
    3. Envía los cambios a tu repositorio remoto:
        git push origin nueva-funcionalidad
    
    4. Crea un Pull Request y explica tus cambios.

# Licencia

MIT License

Copyright (c) [2024] [Saúl García Calvo]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


