# 🍴 Food Delivery App - Backend  

A **Food Delivery Backend API** built with **Node.js, Express, MongoDB, and Mongoose**.  
It includes **authentication, cart management, food products, categories, orders, and more**.  
All APIs are tested with **Postman** 🚀.  

---

## ✨ Features  
✅ User Authentication (Register, Login, Email Verify, Reset Password)  
✅ Profile Management (Upload, Update, Delete Profile Picture)  
✅ Cart System (Add, Update, Remove, Clear Cart)  
✅ Food Products CRUD  
✅ Categories CRUD  
✅ Orders (Place, Track, History)  
✅ Search & Filters (Category, Price, Name)  
✅ Role-based Access (User & Owner)  
✅ Delivery Boy Role Assignment & Order Handling <br>
✅ API Testing with **Postman**  

---

## 🛠️ Tech Stack  

| Technology | Usage |
|------------|--------|
| **Node.js** | Runtime Environment |
| **Express.js** | Web Framework |
| **MongoDB + Mongoose** | Database & ODM |
| **JWT** | Authentication |
| **Nodemailer** | Email Service |
| **Multer** | File Upload (Profile Pics) |
| **CSRF Protection** | Security |
| **Postman** | API Testing |

---

## 📌 API Routes  

<details>
<summary>👤 User Routes</summary>

- `POST /api/v1/register-user` → Register a new user  
- `POST /api/v1/verify-email` → Verify user email  
- `POST /api/v1/login-user` → Login user  
- `GET /api/v1/csrf-token` → Get CSRF token  
- `GET /api/v1/logout-user` → Logout user  
- `POST /api/v1/send-password-reset-token` → Send reset token  
- `POST /api/v1/reset-password/:token` → Reset password  

</details>

<details>
<summary>🍔 Food Product Routes</summary>

- `POST /api/v1/adding-food-items` → Add food (Owner only)  
- `PUT /api/v1/update-food-items/:foodItemId` → Update food (Owner only)  
- `GET /api/v1/all-food-lists` → Get all food items  
- `GET /api/v1/single-food/:singleFoodItemId` → Get single food item  
- `GET /api/v1/products/food-category` → Filter by category  
- `GET /api/v1/foods/price` → Filter by price (min & max)  
- `GET /api/v1/foods/category` → Get foods with category  
- `GET /api/v1/foods/fields` → Get foods with name & price only  
- `GET /api/v1/foods/search` → Search food items  

</details>

<details>
<summary>🛒 Cart Routes</summary>

- `POST /api/v1/add-cart` → Add to cart  
- `GET /api/v1/cart-list/:cartId` → Get cart details  
- `PUT /api/v1/update-cart/:cartId` → Update cart  
- `DELETE /api/v1/remove-cart/:cartId` → Remove cart  
- `DELETE /api/v1/clear-cart` → Clear entire cart  
- `DELETE /api/v1/cart/:cartId/item/:productId` → Remove specific item  

</details>

<details>
<summary>📂 Category Routes</summary>

- `POST /api/v1/add-food-category` → Add category (Owner only)  
- `PUT /api/v1/update-food-category/:foodId` → Update category (Owner only)  
- `DELETE /api/v1/delete-food-category/:foodId` → Delete category (Owner only)  
- `GET /api/v1/all-food-category-list` → Get all categories  
- `GET /api/v1/single-category-food/:foodId` → Get single category  

</details>

<details>
<summary>👤 User Profile Routes</summary>

- `POST /api/v1/auth-user/upload-profile-pic` → Upload profile picture  
- `PUT /api/v1/auth-user/update-profile-pic` → Update profile picture  
- `GET /api/v1/auth-user/profile-pic` → Get profile picture  
- `DELETE /api/v1/auth-user/delete-profile-pic` → Delete profile picture  

</details>

<details>
<summary>📦 Order Routes</summary>

- `POST /api/v1/make-order/:cartId` → Make order from cart  
- `PATCH /api/v1/:orderId/status` → Update order status (Owner only)  
- `PATCH /api/v1/:orderId/history` → Get order history (Owner only)  
- `GET /api/v1/my` → Get all my orders (User)  
- `GET /api/v1/search/my` → Search orders (User)  
- `GET /api/v1/order-list` → Get all orders (Owner only)  

</details>

<details>

<summary>🚚 Delivery Boy Routes</summary>

- `POST   /api/v1/delivery/adding-details`  -> Add delivery boy details (User)
- `PATCH  /api/v1/delivery/role` -> Change user role to delivery boy (Owner only)
- `PATCH  /api/v1/delivery/orders/:orderId/assign` -> Assign order to a delivery boy (Owner only)
- `GET    /api/v1/delivery/deliveryBoy/:id/orders` -> Fetch all assigned orders (Delivery Boy)
- `PATCH  /api/v1/delivery/deliveryBoy/:id/order/status` -> Update assigned order status (Delivery Boy)
- `GET    /api/v1/delivery/:id/orderStatus` -> Fetch order status (Customer)


</details>

---

## ⚡ Getting Started  

### 1️⃣ Clone Repo  
```bash
 https://github.com/mihirkumarsingh21/food-delivery-app-backend.git
cd food-delivery-app-backend](https://github.com/mihirkumarsingh21/Food-Delivery-Backend.git)
```
## 🚀 Deployment

This project is live on Railway
👉 https://food-delivery-backend-production-0710.up.railway.app

## 🌐 How to Use the URL

You can use this deployed URL to test the backend endpoints:  

 **In Postman** – Replace `localhost:5000` with the live URL.  
   Example:  https://food-delivery-backend-production-0710.up.railway.app/api/v1/register-user

## 🔑 Environment Variables  

Create a `.env` file in the root:  

```env
PORT=5000
MONGO_URI=your_mongo_uri
JWT_SECRET=your_secret
EMAIL_USER=your_email
EMAIL_PASS=your_password
```

## Setup  

```bash
https://github.com/mihirkumarsingh21/Food-Delivery-Backend.git
cd backend
npm install
npm run server
```




