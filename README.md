# Perfume Shop - Full Stack Project

## 📌 Overview

This is a full-stack perfume shop built for Olcademy’s Web Development Internship Assignment. The backend stores the bottles and reviews in MongoDB. The frontend is a React storefront with an ivory paper layout, a short catalog, and a preview cart.

## Live Deployment

**Frontend:** https://perfume-shop-digital.netlify.app/

**Backend:** https://perfume-shop-backend-fryp.onrender.com

The deployed frontend must be built with `VITE_API_URL` set to the backend URL. The Render service can take a few seconds to wake up on the first request.

## 🚀 Features

- Responsive navbar with a mark, active link, cart count, and mobile menu
- Editorial hero with a featured bottle
- Trending perfumes on the homepage
- One wide fragrance row, so the homepage is not only a card grid
- Collections page for the 10 perfumes, with search, price filter, and sort
- Top rated section, filled from stored reviews
- Product page
  - Description, price in INR, and sizes
  - Thumbnail gallery
  - Notes drawn from the description
  - Reviews stored in MongoDB
  - Share button (Web Share API, then copy link, then Twitter)
  - Related bottles from the same edit
- Cart with quantity, line totals, a summary, and a preview checkout
- Contact page with a still-life panel
- Paper texture, closing band, and loading skeletons

Checkout confirms the bag in the browser. It does not take payment. The contact form confirms the note on screen. It does not send email.

## 🛠 Tech Stack

- **Frontend:** React, Tailwind CSS, Vite, React Router, Framer Motion
- **Backend:** Node.js, Express
- **Database:** MongoDB (Mongoose)

## 📂 Project Structure

```
PerfumeShop/
│
├── backend/
│   ├── controllers/
│   │   └── productController.js
│   ├── models/
│   │   └── Product.js
│   ├── routes/
│   │   └── productRoutes.js
│   ├── public/
│   │   └── images/          # bottle images, served at /images
│   ├── seed.js
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── public/              # favicon and paper grain
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   ├── Logo.jsx
│   │   │   ├── ClosingBand.jsx
│   │   │   └── EditRow.jsx
│   │   ├── lib/
│   │   │   └── api.js       # API base URL and price formatting
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── CollectionsPage.jsx
│   │   │   ├── ProductPage.jsx
│   │   │   ├── CartPage.jsx
│   │   │   └── ContactPage.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── README.md
└── screenshots/
```

Bottle images live in `backend/public/images`. The frontend does not keep its own copy.

## Modules / libraries

The lists below are already in each `package.json`. `npm install` inside the folder is enough.

### Backend

```bash
cd backend
npm install
```

- `express` — server
- `mongoose` — MongoDB
- `cors` — lets the frontend call the API
- `dotenv` — reads `MONGO_URI` and `PORT`
- `nodemon` — restarts the server while developing

### Frontend

```bash
cd frontend
npm install
```

- `axios` — loads products and reviews
- `react-router-dom` — Home, Collections, Product, Cart, and Contact
- `framer-motion` — the short hero fade
- `tailwindcss`, `postcss`, `autoprefixer` — styling

`react-icons` and `swiper` are not used in this version.

## ▶️ Run locally

MongoDB needs to be running locally.

1. Clone the repo.

2. Install dependencies:

```bash
cd backend && npm install
cd ../frontend && npm install
```

3. Create `backend/.env`:

```
MONGO_URI=mongodb://127.0.0.1:27017/perfumeShop
PORT=5000
```

4. Seed the database:

```bash
cd backend
node seed.js
```

5. Run the backend:

```bash
npm run dev
```

Local API: http://localhost:5000

6. Run the frontend:

```bash
cd ../frontend
npm run dev
```

App: http://localhost:5173

For a local frontend, leave `VITE_API_URL` unset or set it to `http://localhost:5000`. Copy `frontend/.env.example` to `frontend/.env` if you need to point at another API, including the deployed one:

```
VITE_API_URL=https://perfume-shop-backend-fryp.onrender.com
```

Restart Vite after changing that file. On Netlify, set the same variable before the production build.

## 📷 Screenshots

These captures are the ones already attached to the repository.

### Homepage

<img width="1262" height="884" alt="Homepage" src="https://github.com/user-attachments/assets/a1e5fe1e-7a54-4664-bb55-b679e36eb7fb" />
<img width="1265" height="886" alt="Homepage continued" src="https://github.com/user-attachments/assets/8639fcab-2c0f-4cfc-bd12-afadfe64951d" />

### Collections

<img width="1862" height="885" alt="Collections page" src="https://github.com/user-attachments/assets/542174bb-9630-4cd7-b066-79da7c450dfc" />
<img width="1863" height="885" alt="Collections page continued" src="https://github.com/user-attachments/assets/9960a6bb-3d10-414e-81bd-79ad0499a79c" />

### Product page

<img width="1262" height="879" alt="Product page" src="https://github.com/user-attachments/assets/f5e805e7-b553-4611-923f-43dc70ac7f9d" />
<img width="1269" height="885" alt="Product page continued" src="https://github.com/user-attachments/assets/35bc4060-88e7-49d1-b0b0-d7c125e8c5d3" />

### Reviews

<img width="1847" height="886" alt="Reviews" src="https://github.com/user-attachments/assets/0ff17520-7876-4c98-bf1c-c3d91e04b5f8" />
<img width="1861" height="883" alt="Reviews continued" src="https://github.com/user-attachments/assets/6ebee438-87b5-45ba-8682-ddd5d53e7592" />

### Share

<img width="1862" height="883" alt="Share button" src="https://github.com/user-attachments/assets/f548f4c8-ce47-43d9-9b12-942ff47148ea" />

## Author

Jiten Kumar  
work.jiten282003@gmail.com  
LinkedIn: https://www.linkedin.com/in/jiten-kumar-85a03217a  
Portfolio: https://jitenkumarportfolio.netlify.app  
GitHub: https://github.com/Jiten28  
Repository: https://github.com/Jiten28/Perfume-Shop-MERN-Stack
