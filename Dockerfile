FROM node:latest

EXPOSE 9001

COPY . ./

RUN echo "running"

RUN npm install

CMD ["npm", "start"]