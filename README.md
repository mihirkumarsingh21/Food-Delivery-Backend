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
✅ Delivery Boy Role Assignment & Order Handling
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

- `POST /register-user` → Register a new user  
- `POST /verify-email` → Verify user email  
- `POST /login-user` → Login user  
- `GET /csrf-token` → Get CSRF token  
- `GET /logout-user` → Logout user  
- `POST /send-password-reset-token` → Send reset token  
- `POST /reset-password/:token` → Reset password  

</details>

<details>
<summary>🍔 Food Product Routes</summary>

- `POST /adding-food-items` → Add food (Owner only)  
- `PUT /update-food-items/:foodItemId` → Update food (Owner only)  
- `GET /all-food-lists` → Get all food items  
- `GET /single-food/:singleFoodItemId` → Get single food item  
- `GET /products/food-category` → Filter by category  
- `GET /foods/price` → Filter by price (min & max)  
- `GET /foods/category` → Get foods with category  
- `GET /foods/fields` → Get foods with name & price only  
- `GET /foods/search` → Search food items  

</details>

<details>
<summary>🛒 Cart Routes</summary>

- `POST /add-cart` → Add to cart  
- `GET /cart-list/:cartId` → Get cart details  
- `PUT /update-cart/:cartId` → Update cart  
- `DELETE /remove-cart/:cartId` → Remove cart  
- `DELETE /clear-cart` → Clear entire cart  
- `DELETE /cart/:cartId/item/:productId` → Remove specific item  

</details>

<details>
<summary>📂 Category Routes</summary>

- `POST /add-food-category` → Add category (Owner only)  
- `PUT /update-food-category/:foodId` → Update category (Owner only)  
- `DELETE /delete-food-category/:foodId` → Delete category (Owner only)  
- `GET /all-food-category-list` → Get all categories  
- `GET /single-category-food/:foodId` → Get single category  

</details>

<details>
<summary>👤 User Profile Routes</summary>

- `POST /auth-user/upload-profile-pic` → Upload profile picture  
- `PUT /auth-user/update-profile-pic` → Update profile picture  
- `GET /auth-user/profile-pic` → Get profile picture  
- `DELETE /auth-user/delete-profile-pic` → Delete profile picture  

</details>

<details>
<summary>📦 Order Routes</summary>

- `POST /make-order/:cartId` → Make order from cart  
- `PATCH /:orderId/status` → Update order status (Owner only)  
- `PATCH /:orderId/history` → Get order history (Owner only)  
- `GET /my` → Get all my orders (User)  
- `GET /search/my` → Search orders (User)  
- `GET /order-list` → Get all orders (Owner only)  

</details>

<details>

<summary>🚚 Delivery Boy Routes</summary>

`POST   /api/v1/delivery/adding-details`  -> Add delivery boy details (User)
`PATCH  /api/v1/delivery/role` -> Change user role to delivery boy (Owner only)
`PATCH  /api/v1/delivery/orders/:orderId/assign` -> Assign order to a delivery boy (Owner only)
`GET    /api/v1/delivery/deliveryBoy/:id/orders` -> Fetch all assigned orders (Delivery Boy)
`PATCH  /api/v1/delivery/deliveryBoy/:id/order/status` -> Update assigned order status (Delivery Boy)
`GET    /api/v1/delivery/:id/orderStatus` -> Fetch order status (Customer)


</details>

---

## ⚡ Getting Started  

### 1️⃣ Clone Repo  
```bash
 https://github.com/mihirkumarsingh21/food-delivery-app-backend.git
cd food-delivery-app-backend](https://github.com/mihirkumarsingh21/Food-Delivery-Backend.git)
```


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




