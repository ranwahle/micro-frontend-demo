FROM node:18.12.1
WORKDIR /app
COPY ./package.json ./package-lock.json ./
RUN ls -la
RUN npm ci --quiet
COPY . .
