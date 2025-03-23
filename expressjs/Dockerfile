FROM node:22.14.0 AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . ./

EXPOSE 4567
CMD ["npm","start"]
