# Stage 1: Build the application
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm run build

# Stage 2: Create the production image
FROM node:20-alpine AS production

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --production

COPY --from=builder /app/dist ./dist

CMD ["node", "dist/main.js"]