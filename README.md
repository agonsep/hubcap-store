# CNC Hubcap Store - E-Commerce Platform

A full-stack e-commerce platform for selling premium CNC aluminum hubcaps and accessories. Built with React, Node.js, Express, MongoDB, and Stripe for payment processing.

## Features

### Customer Features
- Browse products with beautiful, responsive grid layout
- Shopping cart with add, remove, and quantity adjustment
- User registration and authentication (JWT-based)
- Secure checkout with Stripe payment integration
- Order history and tracking
- Order confirmation page

### Admin Features
- Product management (add, edit, delete products)
- Order management and monitoring
- User management
- Dashboard with tabs for products, orders, and users

## Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and development server
- **TailwindCSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Stripe.js** - Payment processing

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Stripe** - Payment processing API

## Project Structure

```
hubcap-store/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js
│   │   ├── controllers/
│   │   │   ├── adminController.js
│   │   │   ├── authController.js
│   │   │   ├── orderController.js
│   │   │   └── productController.js
│   │   ├── middleware/
│   │   │   ├── auth.js
│   │   │   └── errorHandler.js
│   │   ├── models/
│   │   │   ├── Order.js
│   │   │   ├── Product.js
│   │   │   └── User.js
│   │   ├── routes/
│   │   │   ├── adminRoutes.js
│   │   │   ├── authRoutes.js
│   │   │   ├── orderRoutes.js
│   │   │   └── productRoutes.js
│   │   ├── utils/
│   │   │   ├── jwt.js
│   │   │   └── seed.js
│   │   └── server.js
│   ├── .env.example
│   ├── .gitignore
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Loading.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   └── CartContext.jsx
│   │   ├── pages/
│   │   │   ├── Admin.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Checkout.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Orders.jsx
│   │   │   ├── OrderSuccess.jsx
│   │   │   └── Register.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .env.example
│   ├── .gitignore
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.js
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- Stripe account (for payment processing)

### 1. Clone the Repository
```bash
git clone <repository-url>
cd hubcap-store
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file from example
cp .env.example .env
```

Edit `backend/.env` and configure:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/hubcap-store  # Or your MongoDB Atlas URI
JWT_SECRET=your_secure_jwt_secret_key_here
JWT_EXPIRE=30d
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
NODE_ENV=development
```

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create .env file from example
cp .env.example .env
```

Edit `frontend/.env` and configure:
```env
VITE_API_URL=http://localhost:5000/api
VITE_STRIPE_PUBLIC_KEY=pk_test_your_stripe_publishable_key
```

### 4. Seed Database with Sample Data

```bash
cd backend
npm run seed
```

This will create:
- **Admin User**: admin@hubcapstore.com / admin123
- **Demo User**: demo@example.com / demo123
- 8 sample hubcap products

## Running the Application

### Development Mode

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Backend will run on http://localhost:5000

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
Frontend will run on http://localhost:5173

### Access the Application
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000/api

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

### Orders
- `POST /api/orders` - Create order (protected)
- `GET /api/orders/myorders` - Get user's orders (protected)
- `GET /api/orders` - Get all orders (admin only)
- `GET /api/orders/:id` - Get order by ID (protected)
- `POST /api/orders/:id/payment` - Create payment intent (protected)
- `PUT /api/orders/:id/pay` - Update order to paid (protected)

### Admin
- `GET /api/admin/users` - Get all users (admin only)
- `DELETE /api/admin/users/:id` - Delete user (admin only)
- `PUT /api/admin/users/:id/role` - Update user role (admin only)

## Stripe Integration

### Test Card Numbers
Use these test cards during development:
- **Success**: 4242 4242 4242 4242
- **Decline**: 4000 0000 0000 0002
- Use any future expiration date and any 3-digit CVC

### Setting Up Stripe
1. Create a Stripe account at https://stripe.com
2. Get your API keys from the Stripe Dashboard
3. Use test keys (starting with `sk_test_` and `pk_test_`) for development
4. Add keys to your `.env` files

## Deployment

### Backend Deployment (Render/Heroku)

**Render:**
1. Create a new Web Service
2. Connect your repository
3. Set build command: `cd backend && npm install`
4. Set start command: `cd backend && npm start`
5. Add environment variables from `.env`

**Heroku:**
```bash
cd backend
heroku create your-app-name
heroku addons:create mongolab
heroku config:set JWT_SECRET=your_secret
heroku config:set STRIPE_SECRET_KEY=your_key
git push heroku main
```

### Frontend Deployment (Vercel)

**Vercel:**
1. Install Vercel CLI: `npm i -g vercel`
2. Deploy:
```bash
cd frontend
vercel
```
3. Add environment variables in Vercel dashboard:
   - `VITE_API_URL` - Your backend URL
   - `VITE_STRIPE_PUBLIC_KEY` - Your Stripe public key

**Netlify:**
```bash
cd frontend
npm run build
# Upload the 'dist' folder to Netlify
```

### MongoDB Atlas Setup (Production Database)
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a new cluster
3. Add database user
4. Whitelist IP addresses (or allow from anywhere: 0.0.0.0/0)
5. Get connection string and update `MONGODB_URI` in backend `.env`

## Environment Variables Summary

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/hubcap-store
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=30d
STRIPE_SECRET_KEY=sk_test_xxx
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
VITE_STRIPE_PUBLIC_KEY=pk_test_xxx
```

## Testing the Application

### User Flow
1. Visit homepage and browse products
2. Add products to cart
3. Register/Login
4. Proceed to checkout
5. Enter shipping address
6. Complete payment with test card
7. View order confirmation
8. Check order history

### Admin Flow
1. Login with admin credentials
2. Access Admin Dashboard
3. Add/Edit/Delete products
4. View all orders
5. Manage users

## Security Considerations

- Passwords are hashed using bcryptjs
- JWT tokens for authentication
- Protected routes on both frontend and backend
- Admin-only routes protected with middleware
- Environment variables for sensitive data
- CORS configured for frontend access
- Input validation on API endpoints

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running: `mongod`
- Check connection string in `.env`
- For Atlas, verify IP whitelist

### CORS Errors
- Ensure backend CORS is configured to allow frontend URL
- Check `FRONTEND_URL` in backend `.env`

### Stripe Payment Issues
- Verify Stripe keys are correct
- Use test card numbers in development
- Check browser console for errors

## Future Enhancements

- Product image uploads
- Product categories and filtering
- Product search functionality
- Customer reviews and ratings
- Wishlist feature
- Email notifications
- Order status tracking
- Inventory management
- Discount codes and promotions
- Multiple shipping options

## License

MIT License - feel free to use this project for learning and development.

## Support

For issues and questions, please open an issue on the repository.
