FROM node:12.14.0

ARG APP_DIR=/app
RUN mkdir -p ${APP_DIR}
WORKDIR ${APP_DIR}

COPY package*.json ./
RUN npm install

# RUN npm install --production

COPY . .

RUN npm run build
