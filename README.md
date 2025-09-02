# REST Client

A full-stack REST client application built with React frontend and Node.js backend, featuring request history tracking and SQLite database storage.

## Features

- **HTTP Request Testing**: Send GET, POST, PUT, DELETE, and PATCH requests
- **Request History**: Automatically saves all requests and responses
- **Database Storage**: SQLite database for persistent data storage
- **Modern UI**: Clean, responsive interface built with React
- **CORS Support**: Built-in CORS handling for cross-origin requests

## Tech Stack

- **Frontend**: React + Vite
- **Backend**: Node.js + Express
- **Database**: SQLite with MikroORM
- **Styling**: CSS-in-JS

## Local Development

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Setup
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   cd backend && npm install
   cd ../frontend && npm install
   ```

3. Start the development servers:
   ```bash
   # Start both frontend and backend
   npm run dev
   
   # Or start them separately:
   npm run dev:backend    # Backend on http://localhost:4000
   npm run dev:frontend   # Frontend on http://localhost:5173
   ```

## Deployment on Render

### 1. Backend Deployment

1. **Create a new Web Service** on Render
2. **Connect your GitHub repository**
3. **Configure the service:**
   - **Name**: `rest-client-backend`
   - **Environment**: `Node`
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && node server.js`
   - **Health Check Path**: `/history`

4. **Environment Variables:**
   - `NODE_ENV`: `production`
   - `PORT`: `10000` (or let Render assign automatically)

### 2. Frontend Deployment

1. **Create a new Static Site** on Render
2. **Connect your GitHub repository**
3. **Configure the service:**
   - **Name**: `rest-client-frontend`
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Publish Directory**: `frontend/dist`

### 3. Update API URLs

After deploying the backend, update the frontend configuration:

1. **Get your backend URL** from Render (e.g., `https://rest-client-backend.onrender.com`)
2. **Update** `frontend/src/config.js`:
   ```javascript
   export const API_URL = isProduction 
     ? "https://your-backend-url.onrender.com"  // Your actual backend URL
     : "http://localhost:4000";
   ```
3. **Redeploy the frontend**

### 4. Automatic Deployment

The `render.yaml` file in the root directory can be used for automatic deployment setup.

## API Endpoints

- `POST /proxy` - Send HTTP requests through the proxy
- `GET /history` - Retrieve request history with pagination

## Database

The application uses SQLite with MikroORM for data persistence. The database file (`data.db`) is automatically created in the backend directory.

## Environment Variables

- `PORT`: Server port (default: 4000)
- `NODE_ENV`: Environment mode (development/production)

## License

ISC
