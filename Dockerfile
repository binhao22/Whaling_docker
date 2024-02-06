FROM node:20.9.0
WORKDIR /
COPY Whaling_docker /Whaling_docker
CMD [ "node", "/Whaling_docker/server.js" ]
