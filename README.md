# ShopSphere

A modern, responsive Full Stack E-Commerce Website suitable for a final-year B.Tech project.
It features a robust backend API built with Node.js, Express, and MongoDB, and a dynamic frontend built with Angular 19 and Bootstrap 5.

## Key Features

1. **User Authentication:** Secure JWT-based login, registration, and role management (Admin/User).
2. **Product Catalog:** Browse products, filter by category, search by name, and sort by price/rating.
3. **Shopping Cart:** Add products, update quantities, calculate totals, and place orders.
4. **Order Management:** Users can view order history. Admins can view all orders.
5. **AI Shopping Assistant (Unique Feature):** A built-in chatbot that can answer product queries and suggest categories.
6. **Price Drop Alerts (Unique Feature):** Users can subscribe to price alerts on specific products and get notified if the price drops.
7. **Outfit Recommender (Unique Feature):** Simulated smart matches for clothing categories.

## Technology Stack

- **Frontend:** Angular 19, TypeScript, Bootstrap 5, Bootstrap Icons
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Security:** JWT Authentication, bcrypt password hashing

## Getting Started

### Prerequisites
- Node.js (v18+)
- Angular CLI
- MongoDB (running locally or MongoDB Atlas)

### Backend Setup
1. Navigate to the `server` directory: `cd server`
2. Install dependencies: `npm install`
3. Create a `.env` file based on `.env.example` (ensure `MONGODB_URI` and `JWT_SECRET` are set)
4. Start the server: `npm run dev` (Runs on port 5000)

### Frontend Setup
1. Navigate to the `client` directory: `cd client`
2. Install dependencies: `npm install`
3. Start the Angular dev server: `npm start` or `ng serve` (Runs on port 4200)

## API Endpoints

- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: Login user
- `GET /api/products`: Get all products (supports search, pagination)
- `GET /api/cart`: Get user cart
- `POST /api/orders`: Place an order
- `POST /api/chatbot/message`: Send a message to AI assistant
- `POST /api/price-alerts`: Subscribe to a price drop alert

## License
MIT License
