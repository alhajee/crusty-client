FROM node:14-alpine AS development

# set environment variables
ENV NODE_ENV development \
    MONGO_DB_USERNAME=admin \
	MONGO_DB_PWD=password
	
# create app directory
RUN mkdir -p /home/app

# set default dir so that next command will execute in /home/app dir
WORKDIR /home/app

# copy project metadata
COPY package.json .
COPY package-lock.json .

# execute npm install in /home/app dir because of WORKDIR
RUN npm install

# copy app dir to container
COPY . .

# expose port
EXPOSE 3000

# run server
CMD ["npm", "start"]