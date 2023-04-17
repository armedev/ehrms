FROM node:14.21.3

LABEL version="1.0"
LABEL description="This is the base image for the EHMRS front-end"


RUN mkdir -p /web
WORKDIR /web

COPY ["package*.json", "package-lock.json", "./"]
RUN ls

RUN npm install
COPY . /web

RUN ls