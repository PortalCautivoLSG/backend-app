# Fase de build
FROM node:22 AS build

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos package.json y package-lock.json (si existe) para aprovechar la cache de Docker
COPY package*.json ./

# Instalar las dependencias de desarrollo
RUN npm install

COPY . .

# Fase de runtime
FROM node:22 AS runtime

# Establecer el directorio de trabajo en la fase de runtime
WORKDIR /app

# Copiar solo los archivos necesarios desde la fase de build (dependencias + código fuente)
COPY --from=build /app /app
EXPOSE 3000

# Ejecutar la aplicación
CMD ["npm", "start"]
