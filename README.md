# DashNGShop - Luxury E-Commerce MVP

A modern, production-ready e-commerce platform built with React, TypeScript, Node.js, and MongoDB. Features a sophisticated UI inspired by luxury fashion brands with complete user authentication, cart management, and admin dashboard.

## ✨ Features

### Frontend
- **Modern React 18** with TypeScript and Vite
- **Responsive Design** with Tailwind CSS
- **Smooth Animations** using Framer Motion
- **State Management** with Context API
- **Shopping Cart** with persistent storage
- **User Authentication** with JWT
- **Product Catalog** with search and filtering
- **Dashboard** for admin/staff users

### Backend
- **Node.js & Express** with TypeScript
- **MongoDB** with Mongoose ODM
- **JWT Authentication** with bcrypt
- **Image Upload** with Cloudinary
- **Real-time Updates** via WebSockets
- **Rate Limiting** and security middleware
- **Input Validation** with Zod
- **Payment Integration** (Paystack simulation)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- MongoDB (local or Atlas)
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/dashngshop-mvp.git
cd dashngshop-mvp
```

2. **Install dependencies**
```bash
npm run setup
```

3. **Environment Setup**
```bash
# Copy environment files
cp .env.example .env
cp client/.env.local.example client/.env.local

# Update the environment variables with your values
```

4. **Start MongoDB**
```bash
# If using local MongoDB
mongod

# Or start your MongoDB Atlas connection
```

5. **Run the application**
```bash
# Development mode (runs both client and server)
npm run dev

# Or run separately
npm run client:dev  # Frontend only (port 3000)
npm run server:dev  # Backend only (port 5000)
```

## 📁 Project Structure

```
dashngshop-mvp/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── contexts/       # React Context providers
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   ├── data/           # Mock data and types
│   │   └── utils/          # Helper functions
│   ├── public/             # Static assets
│   └── package.json
├── server/                 # Node.js backend
│   ├── src/
│   │   ├── controllers/    # Route controllers
│   │   ├── middleware/     # Custom middleware
│   │   ├── models/         # MongoDB models
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   └── utils/          # Helper functions
│   └── package.json
└── package.json           # Root package.json
```

## 🎯 Key Pages & Features

### Public Pages
- **Homepage** - Hero section, featured products, brand story
- **Products** - Product catalog with filtering and search
- **Product Detail** - Detailed product view with variants
- **Categories** - Browse by product categories
- **New Arrivals** - Latest products
- **Cart & Checkout** - Shopping cart and order placement
- **Auth Pages** - Login and registration

### Dashboard (Admin/Staff)
- **Analytics** - Sales metrics and charts
- **Products** - Product management (CRUD)
- **Orders** - Order management and tracking
- **Inventory** - Stock management
- **Customers** - Customer management
- **Settings** - System configuration

## 🛠️ Tech Stack

### Frontend
- React 18 with TypeScript
- Vite (build tool)
- Tailwind CSS (styling)
- Framer Motion (animations)
- React Router (routing)
- React Query (data fetching)
- Lucide React (icons)
- Axios (HTTP client)

### Backend
- Node.js with Express
- TypeScript
- MongoDB with Mongoose
- JWT for authentication
- Bcrypt for password hashing
- Multer for file uploads
- Cloudinary for image storage
- Socket.io for real-time features
- Zod for validation
- Helmet for security

## 🔒 Security Features

- JWT token authentication
- Password hashing with bcrypt
- Rate limiting to prevent abuse
- Input validation and sanitization
- CORS configuration
- Helmet for security headers
- Environment variable protection

## 📱 Responsive Design

The application is fully responsive and works seamlessly across:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🎨 Design System

### Typography
- **Primary Font**: Playfair Display (serif) for headings
- **Secondary Font**: Inter (sans-serif) for body text

### Colors
- **Primary**: Neutral tones (charcoal, warm grays)
- **Accent**: Earth tones (camel, burgundy)
- **Status**: Standard semantic colors

### Components
- Consistent spacing using Tailwind's scale
- Subtle shadows and borders
- Smooth hover and focus states
- Loading and error states

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
cd client
npm run build
# Deploy the `dist` folder
```

### Backend (Railway/Heroku)
```bash
cd server
npm run build
# Deploy with your platform of choice
```

### Environment Variables
Make sure to set all required environment variables in your deployment platform.

## 🧪 Testing

```bash
# Run frontend tests
cd client
npm run test

# Run backend tests
cd server
npm run test
```

## 📦 Production Build

```bash
# Build frontend
cd client
npm run build

# Build backend
cd server
npm run build

# Start production server
cd server
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Design inspiration from luxury fashion e-commerce sites
- Icons by Lucide React
- Images from Unsplash
- Animations powered by Framer Motion

## 📞 Support

For support, email support@dashngshop.com or join our Slack channel.

---

**Happy coding! 🚀**