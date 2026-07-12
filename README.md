# ShopHub — Full Stack E-Commerce Application

A complete, production-ready e-commerce web application built with the MERN stack (MongoDB, Express.js, React.js, Node.js). ShopHub features user authentication, product management, shopping cart, order processing, and a full admin panel.

![Tech Stack](https://img.shields.io/badge/React-18-blue) ![Node](https://img.shields.io/badge/Node.js-18+-green) ![MongoDB](https://img.shields.io/badge/MongoDB-8-brightgreen) ![Express](https://img.shields.io/badge/Express-4-lightgrey)

## Features

### Core Features
- **User Authentication** — Registration, login, and JWT-based authorization
- **Product Management** — Browse, search, filter by category, sort by price/rating
- **Shopping Cart** — Add/remove items, update quantities, persistent cart (localStorage)
- **Order Management** — Place orders, view order history and details
- **Admin Panel** — Dashboard with stats, manage products, users, and orders

### Bonus Features
- **Product Reviews** — Rate and review products (1–5 stars)
- **Wishlist** — Save favorite products for later
- **Image Uploads** — Admin can upload product images via Multer
- **Pagination** — Products, orders, and users are paginated
- **Email Notifications** — Welcome email on registration, order confirmation email (via Nodemailer)

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, React Router v6, Axios, Vite |
| Backend | Node.js, Express.js |
| Database | MongoDB with Mongoose ODM |
| Auth | JSON Web Tokens (JWT), bcryptjs |
| File Upload | Multer |
| Email | Nodemailer |

## Project Structure

```
ecommerce-app/
├── backend/
│   ├── config/          # Database connection
│   ├── controllers/     # Route handlers
│   ├── middleware/      # Auth & file upload middleware
│   ├── models/          # Mongoose schemas (User, Product, Order)
│   ├── routes/          # REST API routes
│   ├── uploads/         # Uploaded product images
│   ├── utils/           # JWT & email utilities
│   ├── seeder.js        # Database seed script
│   └── server.js        # Express entry point
├── frontend/
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── context/     # Auth & Cart context providers
│   │   ├── pages/       # Page components (incl. admin/)
│   │   └── services/    # API service layer
│   └── vite.config.js
└── README.md
```

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- [MongoDB](https://www.mongodb.com/) running locally **or** a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster
- npm or yarn

### MongoDB Setup Options

**Option A — MongoDB Atlas (Recommended, no local install):**
1. Create a free account at [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Create a cluster and get your connection string
3. Set `MONGO_URI` in `backend/.env` to your Atlas connection string:
   ```
   MONGO_URI=mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/ecommerce
   ```

**Option B — Local MongoDB (Windows):**
1. Download from [mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
2. Install and start the MongoDB service
3. Use `MONGO_URI=mongodb://127.0.0.1:27017/ecommerce` in your `.env`

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/ecommerce-app.git
cd ecommerce-app
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/ecommerce
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:5173

# Optional — Email notifications
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
```

Seed the database with sample data:

```bash
npm run seed
```

Start the backend server:

```bash
npm run dev
```

The API will be available at `http://localhost:5000`.

### 3. Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

## Demo Accounts

| Role  | Email               | Password  |
|-------|---------------------|-----------|
| Admin | admin@shophub.com   | admin123  |
| User  | user@shophub.com    | user123   |

## API Endpoints

### Authentication
| Method | Endpoint              | Access  | Description        |
|--------|-----------------------|---------|--------------------|
| POST   | `/api/users/register` | Public  | Register new user  |
| POST   | `/api/users/login`    | Public  | Login user         |
| GET    | `/api/users/profile`  | Private | Get user profile   |
| PUT    | `/api/users/profile`  | Private | Update profile     |
| GET    | `/api/users`          | Admin   | List all users     |
| DELETE | `/api/users/:id`      | Admin   | Delete user        |

### Products
| Method | Endpoint                    | Access  | Description          |
|--------|-----------------------------|---------|----------------------|
| GET    | `/api/products`             | Public  | List products        |
| GET    | `/api/products/:id`         | Public  | Get product details  |
| GET    | `/api/products/categories`  | Public  | Get categories       |
| POST   | `/api/products`             | Admin   | Create product       |
| PUT    | `/api/products/:id`         | Admin   | Update product       |
| DELETE | `/api/products/:id`         | Admin   | Delete product       |
| POST   | `/api/products/:id/reviews` | Private | Add product review   |

### Orders
| Method | Endpoint                  | Access  | Description           |
|--------|---------------------------|---------|-----------------------|
| POST   | `/api/orders`             | Private | Create order          |
| GET    | `/api/orders/myorders`    | Private | Get user's orders     |
| GET    | `/api/orders/:id`         | Private | Get order details     |
| GET    | `/api/orders/all`         | Admin   | Get all orders        |
| PUT    | `/api/orders/:id/status`  | Admin   | Update order status   |
| GET    | `/api/orders/stats`       | Admin   | Dashboard statistics  |

### Wishlist
| Method | Endpoint                      | Access  | Description            |
|--------|-------------------------------|---------|------------------------|
| GET    | `/api/wishlist`               | Private | Get wishlist           |
| POST   | `/api/wishlist/:productId`    | Private | Add to wishlist        |
| DELETE | `/api/wishlist/:productId`    | Private | Remove from wishlist   |

## Screenshots & Demo

Record a demo video showcasing:
1. User registration and login
2. Browsing products with search and category filters
3. Adding items to cart and wishlist
4. Placing an order and viewing order history
5. Admin panel — managing products, users, and orders

## LinkedIn Submission

Post your demo video on LinkedIn with:
- Brief project overview
- Technologies used (React, Express, Node.js, MongoDB)
- Key features implemented
- GitHub repository link
- Tag instructors: [Ahmad Dev](https://www.linkedin.com/in/ahmaddev-ai/) and [Zeeshan Ali](https://www.linkedin.com/in/zeeshan-ali-dev/)

## License

This project is open source and available under the [MIT License](LICENSE).
