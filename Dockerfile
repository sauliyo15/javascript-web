# Imagen base de Node.js
FROM node:14

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto de la aplicación
COPY . .

# Puerto en el que la aplicación escuchará
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["node", "index.js"]


# Comando para construir la imagen: docker build -t javascript-web .
# Comando para ejecutar el contenedor mapeado: docker run -d -p 3000:3000 javascript-web   // docker run -d --env-file .env -p 4000:4000 javascript-web

