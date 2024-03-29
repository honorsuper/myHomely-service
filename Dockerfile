FROM node:21-alpine3.18 as build-stage

WORKDIR /app

COPY package.json .

RUN yarn config set registry https://registry.npmmirror.com

RUN npm install

COPY . .

RUN npm run build

# production stage
FROM node:21-alpine3.18 as production-stage

COPY --from=build-stage /app/dist /app
COPY --from=build-stage /app/package.json /app/package.json
COPY --from=build-stage /app/.env.pro /app/.env.pro
COPY --from=build-stage /app/.env /app/.env

WORKDIR /app

RUN npm install --production

EXPOSE 3000

CMD ["node", "/app/main.js"]
