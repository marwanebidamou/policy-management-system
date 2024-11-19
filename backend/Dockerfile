# Use the latest Node.js LTS image
FROM node:22

# Set the working directory
WORKDIR /app

# Copy only the package.json and package-lock.json first
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["node", "dist/index.js"]
