FROM node AS builder

COPY package.json .
RUN npm i

FROM node:alpine

WORKDIR /app
COPY --from=builder node_modules node_modules
COPY . .
RUN npm run build

EXPOSE 8080

ENTRYPOINT ["npm"]
CMD ["start"]
