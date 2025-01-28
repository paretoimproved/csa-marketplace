# FarmLink 🌱
**Reliable Farm Revenue, Convenient Local Access**

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
    └── feature/phase2/search
    └── feature/phase2/orders
    └── feature/phase3/payment
    └── feature/phase3/subscriptions
    └── feature/phase3/reviews
    └── feature/phase3/messaging

## Authentication Features

### Current Implementation
- **User Registration**
  - Secure password hashing with bcrypt
  - Role-based registration (FARMER/CUSTOMER)
  - Form validation and error handling
  - Email verification system
  - Secure token generation

- **User Login**
  - Secure credential verification
  - Session management with localStorage
  - Protected routes for authenticated users
  - Role-based access control
  - Email verification check

- **Password Reset**
  - Secure reset token generation
  - Time-limited reset links (1 hour expiry)
  - Email-based password reset flow
  - Token verification system
  - Password update confirmation

- **Email System**
  - Verification emails for new accounts
  - Password reset notifications
  - HTML email templates
  - Email sending status tracking
  - Development setup with Ethereal

- **Database Integration**
  - PostgreSQL database with Prisma ORM
  - User model with email uniqueness
  - Secure password storage
  - Role management
  - Token management for verification and reset

### Planned Features
- [ ] Remember me functionality
- [ ] Session timeout
- [ ] Password strength requirements
- [ ] Multi-factor authentication
- [ ] Account recovery options

### Tech Stack
- Frontend: React with TypeScript
- Backend: Express.js
- Database: PostgreSQL
- ORM: Prisma
- Authentication: Custom JWT implementation
- Email: Nodemailer with Ethereal (dev)
- Styling: Tailwind CSS

## Core Challenges

### 🌾 Farmer Challenges
**Unstable Revenue Streams**  
Small farms remain dependent on volatile markets with:
- No guaranteed weekly income
- High customer acquisition costs
- Limited direct-to-consumer infrastructure

### 🛒 Consumer Pain Points
**Inaccessible Local Food**  
Despite demand, shoppers face:
- Fragmented farm discovery
- Inconvenient pickup options
- No quality standardization

## FarmLink's Solutions

| Farmers Get | Consumers Get |
|-------------|---------------|
| ✅ Predictable CSA income | ✅ One-stop farm discovery |
| ✅ Direct payment processing | ✅ Flexible subscription management |
| ✅ Real-time demand insights | ✅ Verified quality standards |

## Tech Stack Reality Check

**Current Implementation**
```typescript:server/index.ts
startLine: 221
endLine: 244
```
- ✅ Working farm profile system
- ✅ Basic subscription tracking
- ✅ Location management

**Gaps vs MVP Goals**
```prisma:schema.prisma
startLine: 42
endLine: 54
```
- Missing Stripe Connect integration
- No subscription plan models
- Limited product/crop tracking

## Strategic Focus

1. **Immediate Priorities**
   - Complete Stripe Connect onboarding flow
   - Build subscription plan CRUD interface
   - Implement 10-mile radius search (use existing location data)

2. **Validation Sequencing**
   - Pilot with 3 farms using manual payment tracking
   - Collect consumer feedback on profile pages
   - Delay AI features until core validated

3. **Risk Mitigation**
   - Add subscription pause/cancel functionality
   - Implement basic dispute resolution system
   - Create farmer payment protection fund

## Documentation Updates Needed

1. **FARMER_ONBOARDING.md**
   - Add visual guide using:
   ```typescript:src/components/farm/FarmProfileView.tsx
   startLine: 7
   endLine: 35
   ```
2. **API_REFERENCE.md**
   - Document existing endpoints:
   ```typescript:server/index.ts
   startLine: 278
   endLine: 302
   ```
3. **ROADMAP.md**
   - Align phase system with current progress:
   ```markdown:README.md
   startLine: 28
   endLine: 43
   ```

Would you like me to generate any of these documentation files in full based on the current codebase?