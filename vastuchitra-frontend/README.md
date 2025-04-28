# VastuChitra Frontend

The frontend application for VastuChitra, an AI-powered architectural image generation platform.

## Features

- Modern React + TypeScript application
- Tailwind CSS for styling
- Stripe payment integration
- Real-time image generation
- Responsive design
- Error handling and loading states

## Prerequisites

- Node.js 16+
- npm or yarn
- Backend API URL
- Stripe publishable key

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
VITE_API_URL=your_backend_url
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_ERROR_REPORTING=false
```

## Local Development

1. Install dependencies:
```bash
npm install
# or
yarn install
```

2. Start the development server:
```bash
npm run dev
# or
yarn dev
```

3. Build for production:
```bash
npm run build
# or
yarn build
```

## Railway Deployment

1. Create a new project on Railway
2. Connect your GitHub repository
3. Set the following environment variables in Railway:
   - `VITE_API_URL`: Your backend API URL
   - `VITE_STRIPE_PUBLISHABLE_KEY`: Your Stripe publishable key
   - `VITE_ENABLE_ANALYTICS`: Set to true/false
   - `VITE_ENABLE_ERROR_REPORTING`: Set to true/false

4. Railway will automatically detect the Node.js project and deploy it

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Page components
├── services/      # API services
├── hooks/         # Custom React hooks
├── lib/           # Utility functions
└── integrations/  # Third-party integrations
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Technologies Used

- React
- TypeScript
- Vite
- Tailwind CSS
- Stripe Elements
- React Query
- React Router

## Error Handling

The application includes comprehensive error handling for:
- API failures
- Payment processing errors
- Image generation failures
- Network issues

## Performance Optimization

- Code splitting
- Lazy loading
- Image optimization
- Caching strategies

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest) 