FROM node:20.10.0
WORKDIR /app
COPY ./package.json ./package-lock.json ./
RUN ls -la
RUN npm ci --quiet
COPY . .
CMD ["npm", "run", "start:prod"]
