# BoardingBook Platform

A comprehensive student housing platform with backend API, web frontend, and React Native mobile app.

## Project Structure

```
.
├── backend/                    # Node.js/Express backend API
│   ├── src/                   # Source code (routes, controllers, models, etc.)
│   ├── package.json           # Backend dependencies
│   └── package-lock.json      # Locked versions
│
├── frontend/                   # React + Vite frontend web application
│   ├── src/                   # React components, pages, services
│   ├── package.json           # Frontend dependencies
│   ├── vite.config.ts         # Vite configuration
│   ├── tsconfig.json          # TypeScript configuration
│   ├── index.html             # HTML entry point
│   └── tailwind.config.js      # Tailwind CSS configuration
│
├── docs/                      # Documentation files
├── uploads/                   # User uploads storage
└── .env                       # Environment variables (gitignored)
```

## Getting Started

### Backend Setup
```bash
cd backend
npm install
npm run dev          # Development with nodemon
npm start           # Production
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev         # Development server (http://localhost:5173)
npm run build       # Production build
```

## Environment Variables

Both backend and frontend require `.env` files (not in git):
- `.env` - Backend environment (database, JWT secrets, etc.)
- `.env` - Frontend environment (API endpoints, etc.)

## Git Configuration

The following are automatically ignored:
- `node_modules/` - Dependencies
- `.env` files - Sensitive configuration
- `dist/` and `build/` - Build outputs
- `.DS_Store` - macOS files

## Notes

- All backend code is in `/backend`
- All frontend code is in `/frontend`
- Documentation is centralized in `/docs`
- Unnecessary files and duplicate folders have been cleaned up
# BB-system
# BB-system
