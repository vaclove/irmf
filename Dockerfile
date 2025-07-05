# Stage 1: Build
FROM node:20-alpine AS build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --production

COPY . .

# Stage 2: Production
FROM node:20-alpine AS production

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app .

EXPOSE 3000

CMD [ "node", "index.js" ]