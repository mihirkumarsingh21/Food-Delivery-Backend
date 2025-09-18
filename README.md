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
✅ Rating Functionality <br>
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

<details>


<summary>⭐ Rating Routes</summary>

- `POST /api/v1/reviews/add/:productId` → Add rating & comment (User)
- `PATCH /api/v1/reviews/update/:reviewId` → Update existing rating (User)
- `DELETE /api/v1/reviews/delete/:reviewId` → Delete rating & reset stats (User)
- `GET /api/v1/reviews/product/:productId` → Get all ratings for a food item 
</details>
---

## 📸 Screenshots

### 📂 Project Structure

<img width="1366" height="768" alt="Screenshot 2025-09-18 132619" src="https://github.com/user-attachments/assets/82958f5f-5c2a-443b-bb20-7cba35af3cb4" />
<img width="1366" height="768" alt="Screenshot 2025-09-18 132550" src="https://github.com/user-attachments/assets/d81cb2ba-74fc-4b44-986a-f9f7807ee242" />



### 👤 User Authentication
- **Register User**
<img width="1317" height="621" alt="Screenshot 2025-09-16 121651" src="https://github.com/user-attachments/assets/8988b549-c2eb-4dbb-b61d-ed96dd57ce67" />


- **Login User**
 <img width="1366" height="768" alt="Screenshot 2025-09-16 115758" src="https://github.com/user-attachments/assets/48f6d623-b46c-45bb-981f-9d879bdf780a" />


---

### 📧 Email Verification
- **Verify Email**
<img width="1366" height="768" alt="Screenshot 2025-09-16 121905" src="https://github.com/user-attachments/assets/60d11f7e-b81a-40fd-b487-db2ea7c9a2ce" />

- **Send Verification Mail**
<img width="1366" height="768" alt="Screenshot 2025-09-16 122259" src="https://github.com/user-attachments/assets/9b05c0fb-4e8b-41d2-9e22-6fad5ac0700c" />

### ✉️ Password Reset Email 

<img width="1366" height="768" alt="Screenshot 2025-09-16 122827" src="https://github.com/user-attachments/assets/4425c9b8-6d36-4447-aa7e-79f43b960cd6" />

<img width="1366" height="768" alt="Screenshot 2025-09-16 123111" src="https://github.com/user-attachments/assets/d4413048-9fbf-4285-9698-34c4ac541858" />

## ✅ Password Reset Success Email

> **Note:** This helps users know that their account is secure and the reset was successful.

---

### Screenshot

<img width="1366" height="768" alt="Screenshot 2025-09-16 124100" src="https://github.com/user-attachments/assets/54f8e05a-3006-4c76-993b-b911dc29f283" />

<img width="1366" height="768" alt="Screenshot 2025-09-16 124150" src="https://github.com/user-attachments/assets/43b21b7e-d257-4f82-bdc6-1f8de4a21995" />

### 🛒 Cart & Orders
- **Add to Cart**
  <img width="1366" height="768" alt="Screenshot 2025-09-16 120123" src="https://github.com/user-attachments/assets/1fe99720-a354-40d4-a601-0a4b9c3e4b28" />


- **Create Order from Cart**
 <img width="1366" height="768" alt="Screenshot 2025-09-16 120408" src="https://github.com/user-attachments/assets/f3b75026-e921-405e-881a-7c45c01e965d" />


---

### 🚚 Delivery Boy Functionality
- **Assign Order to Delivery Boy (Owner Only)**
 <img width="1366" height="768" alt="Screenshot 2025-09-16 120518" src="https://github.com/user-attachments/assets/9ddcb0be-8a33-40a0-bd10-875e6f6242a4" />


- **Delivery Boy Updating Order Status**
  <img width="1366" height="768" alt="Screenshot 2025-09-16 120607" src="https://github.com/user-attachments/assets/3f8238c2-a11a-4db8-8461-11fdcfb4cb3b" />


---
### ⭐ Rating Functionality
- **Add Rating (Auth User)**
<img width="1366" height="768" alt="Screenshot 2025-09-18 133707" src="https://github.com/user-attachments/assets/178a8b90-7905-43a6-a25c-fb8cfdf80f40" />

- **Update Rating (Auth User)**
<img width="1366" height="768" alt="Screenshot 2025-09-18 134546" src="https://github.com/user-attachments/assets/4bf048e6-be90-4a2f-b320-e9167d7197c8" />

- **Delete Rating (Auth User)**

<img width="1366" height="768" alt="Screenshot 2025-09-18 133809" src="https://github.com/user-attachments/assets/b783444d-9a28-4270-8eba-2113b48c78d1" />

### 🗄️ MongoDB Atlas
- **Users Collection**
 <img width="1355" height="716" alt="Screenshot 2025-09-16 120840" src="https://github.com/user-attachments/assets/d5e58533-e1b4-46a2-a7a3-bcf5826904cc" />


- **Orders Collection**
  <img width="1351" height="709" alt="Screenshot 2025-09-16 121034" src="https://github.com/user-attachments/assets/1027c748-88f7-4e23-a23c-082804010e38" />


---

### ☁️ Deployment
- **Railway**
   <img width="1366" height="768" alt="Screenshot 2025-09-16 121120" src="https://github.com/user-attachments/assets/626d828d-b2f2-4792-ba53-a346c537d450" />


- **Deployed API Endpoint**
 <img width="1366" height="768" alt="Screenshot 2025-09-16 145256" src="https://github.com/user-attachments/assets/c3d0fe98-c834-4d6a-8707-8873caf12e3d" />




## ⚡ Getting Started  

### 1️⃣ Clone Repo  
```bash
 https://github.com/mihirkumarsingh21/food-delivery-app-backend.git
cd food-delivery-app-backend](https://github.com/mihirkumarsingh21/Food-Delivery-Backend.git)
```
## 🚀 Deployment

This project is live on Railway
👉 https://food-delivery-backend-production-0711.up.railway.app

## 🌐 How to Use the URL

You can use this deployed URL to test the backend endpoints:  

 **In Postman** – Replace `localhost:5000` with the live URL.  
   Example:  https://food-delivery-backend-production-0711.up.railway.app/api/v1/register-user

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




