FROM node

WORKDIR /app

ADD . /app

EXPOSE 6379

RUN make run

CMD [ "node", "index.js" ]
