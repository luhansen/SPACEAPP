FROM node:alpine AS build

RUN yarn global add quasar-cli
RUN mkdir -p /frontend
COPY package.json /frontend/package.json
WORKDIR /frontend
RUN yarn
COPY . /frontend
RUN quasar --version && \
    quasar build

FROM nginx:stable-alpine

RUN mkdir -p /web/frontend
COPY --from=build /frontend/dist /web/frontend/dist
COPY --from=build /frontend/config/nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /frontend/config/nginx/challenger.default.conf /etc/nginx/conf.d/default.conf
