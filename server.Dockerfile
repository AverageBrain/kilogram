FROM node:18.12.1 as build-stage

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
ADD ./package.json /app/package.json
ADD ./package-lock.json /app/package-lock.json
RUN npm install -g npm@9.8.1 && npm install --save

COPY . /app/

# build
RUN prisma generate && npm run build-server

FROM node:18.12.1 as production-stage

WORKDIR /app

ADD prisma ./prisma
COPY --from=build-stage /app/dist /app/dist
COPY --from=build-stage /app/node_modules/.prisma /app/node_modules/.prisma
#CMD node ./dist/server/bundle.js
CMD sleep 9999999 & wait