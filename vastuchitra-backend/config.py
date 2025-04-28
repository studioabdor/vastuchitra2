import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    # API Keys
    STABLE_DIFFUSION_API_KEY = os.getenv("STABLE_DIFFUSION_API_KEY")
    STRIPE_SECRET_KEY = os.getenv("STRIPE_SECRET_KEY")
    VITE_STRIPE_PUBLISHABLE_KEY = os.getenv("VITE_STRIPE_PUBLISHABLE_KEY")
    
    # URLs
    FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")
    
    # API Settings
    STABLE_DIFFUSION_API_URL = "https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image"
    
    # Image Generation Settings
    DEFAULT_IMAGE_WIDTH = 1024
    DEFAULT_IMAGE_HEIGHT = 1024
    DEFAULT_STEPS = 30
    DEFAULT_CFG_SCALE = 7
    
    # Payment Settings
    STRIPE_CURRENCY = "inr"
    
    @classmethod
    def validate(cls):
        """Validate that all required environment variables are set"""
        required_vars = [
            "STABLE_DIFFUSION_API_KEY",
            "STRIPE_SECRET_KEY",
            "VITE_STRIPE_PUBLISHABLE_KEY"
        ]
        
        missing_vars = [var for var in required_vars if not getattr(cls, var)]
        
        if missing_vars:
            raise ValueError(f"Missing required environment variables: {', '.join(missing_vars)}") 