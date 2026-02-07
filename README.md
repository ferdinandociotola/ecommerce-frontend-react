# E-commerce Frontend (React)

Frontend React che consuma API Laravel e-commerce deployata.

## 🚀 Features

- ✅ Login admin con token persistente (localStorage)
- ✅ Lista prodotti da API Laravel
- ✅ Form aggiungi prodotto (route protetta)
- ✅ Logout con pulizia storage
- ✅ Loading states e gestione errori

## 🛠️ Tech Stack

- React 18
- Vite
- Fetch API
- localStorage

## 📦 Setup
```bash
npm install
npm run dev
```

App: http://localhost:5173

## 🔗 API Backend

Backend: http://159.69.125.94/api

**Endpoints:**
- `GET /api/products` - Lista prodotti
- `POST /api/login` - Login admin
- `POST /api/admin/products` - Aggiungi prodotto (auth)

## 👤 Credenziali Test

- Email: `admin@test.com`
- Password: `password`

## 📁 Struttura
```
src/
├── App.jsx              # Componente principale
├── components/
│   ├── ProductCard.jsx  # Card singolo prodotto
│   ├── Login.jsx        # Login + logout
│   └── AddProduct.jsx   # Form aggiungi prodotto
└── main.jsx             # Entry point
```

## 🔐 Autenticazione

Token Sanctum salvato in localStorage (`auth_token`).

Persiste dopo refresh e chiusura browser.
