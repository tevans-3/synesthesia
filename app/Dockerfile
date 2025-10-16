# syntax=docker/dockerfile:1
FROM ubuntu:22.04 
WORKDIR /app 
COPY . /app 
RUN apt-get update 
RUN apt-get install curl 
RUN curl -sL https://deb.nodesource.com/setup_4.x | bash
RUN apt-get install nodejs 
RUN node -v 
RUN npm -v
CMD ["npm", "run", "dev"]
EXPOSE 64831

