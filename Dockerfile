FROM public.ecr.aws/docker/library/node:16-alpine

# Create node folder for node_modules
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

# Create app directory
WORKDIR /home/node/app

# Install app dependencies
COPY package.json ./
COPY yarn.lock ./

RUN yarn install

# Bundle app source
COPY . .

COPY --chown=node:node . .

USER node

EXPOSE 3000

RUN yarn build

CMD ["yarn", "start"]
