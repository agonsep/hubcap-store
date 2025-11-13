# frontend/Dockerfile
FROM node:24-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

ARG VITE_API_URL
ARG VITE_STRIPE_PUBLIC_KEY

ENV VITE_API_URL=$VITE_API_URL
ENV VITE_STRIPE_PUBLIC_KEY=$VITE_STRIPE_PUBLIC_KEY

RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80