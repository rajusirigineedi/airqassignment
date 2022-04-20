FROM node:alpine
WORKDIR /var/airq
COPY ./package.json ./
RUN npm install
COPY . .
CMD ["npm", "start"]