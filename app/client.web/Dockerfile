FROM node:12.1.0-alpine

ADD package.json /tmp/package.json
ADD yarn.lock /tmp/yarn.lock

RUN cd /tmp && yarn install
RUN mkdir -p /usr/local/opt/app && cp -a /tmp/node_modules /usr/local/opt/app/

WORKDIR /usr/local/opt/app

ADD . /usr/local/opt/app

RUN node_modules/.bin/gulp buildProd

EXPOSE 4200

CMD ["node", "./dist/server/index.js"]
