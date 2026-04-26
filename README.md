# TregoIndia Clothing

Mobile-first luxury streetwear storefront built with Next.js App Router, Tailwind CSS, Framer Motion, Three.js, MongoDB, JWT auth, Stripe-ready checkout, Cloudinary uploads, and an admin dashboard.

## Stack

- Next.js App Router
- Tailwind CSS
- Framer Motion
- Three.js via `@react-three/fiber`
- MongoDB + Mongoose
- JWT auth with secure cookie storage
- Stripe-ready checkout with demo fallback
- Cloudinary uploads

## Features

- Intro animation with logo break and random ad handoff
- Mobile bottom navigation + hamburger menu
- Swipe-ready trending slider
- Responsive product pages with sticky mobile add-to-cart
- Cart and one-page checkout
- Profile and order tracking
- Admin dashboard with charts, product CRUD, stock control, and order status updates
- Demo products, coupons, and seeded admin account

## Environment

Copy `.env.example` to `.env.local` and fill in:

```bash
MONGODB_URI=
JWT_SECRET=
NEXT_PUBLIC_BASE_URL=http://localhost:3000
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

## Local run

```bash
npm install
npm run dev
```

## Demo admin

- Email: `admin@tregoindia.com`
- Password: `Admin@12345`

The first successful MongoDB connection seeds demo products, coupons, and the admin account automatically.
