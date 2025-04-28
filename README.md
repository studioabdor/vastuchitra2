# VastuChitra

An AI-powered architectural image generation platform that creates stunning architectural visualizations using Stable Diffusion.

## Project Structure

The project is split into two main components:

### Backend (`vastuchitra-backend/`)
- FastAPI-based REST API
- Stable Diffusion integration
- Stripe payment processing
- Rate limiting and error handling
- Health check endpoints

### Frontend (`vastuchitra-frontend/`)
- React + TypeScript application
- Tailwind CSS for styling
- Stripe payment integration
- Real-time image generation
- Responsive design

## Getting Started

### Prerequisites
- Python 3.8+
- Node.js 16+
- Stable Diffusion API key
- Stripe account and API keys

### Backend Setup
1. Navigate to the backend directory:
```bash
cd vastuchitra-backend
```

2. Create and activate virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Create `.env` file with required variables:
```env
STABLE_DIFFUSION_API_KEY=your_key
STRIPE_SECRET_KEY=your_key
FRONTEND_URL=http://localhost:5173
```

5. Run the development server:
```bash
uvicorn main:app --reload
```

### Frontend Setup
1. Navigate to the frontend directory:
```bash
cd vastuchitra-frontend
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create `.env` file with required variables:
```env
VITE_API_URL=http://localhost:8000
VITE_STRIPE_PUBLISHABLE_KEY=your_key
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

## Deployment

Both frontend and backend are configured for deployment on Railway. See the respective README files in each directory for detailed deployment instructions.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 