from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import stripe
import os
from services.stable_diffusion import StableDiffusionService
from firebase_functions import https_fn, options
from firebase_admin import initialize_app
from firebase_functions.core import CallableRequest
from fastapi import Request
from fastapi.responses import JSONResponse
import functions_framework
import os
from config import Config
from middleware import error_handling_middleware, RateLimitMiddleware

initialize_app()
Config.validate()

app = FastAPI(title="VastuChitra API")

# Add middleware
app.middleware("http")(error_handling_middleware)
app.add_middleware(RateLimitMiddleware, requests_per_minute=60)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[Config.FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure Stripe
stripe.api_key = Config.STRIPE_SECRET_KEY

# Initialize Stable Diffusion service
stable_diffusion = StableDiffusionService()

class ImageGenerationRequest(BaseModel):
    prompt: str
    style: str
    negative_prompt: Optional[str] = ""

@app.get("/health")
async def health_check():
    """Health check endpoint for Railway deployment"""
    # Check if environment variables are set
    env_vars = {
        "STABLE_DIFFUSION_API_KEY": bool(Config.STABLE_DIFFUSION_API_KEY),
        "STRIPE_SECRET_KEY": bool(Config.STRIPE_SECRET_KEY),
        "FRONTEND_URL": bool(Config.FRONTEND_URL)
    }

    # Check if services are operational
    services_status = {
        "stable_diffusion": "operational" if Config.STABLE_DIFFUSION_API_KEY else "not_configured",
        "stripe": "operational" if Config.STRIPE_SECRET_KEY else "not_configured"
    }

    return {
        "status": "healthy" if all(env_vars.values()) else "degraded",
        "version": "1.0.0",
        "environment": env_vars,
        "services": services_status
    }

@app.post("/api/generate-image")
async def generate_image(request: ImageGenerationRequest) -> dict:
    try:
        # Generate image using Stable Diffusion
        result = stable_diffusion.generate_image(
            prompt=request.prompt,
            style=request.style,
            negative_prompt=request.negative_prompt
        )
        
        # Extract the base64 image from the response
        if "artifacts" in result and len(result["artifacts"]) > 0:
            image_data = result["artifacts"][0]
            return {
                "status": "success",
                "image": image_data["base64"],
                "seed": image_data.get("seed"),
                "prompt": request.prompt,
                "style": request.style
            }
        else:
            raise HTTPException(status_code=500, detail="No image generated")
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/create-payment-intent")
async def create_payment_intent(amount: int) -> dict:
    try:
        intent = stripe.PaymentIntent.create(
            amount=amount, currency=Config.STRIPE_CURRENCY, automatic_payment_methods={"enabled": True},
        )
        return {"clientSecret": intent.client_secret}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@functions_framework.http
def vastuchitraBackend(request: Request) -> JSONResponse:
    """
    VastuChitra backend function.
    """
    if request.method == "OPTIONS":
        headers = {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST",
            "Access-Control-Allow-Headers": "Content-Type",
        }
        return ("", 204, headers)
    return app(request.scope, request.receive, request.send)