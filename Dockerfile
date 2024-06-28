FROM node:18.20.1
ENV MONGO_DB_USERNAME=YASSER \
    MONGO_DB_PWD=YASO136 
# RUN mkdir -p /home/app
COPY package.json ./
RUN npm install 
COPY . .
EXPOSE 3000
CMD ["node","app.js"]
