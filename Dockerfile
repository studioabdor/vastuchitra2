FROM alpine:latest

# Install required packages
RUN apk add --no-cache \
    docker \
    docker-compose \
    git \
    bash

WORKDIR /app

# Copy the docker-compose.yml file
COPY docker-compose.yml .

# Copy the backend and frontend directories
COPY vastuchitra-backend/ ./vastuchitra-backend/
COPY vastuchitra-frontend/ ./vastuchitra-frontend/

# Expose the ports
EXPOSE 8000 3000

# Start the services
CMD ["docker-compose", "up"] 