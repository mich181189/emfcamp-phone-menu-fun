FROM node:22.2-alpine3.19

RUN apk add --no-cache tini

RUN mkdir /app

RUN addgroup -S app && adduser -S app -G app

COPY *.json /app/
ADD static /app/static

RUN mkdir data && chown app:app /data -R

RUN chown app:app /app -R

USER app

WORKDIR /app

RUN npm install

COPY *.js /app/

ENTRYPOINT tini -- npm start