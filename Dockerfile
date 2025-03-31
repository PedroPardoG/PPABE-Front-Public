# Usa la imagen de Node 20
FROM node:20-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de configuración de las dependencias
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto de los archivos del proyecto al contenedor
COPY . .

# Expone el puerto 7073
EXPOSE 7073

# Ejecuta el comando "npm run dev" para iniciar la aplicación
CMD ["npm", "run", "dev", "--", "--host"]

