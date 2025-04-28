FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and install Python dependencies
COPY vastuchitra-backend/requirements.txt .
RUN grep -v "STABLE_DIFFUSION_API_KEY" requirements.txt > requirements_clean.txt && \
    pip install --no-cache-dir -r requirements_clean.txt

# Copy the application code
COPY vastuchitra-backend/ ./vastuchitra-backend/
COPY vastuchitra-frontend/ ./vastuchitra-frontend/

# Set environment variables
ENV PYTHONPATH=/app
ENV STABLE_DIFFUSION_API_KEY=${STABLE_DIFFUSION_API_KEY}

# Expose the ports
EXPOSE 8000 3000

# Start the backend service
CMD ["python", "-m", "vastuchitra-backend.main"] 