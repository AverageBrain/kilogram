FROM node:18.12.1 as build-stage

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
ADD ./package.json /app/package.json
ADD ./package-lock.json /app/package-lock.json
RUN npm install -g npm@9.8.1 && npm install --save

RUN prisma generate

# copy all
COPY . /app/

# build
RUN npm run start-server
