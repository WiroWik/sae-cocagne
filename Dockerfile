FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:18 AS runner
WORKDIR /app
COPY --from=builder /app .
EXPOSE 3000

ENV PORT 3000

CMD ["npm", "run", "start"]