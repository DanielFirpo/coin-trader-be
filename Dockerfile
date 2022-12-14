FROM node:latest

WORKDIR /app

COPY . .

# VOLUME /app/public/images/products/

RUN npm install

CMD ["sh","-c", "sleep 60 && npm run start"]