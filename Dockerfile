FROM node:latest

WORKDIR /app

COPY . .

RUN npm install

CMD ["sh","-c", "sleep 60 && npm run start"]