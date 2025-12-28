# ShopVerse React Mastery

A modern, full-stack e-commerce platform built with React, featuring product browsing, shopping cart, secure checkout, user authentication, and an admin dashboard for inventory management.

## Features

- **Product Browsing**: View and search through a catalog of products with detailed pages.
- **Shopping Cart**: Add, remove, and manage items in the cart with real-time updates.
- **User Authentication**: Secure login and registration using React Context.
- **Checkout Process**: Complete purchases with form validation and order summary.
- **Admin Dashboard**: Manage products, view orders, and handle inventory.
- **Responsive Design**: Mobile-friendly UI built with Tailwind CSS and Shadcn/ui components.
- **Theming**: Light and dark mode support with Next Themes.

## Tech Stack

### Frontend
- **React**: UI library for building the user interface.
- **TypeScript**: Typed JavaScript for better code quality and developer experience.
- **Vite**: Fast build tool and development server.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Shadcn/ui**: Component library built on Radix UI primitives.
- **React Router DOM**: Client-side routing for navigation.
- **React Hook Form**: Form handling with validation.
- **Zod**: Schema validation for forms and data.
- **TanStack Query**: Data fetching and state management for API calls.
- **Lucide React**: Icon library for UI elements.
- **Recharts**: Chart library for data visualization (e.g., in admin dashboard).
- **Sonner**: Toast notifications for user feedback.
- **Next Themes**: Theme management for light/dark modes.

### Development Tools
- **ESLint**: Linting for code quality.
- **PostCSS**: CSS processing with Autoprefixer.
- **TypeScript ESLint**: TypeScript-specific linting rules.

### Package Manager
- **Bun**: Fast JavaScript runtime and package manager (lockfile present; npm scripts also supported).

## Installation

1. Clone the repository:
   ```bash
   git clone <YOUR_GIT_URL>
   cd shopverse-react-mastery
   ```

2. Install dependencies (using Bun or npm):
   ```bash
   bun install
   # or
   npm install
   ```

3. Start the development server:
   ```bash
   bun run dev
   # or
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Usage

- Navigate to the home page to browse products.
- Click on a product for details and add to cart.
- Use the cart icon to view and manage your cart.
- Proceed to checkout after logging in.
- Access the admin panel at `/admin` for management features.

## Build

To build for production:
```bash
bun run build
# or
npm run build
```

Preview the build:
```bash
bun run preview
# or
npm run preview
```

## Linting

Run ESLint to check code quality:
```bash
bun run lint
# or
npm run lint
```

## Contributing

Feel free to fork the repository and submit pull requests for improvements.

## License

This project is open-source. Check the license file for details.

