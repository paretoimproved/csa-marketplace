# CSA Marketplace

A web application connecting local farmers with community members for Community Supported Agriculture shares.

## Project Overview
This project is a react web application that allows local farmers to list their Community Supported Agriculture (CSA) shares and community members to browse and purchase them. The goal is to create a platform that supports local agriculture and fosters a sense of community around shared farming practices.

## Getting Started

1. Prerequisites
   - Node.js (v18 or higher)
   - npm (v9 or higher)

2. Installation
   ```bash
   npm create vite@latest csa-marketplace -- --template react-ts
   cd csa-marketplace
   npm install
   ```

3. Run Development Server
   ```bash
   npm run dev
   ```

## Technical Architecture

### Phase 1 - Basic Features
- User Authentication (Farmers & Customers)
- Basic CSA Share Listings
- Simple Profile Management

### Phase 2 - Core Features
- CSA Share Management for Farmers
- Search and Filter Functionality
- Order Processing

### Phase 3 - Advanced Features
- Payment Integration
- Subscription Management
- Reviews and Ratings
- Messaging System

## Tech Stack
- Frontend: React with TypeScript
- Routing: React Router
- State Management: React Context
- Styling: TailwindCSS
- Authentication: JWT
- API: RESTful

## Contributing
Please read our contributing guidelines before submitting pull requests.

## Git Branching Strategy

main (production)
├── develop (development)
    ├── feature/phase1/auth
    ├── feature/phase1/listings
    ├── feature/phase1/profiles
    └── ...