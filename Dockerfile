#######################################################
#                   DEVELOPMENT                       #
#######################################################

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



#######################################################
#                   PRODUCTION                        #
#######################################################

# set environment variables
FROM node:14-alpine AS builder

ENV NODE_ENV production \
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
RUN npm install --production

# copy app dir to container
COPY . .

# Build the app
RUN npm build

# Bundle static assets with nginx
FROM nginx:1.21.0-alpine as production
ENV NODE_ENV production
# Copy built assets from builder
COPY --from=builder /app/build /usr/share/nginx/html
# Add your nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Expose port
EXPOSE 80
# Start nginx
CMD ["nginx", "-g", "daemon off;"]