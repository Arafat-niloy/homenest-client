// tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  
  // এই অংশটি এডিট করুন
  plugins: [
    require('daisyui'),
  ],
  
  // daisyUI-এর জন্য এই নতুন অবজেক্টটি যোগ করুন
  daisyui: {
    themes: ["light", "dark"], // 'light' এবং 'dark' থিম দুটি এনাবল (enable) করা হলো
  },
}