FROM node:22.17.1 AS base
 WORKDIR /app
 COPY package.json .

 FROM base AS dev 
 RUN npm i 
 COPY . .
CMD ["npm", "start"]

  FROM base AS prod 
 RUN npm i --only=production
 COPY . .
 CMD ["npm", "run" , "start"]