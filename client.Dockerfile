FROM node:18.12.1 as build-stage

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
ADD ./package.json /app/package.json
ADD ./package-lock.json /app/package-lock.json
RUN npm install -g npm@9.8.1 && npm install --save

# copy all
COPY . /app/

# build
RUN npm run build && rm -rf /app/node_modules

FROM nginx as production-stage
COPY nginx/client.conf /etc/nginx/nginx.conf

# delete default
RUN rm -rf /usr/share/nginx/html/*

# copy frontend
COPY --from=build-stage /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]