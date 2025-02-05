# Use Node.js as the base image
FROM node:18

# Set the working directory inside the container (backend-2)
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the backend code
COPY . .

# Expose the backend port (5002 for document-service)
EXPOSE 5002

# Start the backend service
CMD ["npm", "start"]
