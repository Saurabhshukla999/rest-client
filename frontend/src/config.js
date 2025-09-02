// API Configuration
// Automatically detect environment and set appropriate API URL
const isProduction = import.meta.env.PROD;

export const API_URL = isProduction 
  ? "https://rest-client-backend.onrender.com"  // Update this with your actual backend URL
  : "http://localhost:4000";

// For production, you can change this to:
// export const API_URL = "https://your-api.heroku.app";
