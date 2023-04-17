FROM node:14.21.3

LABEL version="1.0"
LABEL description="This is the base image for the EHMRS backend API"

RUN mkdir -p /app
WORKDIR /app

COPY ["package*.json", "package-lock.json", "./"],
RUN ls
RUN npm install

COPY . /app
RUN ls