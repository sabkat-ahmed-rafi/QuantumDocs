# Use Node.js as the base image for frontend
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the frontend code
COPY . .

# Build the frontend
RUN npm run build

# Expose the port (3000 for Next.js)
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "start"]
