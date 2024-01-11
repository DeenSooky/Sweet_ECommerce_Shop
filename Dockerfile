# Use an official Node.js runtime as the base image
FROM node:20.9.0

# Set the working directory to /app
WORKDIR /app

# Copy the application code to the /app directory inside the container
COPY . .


# Install dependencies
RUN npm install

RUN npm run build

# Expose the port on which your application will run (adjust as needed)
EXPOSE 3000

# Run your Next.js application
CMD ["npm", "run", "start"]


