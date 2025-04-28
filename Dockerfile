FROM python:3.11-slim

WORKDIR /app

# Install only essential system packages
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Copy and install requirements
COPY vastuchitra-backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY vastuchitra-backend/ ./vastuchitra-backend/
COPY vastuchitra-frontend/ ./vastuchitra-frontend/

# Set environment variables
ENV PYTHONPATH=/app
ENV PORT=8000
ENV STABLE_DIFFUSION_API_KEY=${STABLE_DIFFUSION_API_KEY}
ENV STRIPE_SECRET_KEY=${STRIPE_SECRET_KEY}
ENV FRONTEND_URL=${FRONTEND_URL:-http://localhost:3000}

# Expose port
EXPOSE 8000

# Run the application with uvicorn
ENTRYPOINT ["uvicorn", "vastuchitra-backend.main:app", "--host", "0.0.0.0", "--port", "8000"] 