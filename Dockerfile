FROM node:latest

EXPOSE 9001

COPY . ./

RUN echo "running"

RUN npm install

CMD ["npm", "start"]


# FROM node:latest
# ADD ./exercise01/bootcamp /app
# WORKDIR /app
# RUN ls -a
# RUN npm install
# RUN echo "hello world"
# CMD ["npm", "start"]


# // docker stop 
# // docker kill 