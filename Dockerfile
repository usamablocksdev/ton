FROM node:18

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy package.json and package-lock.json.
COPY package*.json ./

# Install app dependencies with npm (or you can switch to yarn if preferred)
RUN npm install

# Copy app files.
COPY . .

# Start the app.
CMD [ "npm", "start" ]
