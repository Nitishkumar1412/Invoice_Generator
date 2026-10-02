# 🧾 Invoice Generator

A simple, frontend-only invoice generator built with React and Vite. Fill in the details, preview your invoice, and download it as a PDF. No backend, no database, no sign-up.

🌐 **Live Demo:** [![Netlify Status](https://img.shields.io/badge/Netlify-Live-00C7B7?logo=netlify&logoColor=white)](https://nitish-invoice-hub.netlify.app/)

## ✨ Features

- 👤 Bill to and Bill from details with email, phone and GST / Tax ID
- 🛒 Add or remove items with quantity and price
- 🧮 Automatic subtotal, discount, tax and total
- 💱 Multiple currencies (₹, $, £, €, ₩, ¥, ₿)
- 👀 Review popup with a clean invoice layout
- 📄 Download invoice as PDF
- 🖨️ Print invoice
- 📧 Send invoice through your email app
- 💳 Payment details and notes
- 💾 Auto-save in the browser
- 🆕 New Invoice button with automatic invoice number
- 📱 Works on mobile and desktop

## 🛠️ Tech Stack

- ⚛️ React
- ⚡ Vite
- 🎨 HTML, CSS, JavaScript
- 📑 html2pdf.js

## 📁 Project Structure

```
invoice-generator/
├── index.html
├── package.json
├── vite.config.js
├── netlify.toml
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── App.css
    └── components/
        ├── InvoiceForm.jsx
        └── InvoiceModal.jsx
```

## 🚀 Run Locally

```bash
git clone https://github.com/Nitishkumar1412/Invoice_Generator.git
cd Invoice_Generator
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

## 📦 Build

```bash
npm run build
npm run preview
```

The production files are created in the `dist` folder.

## ☁️ Deployment

Hosted on Netlify.

- Build command: `npm run build`
- Publish directory: `dist`

## 🧠 Calculation

```
Discount = Subtotal x Discount %
Tax      = (Subtotal - Discount) x Tax %
Total    = Subtotal - Discount + Tax
```

## 👨‍💻 Author

**Nitish Kumar** - [GitHub](https://github.com/Nitishkumar1412)

⭐ If you like this project, give it a star!
