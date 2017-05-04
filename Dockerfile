FROM node:6.5

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app

RUN npm set progress=false
RUN npm install

EXPOSE 8090

CMD ["npm", "run", "startContainer"]
