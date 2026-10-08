Perfume Shop - Full Stack Project
📌 Overview
This is a full-stack perfume shop built for Olcademy’s Web Development Internship Assignment. The backend stores the bottles and reviews in MongoDB. The frontend is a React storefront with an ivory paper layout, a short catalog, and a preview cart.

Live Deployment
Frontend: https://perfume-shop-digital.netlify.app/

Backend: https://perfume-shop-backend-fryp.onrender.com

The deployed frontend must be built with VITE_API_URL set to the backend URL. The Render service can take a few seconds to wake up on the first request.

🚀 Features
Responsive navbar with a mark, active link, cart count, and mobile menu
Editorial hero with a featured bottle
Trending perfumes on the homepage
One wide fragrance row, so the homepage is not only a card grid
Collections page for the 10 perfumes, with search, price filter, and sort
Top rated section, filled from stored reviews
Product page
Description, price in INR, and sizes
Thumbnail gallery
Notes drawn from the description
Reviews stored in MongoDB
Share button (Web Share API, then copy link, then Twitter)
Related bottles from the same edit
Cart with quantity, line totals, a summary, and a preview checkout
Contact page with a still-life panel
Paper texture, closing band, and loading skeletons
Checkout confirms the bag in the browser. It does not take payment. The contact form confirms the note on screen. It does not send email.

🛠 Tech Stack
Frontend: React, Tailwind CSS, Vite, React Router, Framer Motion
Backend: Node.js, Express
Database: MongoDB (Mongoose)
📂 Project Structure
PerfumeShop/
│
├── backend/
│ ├── controllers/
│ │ └── productController.js
│ ├── models/
│ │ └── Product.js
│ ├── routes/
│ │ └── productRoutes.js
│ ├── public/
│ │ └── images/ # bottle images, served at /images
│ ├── seed.js
│ ├── server.js
│ ├── package.json
│ └── .env
│
├── frontend/
│ ├── public/ # favicon and paper grain
│ ├── src/
│ │ ├── components/
│ │ │ ├── Navbar.jsx
│ │ │ ├── Footer.jsx
│ │ │ ├── ProductCard.jsx
│ │ │ ├── Logo.jsx
│ │ │ ├── ClosingBand.jsx
│ │ │ └── EditRow.jsx
│ │ ├── lib/
│ │ │ └── api.js # API base URL and price formatting
│ │ ├── pages/
│ │ │ ├── HomePage.jsx
│ │ │ ├── CollectionsPage.jsx
│ │ │ ├── ProductPage.jsx
│ │ │ ├── CartPage.jsx
│ │ │ └── ContactPage.jsx
│ │ ├── App.jsx
│ │ └── main.jsx
│ ├── .env.example
│ ├── index.html
│ ├── package.json
│ ├── tailwind.config.js
│ └── vite.config.js
│
├── README.md
└── screenshots/
Bottle images live in backend/public/images. The frontend does not keep its own copy.

Modules / libraries
The lists below are already in each package.json. npm install inside the folder is enough.

Backend
cd backend
npm install
express — server
mongoose — MongoDB
cors — lets the frontend call the API
dotenv — reads MONGO_URI and PORT
nodemon — restarts the server while developing
Frontend
cd frontend
npm install
axios — loads products and reviews
react-router-dom — Home, Collections, Product, Cart, and Contact
framer-motion — the short hero fade
tailwindcss, postcss, autoprefixer — styling
react-icons and swiper are not used in this version.

▶️ Run locally
MongoDB needs to be running locally.

Clone the repo.

Install dependencies:

cd backend && npm install
cd ../frontend && npm install
Create backend/.env:
MONGO_URI=mongodb://127.0.0.1:27017/perfumeShop
PORT=5000
Seed the database:
cd backend
node seed.js
Run the backend:
npm run dev
Local API: http://localhost:5000

Run the frontend:
cd ../frontend
npm run dev
App: http://localhost:5173

For a local frontend, leave VITE_API_URL unset or set it to http://localhost:5000. Copy frontend/.env.example to frontend/.env if you need to point at another API, including the deployed one:

VITE_API_URL=https://perfume-shop-backend-fryp.onrender.com
Restart Vite after changing that file. On Netlify, set the same variable before the production build.

📷 Screenshots
These captures are the ones already attached to the repository.

Homepage
Homepage Homepage continued
Collections
Collections page Collections page continued
Product page
Product page Product page continued
Reviews
Reviews Reviews continued
Share
Share button
Author
Jiten Kumar
work.jiten282003@gmail.com
LinkedIn: https://www.linkedin.com/in/jiten-kumar-85a03217a
Portfolio: https://jitenkumarportfolio.netlify.app
GitHub: https://github.com/Jiten28
Repository: https://github.com/Jiten28/Perfume-Shop-MERN-Stack
