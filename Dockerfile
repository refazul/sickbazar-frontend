FROM node:17
WORKDIR /app
COPY package.json /app/package.json
RUN npm install

COPY components/ /app/components/
COPY pages/ /app/pages/
COPY public/ /app/public/
COPY styles/ /app/styles/
COPY *.js /app/
EXPOSE 3000
#CMD [ "npm", "run", "dev" ]

# docker build . -t refazul/sickbazar-frontend
# docker run -dit -p 3000:3000 --name sickbazar-frontend --env-file .env refazul/sickbazar-frontend
# docker image prune