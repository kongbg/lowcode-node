FROM kongbg/node:latest
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install cnpm -g --registry=https://registry.npm.taobao.org
RUN cnpm install
COPY . .
EXPOSE 6080
CMD [ "node", "./src/app.js" ]