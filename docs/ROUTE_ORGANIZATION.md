# Route Organization Guide

This guide explains the organized route structure implemented for better responsibility separation and access control.

## Route Structure Overview

```
src/routes/
├── __root.tsx                 # Root layout with AuthProvider
├── _public.tsx                # Public layout (no auth required)
├── _protected.tsx             # Protected layout (auth required)  
├── _private.tsx               # Private layout (admin only)
├── _auth/                     # Authentication routes
│   └── login.tsx             # Login page
├── _public/                   # Public accessible routes
│   └── login.tsx             # Login route
├── _protected/                # Authenticated user routes
│   ├── index.tsx             # Home page (/)
│   └── about.tsx             # About page (/about)
└── _private/                  # Admin-only routes
    └── admin.tsx             # Admin dashboard (/admin)
```

## Access Levels

### 🌐 **_public** - No Authentication Required
- **Purpose**: Routes accessible to anyone (login, landing pages, public docs)
- **Layout**: `PublicLayout` - minimal styling, no navigation
- **Example Routes**: `/login`
- **Access**: Anyone can access these routes

### 🔒 **_protected** - Authentication Required
- **Purpose**: Routes for authenticated users (main app functionality)
- **Layout**: `AuthenticatedLayout` - includes header with navigation and logout
- **Guard**: `ProtectedRoute` - redirects to login if not authenticated
- **Example Routes**: `/` (home), `/about`, `/dashboard`
- **Access**: Any authenticated user (admin or regular user)

### 🚨 **_private** - Admin Only
- **Purpose**: Routes for admin users only (user management, system settings)
- **Layout**: `PrivateLayout` - includes admin warning banner and restricted styling
- **Guard**: `AdminGuard` - checks for admin role, shows access denied for non-admins
- **Example Routes**: `/admin`, `/admin/users`, `/admin/settings`
- **Access**: Only users with `role: 'admin'`

## Route Guards & Layouts

### Layout Components

#### `PublicLayout`
```typescript
// Simple layout for public routes
<div className="min-h-screen bg-gray-50">
  {children}
</div>
```

#### `AuthenticatedLayout` (extends `ProtectedRoute`)
```typescript
// Protected layout with navigation
<ProtectedRoute>
  <Header />
  <main>{children}</main>
</ProtectedRoute>
```

#### `PrivateLayout` (extends `AdminGuard`)
```typescript
// Admin-only layout with warning banner
<AdminGuard>
  <Header />
  <main className="bg-red-50">
    <AdminWarningBanner />
    {children}
  </main>
</AdminGuard>
```

### Guard Components

#### `ProtectedRoute`
- Checks if user is authenticated
- Redirects to `/login` if not authenticated
- Shows loading spinner while checking auth state

#### `AdminGuard`
- Extends `ProtectedRoute` functionality
- Additional check for `user.role === 'admin'`
- Shows "Access Denied" message for non-admin users
- Redirects to `/login` if not authenticated

## Adding New Routes

### For Public Routes
```typescript
// src/routes/_public/new-page.tsx
export const Route = createFileRoute('/_public/new-page')({
  component: NewPageComponent,
})
```

### For Protected Routes
```typescript
// src/routes/_protected/new-feature.tsx
export const Route = createFileRoute('/_protected/new-feature')({
  component: NewFeatureComponent,
})
```

### For Admin Routes
```typescript
// src/routes/_private/admin-feature.tsx
export const Route = createFileRoute('/_private/admin-feature')({
  component: AdminFeatureComponent,
})
```

## Security Benefits

1. **Clear Separation**: Each access level has its own folder and layout
2. **Automatic Guards**: Route guards are applied at the layout level
3. **Visual Indicators**: Admin routes have distinct styling to indicate restricted access
4. **Type Safety**: TanStack Router provides compile-time route validation
5. **Maintainable**: Easy to understand and modify access control

## Navigation Updates

The `Header` component automatically shows/hides navigation based on user role:

- **Public routes**: No header
- **Protected routes**: Standard navigation (Home, About, Logout)
- **Admin access**: Additional red "Admin" link appears for admin users

## Current Route Mapping

| URL | Route File | Access Level | Description |
|-----|------------|--------------|-------------|
| `/login` | `_public/login.tsx` | Public | Login page |
| `/` | `_protected/index.tsx` | Protected | Home page |
| `/about` | `_protected/about.tsx` | Protected | About page |
| `/admin` | `_private/admin.tsx` | Admin Only | Admin dashboard |

This organization makes it easy to understand and maintain access control while providing clear visual cues about the security level of different parts of the application.