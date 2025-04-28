FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and install Python dependencies
COPY vastuchitra-backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the application code
COPY vastuchitra-backend/ ./vastuchitra-backend/
COPY vastuchitra-frontend/ ./vastuchitra-frontend/

# Expose the ports
EXPOSE 8000 3000

# Start the backend service
CMD ["python", "-m", "vastuchitra-backend.app"] 