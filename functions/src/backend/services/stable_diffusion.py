import os
import requests
from typing import Dict, Any, Optional
from dotenv import load_dotenv

load_dotenv()

class StableDiffusionService:
    def __init__(self):
        self.api_key = os.getenv("STABLE_DIFFUSION_API_KEY")
        self.api_url = "https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image"
        
        if not self.api_key:
            raise ValueError("STABLE_DIFFUSION_API_KEY environment variable is not set")
    
    def _get_headers(self) -> Dict[str, str]:
        return {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
        }
    
    def _enhance_prompt(self, prompt: str, style: str) -> str:
        """Enhance the user prompt with Indian architectural context and style."""
        style_descriptions = {
            "mughal": "Mughal architecture with domes, arches, and intricate geometric patterns",
            "kerala": "Kerala traditional architecture with sloping roofs and wooden elements",
            "rajasthani": "Rajasthani architecture with jharokhas, chhatris, and vibrant colors",
            "dravidian": "Dravidian architecture with gopurams and intricate stone carvings",
            "nagara": "Nagara style with shikhara and mandapa",
            "bengal": "Bengal terracotta architecture with curved roofs",
            "goan": "Portuguese-influenced Goan architecture with balconies",
            "modern": "Contemporary Indian architecture with sustainable elements",
            "mediterranean": "Mediterranean-inspired Indian architecture",
            "japanese": "Japanese-inspired Indian architecture with zen elements",
            "scandinavian": "Scandinavian-inspired Indian architecture with minimalism",
            "gothic": "Gothic-inspired Indian architecture with pointed arches",
            "modernist": "Modernist Indian architecture with clean lines",
            "art_deco": "Art Deco-inspired Indian architecture with geometric patterns"
        }
        
        style_desc = style_descriptions.get(style.lower(), "Indian architectural style")
        return f"{prompt}, {style_desc}, detailed, high quality, professional architectural visualization, photorealistic, 8k resolution"
    
    def generate_image(self, prompt: str, style: str, negative_prompt: Optional[str] = None) -> Dict[str, Any]:
        """
        Generate an image using Stable Diffusion API.
        
        Args:
            prompt: The main prompt describing the desired image
            style: The architectural style to apply
            negative_prompt: Optional negative prompt to specify what to avoid
            
        Returns:
            Dict containing the API response
        """
        enhanced_prompt = self._enhance_prompt(prompt, style)
        default_negative = "low quality, blurry, distorted, amateur, unrealistic, cartoon, illustration, painting"
        negative_prompt = negative_prompt or default_negative
        
        payload = {
            "text_prompts": [
                {
                    "text": enhanced_prompt,
                    "weight": 1
                },
                {
                    "text": negative_prompt,
                    "weight": -1
                }
            ],
            "cfg_scale": 7,
            "steps": 30,
            "width": 1024,
            "height": 1024,
            "samples": 1,
            "style_preset": "photographic"
        }
        
        try:
            response = requests.post(
                self.api_url,
                headers=self._get_headers(),
                json=payload
            )
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            raise Exception(f"Stable Diffusion API error: {str(e)}") 