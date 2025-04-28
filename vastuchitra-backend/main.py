from fastapi import FastAPI, HTTPException, Depends, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import stripe
import os
from dotenv import load_dotenv
import requests
import json
from services.stable_diffusion import StableDiffusionService
from config import Config
from middleware import error_handling_middleware, RateLimitMiddleware

# Load and validate environment variables
load_dotenv()
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
    negative_prompt: Optional[str] = None

@app.get("/health")
async def health_check():
    """Health check endpoint for Railway deployment"""
    return {
        "status": "healthy",
        "version": "1.0.0",
        "services": {
            "stable_diffusion": "operational",
            "stripe": "operational"
        }
    }

@app.post("/api/generate-image")
async def generate_image(request: ImageGenerationRequest):
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
async def create_payment_intent(amount: int):
    try:
        intent = stripe.PaymentIntent.create(
            amount=amount,
            currency=Config.STRIPE_CURRENCY,
            automatic_payment_methods={"enabled": True},
        )
        return {"clientSecret": intent.client_secret}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=int(os.getenv("PORT", 8000))) 