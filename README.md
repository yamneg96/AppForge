# AppForge - Developer Portfolio Platform

A full-stack web application built like an App Store for developers to showcase their mobile applications.

## Project Structure

```
AppForge/
├── Frontend/          # TanStack Start + React + TypeScript
├── Backend/           # Express.js + MongoDB + TypeScript
├── Admin/             # React + Vite + React Router
├── Design/            # UI design files (HTML + screenshots)
└── instruction.md     # Project specification
```

## Technology Stack

### Frontend

- **Framework**: TanStack Start, React 18
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **State Management**: TanStack Query
- **Routing**: TanStack Router
- **Animations**: Framer Motion
- **UI Components**: shadcn/ui

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB + Mongoose
- **Validation**: Built-in type checking
- **Middleware**: CORS, JSON parsing

### Admin CMS

- **Framework**: React 18 + Vite
- **Language**: TypeScript
- **Routing**: React Router v6
- **State Management**: TanStack Query
- **Styling**: TailwindCSS
- **API Client**: Axios

## Key Features

### Frontend Portfolio Website

- **Landing Page** with hero section, featured apps, developer stack, and CTA
- **Explore Apps** with search and filtering capabilities
- **App Details** page with screenshots, downloads, and tech stack
- **About** page with developer bio and experience
- **Contact** form for inquiries
- Responsive design with dark mode support
- Smooth animations and transitions

### Admin CMS Dashboard

- **Dashboard** with app count, message count, and recent activity stats
- **Apps Management** (CRUD) - create, read, update, delete apps
- **Messages** panel to view and manage contact messages
- Sidebar navigation and responsive layout
- Mark messages as read/unread
- Delete old apps or messages

### Backend API

- RESTful API endpoints for apps and contact messages
- MongoDB database with Mongoose models
- CORS support for frontend and admin
- Error handling and validation
- Pagination support for list endpoints

## Installation & Setup

### Prerequisites

- Node.js 18+
- npm or yarn
- MongoDB (local or cloud service like MongoDB Atlas)

### Backend Setup

```bash
cd Backend

# Install dependencies
npm install --legacy-peer-deps

# Create .env file
cp .env.example .env

# Edit .env with your MongoDB URI
# MONGODB_URI=mongodb://localhost:27017/appforge
# CORS_ORIGIN=http://localhost:5173

# Start development server
npm run dev
# Server runs on http://localhost:3000
```

### Frontend Setup

```bash
cd Frontend

# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm run dev
# Frontend runs on http://localhost:5173
```

### Admin CMS Setup

```bash
cd Admin

# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm run dev
# Admin runs on http://localhost:5174
```

## API Endpoints

### Apps

- `GET /api/apps` - List all apps with pagination
- `GET /api/apps/:slug` - Get single app by slug
- `POST /api/apps` - Create new app
- `PUT /api/apps/:id` - Update app by ID
- `DELETE /api/apps/:id` - Delete app by ID

### Contact Messages

- `GET /api/contact` - List all messages with pagination
- `POST /api/contact` - Create new contact message
- `PUT /api/contact/:id` - Mark message as read
- `DELETE /api/contact/:id` - Delete message

## Project Architecture

### Frontend Routes

- `/` - Home/Landing page
- `/explore` - Browse all apps
- `/about` - About developer
- `/contact` - Contact form
- `/apps/:slug` - Individual app details

### Admin Routes

- `/` - Dashboard
- `/apps` - Apps management
- `/create-app` - Create new app
- `/edit-app/:id` - Edit existing app
- `/messages` - View contact messages

### Backend Structure

```
src/
├── config/
│   ├── env.ts          # Environment variables
│   └── db.ts           # MongoDB connection
├── models/
│   ├── App.ts          # App model
│   └── Contact.ts      # Contact model
├── controllers/
│   ├── apps.controller.ts
│   └── contact.controller.ts
├── routes/
│   ├── apps.routes.ts
│   └── contact.routes.ts
└── server.ts           # Express app setup
```

## Database Models

### App Model

```typescript
{
  name: string
  slug: string (unique)
  description: string
  longDescription?: string
  status: 'draft' | 'released' | 'coming_soon' | 'archived'
  icon?: string
  screenshots?: string[]
  techStack?: string[]
  apkUrl?: string
  ipaUrl?: string
  playStoreUrl?: string
  appStoreUrl?: string
  githubUrl?: string
  version: string
  rating?: number
  reviewsCount?: number
  features?: string[]
  createdAt: Date
  updatedAt: Date
}
```

### Contact Model

```typescript
{
  name: string;
  email: string;
  message: string;
  read: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

## Styling & Components

### UI Components Available

The project uses shadcn/ui components. Core components implemented:

- `Button` - with variants (default, destructive, outline, secondary, ghost, link)
- Additional components can be added as needed

### Color Scheme

- Primary: Dark navy (#090909)
- Secondary: Light gray (#F5F5F5)
- Accent: Bright blue (used for CTAs)
- Supports dark mode via CSS variables

## Development Guidelines

### Code Style

- PascalCase for components and types
- camelCase for functions and variables
- Always use TypeScript types
- Keep components small and reusable
- Use TailwindCSS for styling (no inline styles)

### Component Structure

```typescript
import { ReactNode } from 'react'

interface ComponentProps {
  children?: ReactNode
  className?: string
}

export function Component({ children, className }: ComponentProps) {
  return <div className={cn('base-styles', className)}>{children}</div>
}
```

## Running All Three Services

### Terminal 1 - Backend

```bash
cd Backend
npm run dev
```

### Terminal 2 - Frontend

```bash
cd Frontend
npm run dev
```

### Terminal 3 - Admin CMS

```bash
cd Admin
npm run dev
```

Now you can access:

- Frontend: http://localhost:5173
- Admin: http://localhost:5174
- Backend API: http://localhost:3000/api

## Deployment

### Frontend

- Build: `npm run build`
- Deploy to: Vercel, Netlify, or any static hosting
- Set environment variables for API URL

### Admin

- Build: `npm run build`
- Deploy to: Vercel, Netlify
- Set environment variables for API URL

### Backend

- Build: `npm run build`
- Deploy to: Railway, Heroku, AWS, or any Node.js hosting
- Set MongoDB URI and CORS origin environment variables

## Future Enhancements

- [ ] File upload for screenshots, APKs, IPAs
- [ ] Authentication system for Admin panel
- [ ] Email notifications for contact submissions
- [ ] Advanced analytics and download tracking
- [ ] Rating and review system
- [ ] Featured apps algorithm
- [ ] SEO optimization
- [ ] PWA support
- [ ] API documentation (Swagger/OpenAPI)
- [ ] Automated testing

## License

MIT

## Author

AppForge Team

---

For detailed project specifications, refer to `instruction.md`
