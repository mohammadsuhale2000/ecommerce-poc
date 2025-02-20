import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: "zepto-deefb.firebaseapp.com",
  projectId: "zepto-deefb",
  storageBucket: "zepto-deefb.appspot.com",
  messagingSenderId: "1005474521542",
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: "G-E56KPMWLHZ"
};

const app = initializeApp(firebaseConfig);

export { app };