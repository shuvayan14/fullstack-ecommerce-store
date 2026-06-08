# 🛒 Full-Stack MERN E-Commerce Store

A complete, production-ready full-stack online marketplace built using the **MERN** stack (MongoDB, Express, React, Node.js). This application features secure user authentication, product search/filtering configurations, a persistent shopping cart state, a secure administrative dashboard, and a live integrated Stripe checkout pipeline.

---

## 🛠️ Key Architectural Features

* **Dynamic Product Search & Filtering:** Implemented a real-time storefront grid search with category dropdown filtering handled directly via case-insensitive MongoDB query parameters.
* **Persistent Shopping Cart Local-State:** Built a fully operational client-side cart system that safely handles quantity adjustments, tracks live subtotal pricing arithmetic, and preserves data using `localStorage` synchronization across browser refreshes.
* **Secure Session User Authentication:** Designed secure login and registration boundaries handled via password encryption hashing (`bcryptjs`) and signed JSON Web Tokens (JWT) for protected route persistence.
* **Stripe Checkout Integration:** Integrated the industrial-standard Stripe API backend configuration parameters to translate frontend cart items into a secure external checkout session.
* **Administrative Inventory Control Hub:** Constructed restricted custom middleware boundaries that protect database POST requests, rendering an admin-only interface layout to seamlessly add new inventory products directly to the live platform.

---

## 💻 Tech Stack Architecture

### Frontend (Client)
* **React.js** (Functional components & hooks state management)
* **Vite** (Next-generation ultra-fast frontend tooling build tool)
* **CSS3** (Flexbox & Grid layout frameworks)

### Backend & Database (Server)
* **Node.js & Express.js** (RESTful API routing architecture)
* **MongoDB Atlas** (Cloud integration database)
* **Mongoose** (Object Data Modeling schemas)

### Third-Party APIs
* **Stripe SDK Node module** (Secure credit card payment terminal processing)

---

## ⚙️ How to Setup and Run Locally

To spin up this repository on your local system, follow these execution phases:

### 1. Clone the Project Workspace
```bash
git clone [https://github.com/YOUR_USERNAME/ecommerce-store.git](https://github.com/YOUR_USERNAME/ecommerce-store.git)
cd ecommerce-store
