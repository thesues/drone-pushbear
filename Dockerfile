FROM alpine:3.3

RUN apk update && \
  apk add \
    ca-certificates \
    nodejs && \
  rm -rf \
    /var/cache/apk/*

WORKDIR /node
ADD package.json /node/
ADD index.js /node/
RUN npm install --production

CMD ["node", "/node/index.js"]
