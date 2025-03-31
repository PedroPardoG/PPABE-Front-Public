# Usa la imagen de Node 20
FROM node:20-alpine

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia los archivos de configuración de las dependencias
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto de los archivos del proyecto al contenedor
COPY . .

# Expone el puerto en el que corre Vite
EXPOSE 5173

# Comando para iniciar la aplicación con acceso desde otras IPs
CMD ["npm", "run", "dev", "--", "--host"]