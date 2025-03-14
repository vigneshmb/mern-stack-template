FROM node:22.14.0
WORKDIR /app

COPY package*.json /app/
COPY src /app/

RUN npm install
CMD ["npm","run", "dev"]
