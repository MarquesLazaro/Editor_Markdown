FROM node:20-alpine AS builder

WORKDIR /app
COPY . . 

RUN npm install
RUN npm run build

FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app /app

RUN npm install --production

EXPOSE 3000

CMD ["npm", "run", "start"]
