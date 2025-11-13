# 🏠 HomeNest - Your Dream Property, Simplified
**Live Site:** [https://cute-kelpie-fadb6d.netlify.app/](https://cute-kelpie-fadb6d.netlify.app/)  

HomeNest is a modern real estate listing platform where property owners can post their available rentals or sale listings, and users can browse, search, and filter properties by location, price, or type. It provides a seamless experience for both property owners and seekers.

## 🔗 Project Links

| Type | URL Placeholder |
| :--- | :--- |
| **Live Site URL** | `[https://cute-kelpie-fadb6d.netlify.app/]` |
| **Client Repository** | `[https://github.com/Arafat-niloy/homenest-client]` |
| **Server Repository** | `[https://github.com/Arafat-niloy/homenest-server]` |
---

## 🚀 Features

- **Dynamic Property Listings:** View all properties with detailed information including name, category, price, location, and posted by.  
- **User Authentication:** Register and login using Email/Password or Google Authentication. Private routes ensure secure access.  
- **Add & Manage Properties:** Logged-in users can add, update, and delete their own property listings.  
- **Ratings & Reviews:** Users can rate properties from 1 to 5 stars and leave short review text.  
- **Search & Sort Functionality:** Search properties by name and sort by price or posted date.  
- **Responsive Design:** Fully responsive UI for mobile, tablet, and desktop devices.  
- **Light/Dark Mode:** Toggle between light and dark themes for a better user experience.  
- **User Profile Dropdown:** Shows user's display name, email, and logout option when logged in.  
- **Real-time Feedback:** Success and error messages are displayed using toast notifications or sweet alerts instead of browser alerts.  
- **Featured Properties on Home Page:** Dynamically displays the 6 newest properties with a slider for important announcements.  

---

## 🏠 Pages Overview

1. **Home:**  
   - Slider with 3 slides  
   - Featured properties (fetched from DB, newest first)  
   - Why Choose Us section  
   - Two extra relevant sections  

2. **All Properties:**  
   - Browse all properties with search and sort functionality  
   - View details of any property  

3. **Add Property (Private Route):**  
   - Add new property with name, description, category, price, location, and image link  

4. **My Properties (Private Route):**  
   - See, update, or delete your own properties  

5. **Property Details (Private Route):**  
   - Full property info with ratings & reviews  

6. **My Ratings (Private Route):**  
   - See all property reviews you have made  

7. **Authentication:**  
   - Register page with name, email, photoURL, password, and Google login  
   - Login page with email/password and Google login  

8. **404 Page:**  
   - Custom Not Found page for invalid routes  

---

## 🛠 Tech Stack

- **Frontend:** React, React Router, Tailwind CSS, Carousel Library, Toast/SweetAlert  
- **Backend:** Node.js, Express.js, MongoDB  
- **Authentication:** Firebase Authentication  
- **Deployment:** Netlify (Client), Vercel (Server)   

---

## 🛠️ Getting Started

Follow these steps to get your development environment set up and run the project locally.

### 1. Prerequisites

* Node.js (v18+)
* npm or yarn
* MongoDB Atlas Account
* Firebase Project (for Auth)

### 2. Server-Side Setup

1.  Clone the server repository:
    ```bash
    git clone [https://github.com/Arafat-niloy/homenest-server]
    cd homenest-server
    ```
2.  Install server dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the root directory and add your credentials:
    ```env
    PORT=5000
    MONGODB_URI="your_mongodb_connection_string"
    # Optional: For server-side token verification (Advanced)
    # FIREBASE_ADMIN_SERVICE_ACCOUNT="your_service_account_config" 
    ```
4.  Run the server:
    ```bash
    npm start # or npm run dev
    ```

### 3. Client-Side Setup

1.  Clone the client repository:
    ```bash
    git clone [https://github.com/Arafat-niloy/homenest-client]
    cd homenest-client
    ```
2.  Install client dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the root directory and add your credentials:
    ```env
    VITE_FIREBASE_API_KEY="your_firebase_api_key"
    VITE_SERVER_BASE_URL="http://localhost:5000" # Or your Vercel URL
    # Add other necessary Firebase config variables (Auth Domain, Project ID, etc.)
    ```
4.  Run the client application:
    ```bash
    npm run dev
    ```
    ---