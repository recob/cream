FROM node:10

ENV appdir /app
COPY / $appdir
WORKDIR $appdir
RUN npm ci
RUN npm run build

ARG NODE_ENV

ENV CLIENT_PORT="80" \
    REACT_APP_HOST="4b1b18af.ngrok.io" \
    REACT_APP_TEST="b181815b.ngrok.io" \
    NODE_ENV=${NODE_ENV}

CMD npm run serve
