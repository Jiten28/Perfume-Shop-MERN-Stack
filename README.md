# Perfume Shop - Full Stack Project

## 📌 Overview
This is a full-stack perfume shop web app built for Olcademy’s Web Development Internship Assignment.  
It showcases backend (Node.js, MongoDB) + frontend (React, Tailwind, Vite) with real product data and reviews.

## 🚀 Features
- Responsive Navbar
- Hero Banner with CTA
- Trending Perfumes (homepage)
- Collections Page (10 perfumes)
- Product Page
  - Description, Sizes, Multiple Images
  - Reviews (stored in MongoDB)
  - Share button (Web Share API / Twitter fallback)
- Top Rated Perfumes Section
- Floating perfume bottles background animation ✨

## 🛠 Tech Stack
- **Frontend**: React, TailwindCSS, Vite
- **Backend**: Node.js, Express
- **Database**: MongoDB (Mongoose ODM)

## 📂 Project Structure
```

PerfumeShop/
│
├── backend/
│ ├── controllers/
│ │ └── productController.js
│ ├── models/
│ │ └── Product.js
│ ├── routes/
│ │ └── productRoutes.js
│ ├── seed.js
│ ├── server.js
│ ├── package.json
│ └── .env
│
├── frontend/
│ ├── public/
│ │ └── images/ (perfume images)
│ ├── src/
│ │ ├── components/
│ │ │ ├── Navbar.jsx
│ │ │ ├── Footer.jsx
│ │ │ └── ProductCard.jsx
│ │ ├── pages/
│ │ │ ├── HomePage.jsx
│ │ │ ├── CollectionsPage.jsx
│ │ │ ├── ProductPage.jsx
│ │ │ └── ContactPage.jsx
│ │ ├── App.jsx
│ │ └── main.jsx
│ ├── index.css
│ ├── package.json
│ ├── tailwind.config.js
│ └── vite.config.js
│
├── README.md
└── screenshots/

````

## Modules/ Libraries to install 
🔹 Backend (Node + Express + MongoDB)

👉 Go into your backend folder:

cd backend

📦 Install these packages
npm install express mongoose cors dotenv
npm install nodemon --save-dev

✅ What each does:

express → Server framework.

mongoose → Interact with MongoDB.

cors → Enable frontend-backend communication.

dotenv → Manage environment variables (DB URL, PORT).

nodemon → Auto-restart server during dev.

🔹 Frontend (React + Vite + Tailwind)

👉 Go into your frontend folder:

cd frontend

📦 Install these packages
npm install axios react-router-dom
npm install -D tailwindcss@3 postcss autoprefixer

✅ What each does:

axios → Fetch API data (products, reviews) from backend.

react-router-dom → Page navigation (Home, Collections, Contact, ProductPage).

tailwindcss → Styling framework.

postcss & autoprefixer → Required for Tailwind.

🔹 Optional (but makes project professional 🚀)
npm install framer-motion
npm install react-icons
npm install swiper


framer-motion → Animations (smooth transitions, fade, floating bottles ✨).

react-icons → Social media/share icons.

swiper → Product image carousel (for product gallery).
````
````
## ▶️ Run Locally
1. Clone the repo
2. Install backend & frontend dependencies:
   ```bash
   cd backend && npm install
   cd ../frontend && npm install
````

3. Seed DB:

   ```bash
   cd backend
   node seed.js
   ```

4. Run backend:

   ```bash
   node server.js
   ```

   Server → [http://localhost:5000](http://localhost:5000)

5. Run frontend:

   ```bash
   cd ../frontend
   npm run dev
   ```

   App → [http://localhost:5173](http://localhost:5173)

````

## 📷 Screenshots

* Homepage
<img width="1262" height="884" alt="image" src="https://github.com/user-attachments/assets/a1e5fe1e-7a54-4664-bb55-b679e36eb7fb" />
<img width="1265" height="886" alt="image" src="https://github.com/user-attachments/assets/8639fcab-2c0f-4cfc-bd12-afadfe64951d" />

* Collections
<img width="1862" height="885" alt="image" src="https://github.com/user-attachments/assets/542174bb-9630-4cd7-b066-79da7c450dfc" />
<img width="1863" height="885" alt="image" src="https://github.com/user-attachments/assets/9960a6bb-3d10-414e-81bd-79ad0499a79c" />

* Product Page
<img width="1262" height="879" alt="image" src="https://github.com/user-attachments/assets/f5e805e7-b553-4611-923f-43dc70ac7f9d" />
<img width="1269" height="885" alt="image" src="https://github.com/user-attachments/assets/35bc4060-88e7-49d1-b0b0-d7c125e8c5d3" />

* Reviews
<img width="1847" height="886" alt="image" src="https://github.com/user-attachments/assets/0ff17520-7876-4c98-bf1c-c3d91e04b5f8" />
<img width="1861" height="883" alt="image" src="https://github.com/user-attachments/assets/6ebee438-87b5-45ba-8682-ddd5d53e7592" />

* Working Share Button
<img width="1862" height="883" alt="image" src="https://github.com/user-attachments/assets/f548f4c8-ce47-43d9-9b12-942ff47148ea" />

```

