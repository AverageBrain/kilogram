FROM node:18.12.1 as build-stage

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
ADD ./package.json /app/package.json
ADD ./package-lock.json /app/package-lock.json
COPY . /app/
RUN npm install -g npm@9.8.1 && npm install --save && prisma generate && npm run build-server && rm -rf /app/node-modules

# build
CMD sed -i 's/module/commonjs/g' file.txt
CMD node ./dist/server/bundle.js
