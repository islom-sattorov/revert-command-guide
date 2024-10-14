# Stage 1: Build Stage
FROM node:20.11.1-alpine AS builder

WORKDIR /website

COPY package.json yarn.json ./

RUN yarn

COPY . .

RUN yarn run build

# Stage 2: Runtime Stage
FROM nginx:1.21.1-alpine AS runtime

COPY --from=builder /website/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
