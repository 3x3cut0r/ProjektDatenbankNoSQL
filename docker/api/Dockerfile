FROM node:18
 
WORKDIR /app
 
COPY package*.json ./
COPY ./ ./
 
RUN npm i
 
EXPOSE 3001
 
CMD [ "npm", "start" ]