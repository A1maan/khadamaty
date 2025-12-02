# Khadamaty - Service Provider Platform

A comprehensive service provider platform built with React.js, implementing a full-featured design from Figma.

## 🚀 Features

- **Landing Page**: Showcase platform features and services
- **User Authentication**: Sign up, OTP verification, role selection (Customer/Provider/Admin)
- **Customer Dashboard**: Browse services, view featured providers
- **Service Provider Portal**: 
  - Manage services
  - Handle pending, active, and past requests
  - View and respond to customer reviews
- **Admin Dashboard**:
  - Approve/reject provider applications
  - View all users
  - Monitor most requested providers

## 🛠️ Tech Stack

- **React 18.2** - UI Library
- **React Router 6** - Navigation
- **Vite** - Build tool and dev server
- **Ionicons** - Icon library
- **CSS Modules** - Styling

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd khadamaty
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will open at `http://localhost:3000`

## 🏗️ Project Structure

```
SWE363-Project/
├── README.md
├── package.json                # Workspace configuration (scripts, shared tools)
├── backend-khadamaty/          # Express + MongoDB API
│   ├── index.js
│   ├── customer.js
│   ├── schemas.js
│   ├── seed.js
│   ├── package.json
│   └── package-lock.json
├── frontend/                   # React/Vite application
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── api/
│       │   ├── client.js       # shared fetch wrapper
│       │   └── customer.js     # customer-specific API helpers
│       ├── components/
│       │   ├── Header/
│       │   └── Sidebar/
│       ├── context/
│       ├── data/
│       ├── pages/
│       │   ├── LandingPage/
│       │   ├── Auth/
│       │   ├── Customer/
│       │   ├── Provider/
│       │   └── Admin/
│       ├── App.jsx
│       ├── main.jsx
│       └── index.css
└── venv/ (optional)            # Local Python virtualenv used during development
```

## 🎨 Design System

The application follows the Figma design with:
- **Primary Colors**: Grays (#A7A7A7, #9D9D9D, #908C8C)
- **Typography**: 
  - Inknut Antiqua (headings)
  - Inder (body text)
  - Inclusive Sans (buttons)
- **Components**: Modern card-based UI with rounded corners
- **Responsive**: Mobile-first approach with breakpoints at 768px and 1024px

## 📱 Routes

- `/` - Landing Page
- `/signup` - Customer Sign Up
- `/signup/selection` - Role Selection
- `/signup/verify` - OTP Verification
- `/customer/dashboard` - Customer Dashboard
- `/provider/*` - Provider pages (services, pending, active, past, reviews)
- `/admin/*` - Admin pages (dashboard, users)

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌟 Key Features Implemented

✅ Responsive design matching Figma specifications  
✅ Icon-based navigation using Ionicons  
✅ Role-based dashboards (Customer, Provider, Admin)  
✅ Request management system  
✅ Review and rating system  
✅ User approval workflow  
✅ Search functionality  
✅ Modern, clean UI with smooth transitions

## 🚧 Future Enhancements

- Backend API integration
- Real-time notifications
- Advanced filtering and search
- Payment integration
- Chat/messaging system
- Analytics dashboard
- Mobile app version

## 📄 License

This project is part of SWE363 course at KFUPM.

## 👥 Team

Created by the Khadamaty development team
