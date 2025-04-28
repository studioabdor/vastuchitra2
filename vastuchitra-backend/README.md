# VastuChitra Backend

The backend service for VastuChitra, an AI-powered architectural image generation application.

## Features

- Stable Diffusion API integration for architectural image generation
- Stripe payment processing
- Rate limiting and error handling
- Health check endpoints
- CORS configuration for frontend integration

## Prerequisites

- Python 3.8+
- Stable Diffusion API key
- Stripe account and API keys

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
STABLE_DIFFUSION_API_KEY=your_stability_ai_key
STRIPE_SECRET_KEY=your_stripe_secret_key
FRONTEND_URL=your_frontend_url
PORT=8000
```

## Local Development

1. Create and activate a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Run the development server:
```bash
uvicorn main:app --reload
```

## Railway Deployment

1. Create a new project on Railway
2. Connect your GitHub repository
3. Set the following environment variables in Railway:
   - `STABLE_DIFFUSION_API_KEY`
   - `STRIPE_SECRET_KEY`
   - `FRONTEND_URL`
   - `PORT` (Railway will set this automatically)

4. Railway will automatically detect the Python project and deploy it

## API Endpoints

### Health Check
- `GET /health` - Check service health status

### Image Generation
- `POST /api/generate-image`
  ```json
  {
    "prompt": "string",
    "style": "string",
    "negative_prompt": "string (optional)"
  }
  ```

### Payment
- `POST /api/create-payment-intent`
  ```json
  {
    "amount": "integer"
  }
  ```

## Error Handling

The API includes comprehensive error handling for:
- Invalid requests
- API rate limiting
- Service unavailability
- Payment processing errors

## Rate Limiting

- 60 requests per minute per IP address
- Configurable through the `RateLimitMiddleware`

## CORS Configuration

CORS is configured to allow requests only from the specified frontend URL. Update the `FRONTEND_URL` environment variable to match your frontend deployment URL.

## Technologies Used
- FastAPI
- Stable Diffusion API
- Stripe Payment Processing
- Python 3.8+ 