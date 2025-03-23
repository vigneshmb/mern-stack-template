FROM node:22.14.0 AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . ./
RUN npm run build

EXPOSE 4567
CMD ["node","dist/prod.js"]
