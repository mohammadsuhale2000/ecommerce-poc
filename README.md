
# RapidMart - Quick Commerce Website

RapidMart is a full-stack quick commerce platform designed to provide a seamless online shopping experience. The website is built using modern technologies like Next.js, shadcn component library, MongoDB, Firebase, and Stripe for handling payments.

## Features
- **Product Browsing**: Users can easily explore products categorized for quick navigation.
- **User Authentication**: Secure login and registration.
- **Payment Integration**: Stripe handles secure and reliable payments.
- **Responsive Design**: Optimized for all devices, providing a smooth user experience on mobile, tablet, and desktop.
- **Fast & Scalable**: Built with Next.js for both frontend and backend, ensuring high performance and scalability.

## Tech Stack
- **Next.js**: A React framework that powers both the frontend and backend of the application, enabling server-side rendering and API routes for optimized performance.
- **shadcn**: A flexible and highly customizable component library built on React, used to style and build the user interface of the website.
- **MongoDB**: NoSQL database used to store all product, user, and order-related data.
- **Firebase**: Firebase is used as an object storage solution to store product images and other media.
- **Stripe**: Stripe is integrated to provide a reliable and secure payment gateway for handling transactions.

## Setup & Installation

### Prerequisites
1. **Node.js** must be installed.

### 1. Clone the repository:

```bash
git clone https://github.com/raagvitech/rapidmart.git
```

### 2. Navigate to the rapid-mart remote repository from the VS code in left bottom corner.

### 3. Navigate to the project directory:

```bash
cd rapidmart
```

### 4. Install dependencies:

```bash
npm install
```

### 5. Set up environment variables. Create a `.env.local` file in the root of your project and add the necessary configurations:

```bash
    MONGO_URI= "mongodb+srv://sbhuvan455:gaiDu4VOoQtHTOID@cluster0.ihlpogh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    ACCESS_TOKEN_SECRET= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
    GOOGLE_MAPS_API_KEY="AIzaSyBdRJyVJI6Dgjw_gICCHcyd2qaXQHBI2Rg"
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="AIzaSyBdRJyVJI6Dgjw_gICCHcyd2qaXQHBI2Rg"
    NEXT_PUBLIC_STRIPE_PUBLISHER_KEY="pk_test_51PspazP1jXwx1qq25nhbBwQmGO7AdysWo46kVVatrv7N0xSpb1fZ7MibnLfTATyZ6UHJkXHweIfbsMQ68yN80yWu00ZjfPQ1TF"
    STRIPE_SECRET_KEY="sk_test_51PspazP1jXwx1qq2GnJHgpw1ZkrtHYuftt7TC0is2ypgLl1QecZ5t4eIXqnTEaKgkgVnZKUDiGKfQdIvF5olvTf300eWleOj1i"
    NEXT_PUBLIC_API_KEY="AIzaSyB8XHkpef6Azxvtu3GwNTS6HqzK0j_SOLE"
    NEXT_PUBLIC_APP_ID="1:1005474521542:web:d199504aff7d090c8592c7"
```

### 6. Run the development server:

```bash
npm run dev
```

### 7. Visit the application at [http://localhost:3000](http://localhost:3000).

### 8. If you find any troubleshoot errors related to mongobd connection change the dns by following the below link
https://www.hellotech.com/guide/for/how-to-change-dns-server-windows-mac#:~:text=Windows%2010%20Computer-,To%[…]20following%20DNS%20server%20address
