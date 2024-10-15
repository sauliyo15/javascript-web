# API CRUD con Node.js, Express, Docker y CI/CD

Este proyecto es una API construida con **Node.js** y **Express**, que implementa un CRUD básico para gestionar usuarios. Además, cuenta con integración continua (CI/CD) utilizando **GitHub Actions** y contenedores **Docker**.


# Características

- Rutas de ejemplo (`/`, `/api`, `/saludo`).
- Rutas CRUD para usuarios.
- Contenedor Docker para despliegue.
- Tests automatizados con **Jest** y **Supertest**.
- Pipeline de CI/CD con GitHub Actions.


## Requisitos previos

Asegúrate de tener instalados los siguientes componentes antes de empezar:
- [Node.js](https://nodejs.org/) (versión 20 o superior)
- [npm](https://www.npmjs.com/) (versión 10 o superior)
- [Docker](https://www.docker.com/get-started)
- [Git](https://git-scm.com/)
- [MySQL](https://www.mysql.com/)


## Instalación y configuración

Sigue estos pasos para configurar el proyecto localmente:

1. Clona el repositorio:

        git clone https://github.com/sauliyo15/javascript-web.git
        cd javascript-web

2. Instala las dependencias del proyecto:

        npm install

3. Configura el archivo `.env` en la raíz del proyecto. Crea un archivo .env y define las siguientes variables de entorno:

        PORT=4000
        ADMINISTRADOR=tu_nombre

4. Configuración de la base de datos: este proyecto está diseñado para interactuar con una base de datos **MySQL** para gestionar usuarios.

    - Requisitos de la Base de Datos: asegúrate de tener una instancia de MySQL ejecutándose. Si no tienes MySQL instalado, puedes utilizar Docker para configurarlo rápidamente:

            docker run --name mysql-db -e MYSQL_ROOT_PASSWORD=admin -e MYSQL_DATABASE=mi_basedatos -p 3306:3306 -d mysql:latest

    - Configuración en el archivo `.env`:

            DB_HOST=localhost
            DB_USER=root
            DB_PASSWORD=admin
            DB_NAME=mi_basedatos

    - Estructura de la Base de Datos: la base de datos debe tener una tabla llamada usuarios con la siguiente estructura básica:

            CREATE TABLE usuarios (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nombre VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL
            );
    
    - Migraciones y Datos de Prueba: puedes insertar datos de prueba de forma manual o ejecutar migraciones automáticas si has configurado algún sistema de migración. Aquí tienes un ejemplo para insertar un usuario manualmente:

            INSERT INTO usuarios (nombre, email) VALUES ('John Doe', 'john@example.com');

    - Conexión y Pruebas: la API se conectará a la base de datos MySQL y podrás utilizar los endpoints CRUD para gestionar usuarios almacenados en dicha base de datos. No olvides que para las pruebas unitarias no es necesaria la base de datos real, ya que se usan mocks.


## Uso

1. Ejecuta el servidor:

        npm start

2. El servidor se ejecutará en `http://localhost:4000`

3. Endpoints de la API:
    - Rutas de ejemplo:
        - `GET /: Devuelve "Hola Mundo"`
        - `GET /api: Devuelve { message: "API funcionando OK" }`
        - `GET /saludo: Devuelve un saludo basado en la variable ADMINISTRADOR del archivo .env`

    - Rutas CRUD de usuarios:
        - `GET /usuarios: Obtiene todos los usuarios`
        - `GET /usuarios/:id: Obtiene un usuario por su ID`
        - `POST /usuarios: Crea un nuevo usuario. (Requiere un objeto JSON en el body con los campos nombre y email.)`
        - `PUT /usuarios/:id: Actualiza un usuario por su ID. (Requiere un objeto JSON en el body con los campos opcionales nombre y/o email.)`
        - `DELETE /usuarios/:id: Elimina un usuario por su ID.`


## Testing

El proyecto incluye pruebas automatizadas con **Jest** y **Supertest**. Para ejecutar las pruebas:

    npm test

Pruebas unitarias:
- Controlador de Usuarios:
    - `obtenerUsuarios: Verifica que se devuelvan todos los usuarios.`
    - `obtenerUsuarioPorId: Verifica que se devuelva un usuario específico por su ID.`
    - `crearUsuario: Verifica que se cree un nuevo usuario cuando se envía un objeto JSON con nombre y email.`
    - `actualizarUsuario: Verifica que se actualice correctamente un usuario específico.`
    - `eliminarUsuario: Verifica que se elimine correctamente un usuario específico.`

- Controlador de Rutas Simples:
    - `obtenerRaiz: Verifica que la ruta raíz (/) responda con "Hola Mundo".`
    - `obtenerApi: Verifica que la ruta /api responda con un mensaje JSON de estado.`
    - `obtenerSaludo: Verifica que la ruta /saludo salude correctamente, basado en la variable de entorno ADMINISTRADOR.`

    (Nota: Las pruebas de integración, que interactuaban directamente con la base de datos, han sido eliminadas para evitar alteraciones en un entorno real. Solo se mantienen las pruebas unitarias con datos de prueba, mocks.)


# CI/CD

Este proyecto utiliza GitHub Actions para ejecutar un pipeline de CI/CD que se activa con cada push o pull request a la rama main.

El pipeline:

1. Instala las dependencias.
2. Ejecuta las pruebas automatizadas.
3. (Opcional) Puede ser configurado para construir y desplegar la imagen Docker en DockerHub.

Puedes encontrar la configuración del pipeline en el archivo [/github/workflows/ci-cd.yml](https://github.com/sauliyo15/javascript-web/blob/main/.github/workflows/ci-cd.yml)



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


# Documentación de la API

La API está documentada utilizando **Swagger** y **OpenAPI**. Swagger proporciona una interfaz interactiva que permite a los desarrolladores explorar y probar los endpoints de la API de manera fácil y rápida.

La documentación de Swagger está disponible en la siguiente URL: `http://localhost:4000/api-docs

## Características de la Documentación

- **Visualización Interactiva**: puedes ver todos los endpoints disponibles y probarlos directamente desde la interfaz.
- **Ejemplos de Solicitud y Respuesta**: cada endpoint incluye ejemplos de datos para ayudar a entender cómo interactuar con la API.
- **Descripción Detallada**: la documentación incluye descripciones completas de cada endpoint, parámetros, respuestas y errores posibles.`


# Licencia

**MIT License**

**Copyright (c) [2024] [Saúl García Calvo]**

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


