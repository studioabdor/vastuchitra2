FROM python:3.11-slim

WORKDIR /app

# Install Docker and Docker Compose
RUN apt-get update && \
    apt-get install -y \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg \
    lsb-release && \
    curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg && \
    echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/debian $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null && \
    apt-get update && \
    apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Copy the docker-compose.yml file
COPY docker-compose.yml .

# Copy the backend and frontend directories
COPY vastuchitra-backend/ ./vastuchitra-backend/
COPY vastuchitra-frontend/ ./vastuchitra-frontend/

# Expose the ports
EXPOSE 8000 3000

# Start the services
CMD ["docker", "compose", "up"] 