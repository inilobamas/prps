# PRPS - Personal Routine Programming System

**Your plan. Your pace. #KeepShowing**

PRPS is a comprehensive fitness platform that combines professional workout programming with personal trainer booking services, serving both fitness enthusiasts and trainers in a two-sided marketplace.

## 🌟 Platform Overview

PRPS bridges the gap between fitness professionals and users through:
- **Program Marketplace**: Buy structured workout programs from certified trainers
- **PT Booking System**: Book 1-on-1 sessions with personal trainers
- **Workout Tracker**: Interactive progress tracking with gamification
- **Trainer Dashboard**: Tools for trainers to manage programs, clients, and bookings

---

## 🚀 Implementation Progress

### Epic 1: 🎯 Workout Programs (Marketplace) - **70% Complete**
**Goal**: User bisa beli program, PT bisa jual program

#### ✅ **Completed Features**:
- **Program Catalog** (`/marketing/plans`) - Browse 12+ professional programs
- **Program Details** (`/marketing/plans/[slug]`) - Detailed program information
- **Static Program Database** - 5 sport categories (Powerlifting, Bodybuilding, Running, Boxing, Athletic Performance)
- **Payment Integration** - Lynk.id payment links for each program
- **Trainer Profiles** - 5 certified trainers with credentials and specializations
- **Program Categories**: Pemula → Intermediate → Advanced progression
- **Revenue Dashboard** - Basic trainer earnings tracking

#### ❌ **Missing for MVP**:
- User dashboard untuk "My Programs" (purchased programs)
- Program ownership verification system
- Dynamic program upload interface for trainers

---

### Epic 2: 🏋️ Workout Tracker - **95% Complete**
**Goal**: User bisa track latihan per hari

#### ✅ **Completed Features**:
- **Interactive Tracker** (`/app/workout/[slug]/[...params]`) - Real-time workout logging
- **Set-by-Set Tracking** - Checkbox completion, weight, reps, RPE logging
- **Auto-save System** - localStorage persistence for offline capability
- **Exercise Database** - Detailed exercise instructions with sets/reps/rest
- **Workout History** - Complete workout log with performance analytics
- **Multi-Program Support** - Week-based and day-based program structures
- **Progress Analytics** - Volume tracking, completion rates, performance metrics

#### ❌ **Missing for MVP**:
- Program access verification (integration with ownership system)

---

### Epic 3: 🎮 Gamification & Progress - **90% Complete**
**Goal**: User termotivasi lewat XP, streak, badges

#### ✅ **Completed Features**:
- **XP System** - Points for completed workouts, sets, and exercises
- **Streak Tracking** - Daily workout consistency rewards
- **Achievement System** - 8 milestone badges (First Workout, Volume milestones, etc.)
- **Progress Dashboard** - XP, level, streak, and badge display
- **Level System** - Progressive advancement based on XP accumulation
- **Performance Metrics** - Volume calculations, completion rates
- **Badge Conditions** - Automated badge unlocking based on user stats

#### ❌ **Missing for MVP**:
- Badge notification system with pop-ups

---

### Epic 4: 👥 Booking PT - **100% Complete** ✅
**Goal**: User bisa booking sesi PT, PT/gym bisa kelola jadwal & revenue

#### ✅ **Completed Features**:

**User Experience**:
- **PT Discovery** (`/booking`) - Browse trainers with filtering by location, session type, price
- **Trainer Profiles** (`/booking/[trainerId]`) - Detailed profiles with tabs: overview, schedule, reviews, services, contact
- **Booking Flow** (`/booking/[trainerId]/book`) - 3-step booking process with Lynk.id integration
- **Session Types**: Personal Training, Group Session, Assessment, Consultation
- **Booking History** (`/user/bookings`) - Manage upcoming and past sessions
- **Rating System** - Post-session feedback and trainer ratings

**Trainer Management**:
- **Availability Management** (`/personal_trainer/availability`) - Weekly schedule with time slot management
- **Booking Settings** - Cancellation policy, advance booking limits, auto-accept
- **Session Rates** - Configurable pricing per session type
- **Booking Dashboard** - View and respond to booking requests
- **Revenue Tracking** - Earnings from bookings with detailed breakdown

**Gym Owner Dashboard**:
- **Business Overview** (`/gym/dashboard`) - Total bookings, revenue, trainer performance
- **Revenue Sharing** - Automated calculations (Gym 20%, Trainer 70%, PRPS 10%)
- **Booking Analytics** - Growth tracking, booking patterns, trainer insights
- **Facility Management** - Operating hours, facilities, trainer assignments

**Technical Implementation**:
- **Complete Data Models** - TypeScript types for bookings, availability, revenue
- **Storage System** - localStorage integration for booking management
- **Payment Integration** - Lynk.id payment URLs with booking confirmation
- **Business Logic** - Revenue sharing, pricing, availability algorithms

---

### Epic 5: 💰 Business & Revenue Sharing - **40% Complete**
**Goal**: PT & Gym dapat pendapatan transparan

#### ✅ **Completed Features**:
- **Trainer Revenue Dashboard** - Program sales and PT booking earnings
- **Revenue Split Configuration** - 70% trainer, 20% gym, 10% PRPS
- **Booking Revenue Tracking** - Automated calculations for PT sessions
- **Performance Metrics** - Sales analytics, client engagement

#### ❌ **Missing for MVP**:
- Admin revenue configuration interface
- Automated payout calculations
- Financial reporting system

---

### Epic 6: 🌐 Community & Support - **80% Complete**
**Goal**: User dapat support lewat komunitas & partner

#### ✅ **Completed Features**:
- **Community Links** - WhatsApp and Instagram integration
- **Landing Page Content** - Testimonials, FAQ, social proof
- **Partnership Page** (`/marketing/collab`) - Collaboration opportunities for creators and gyms
- **Social Media Integration** - TikTok, Instagram, YouTube links

#### ❌ **Missing for MVP**:
- Form backend integration for partnership applications
- Admin notification system for new applications

---

## 🏗️ Technical Architecture

### **Tech Stack**
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **State Management**: React hooks + localStorage
- **Payment**: Lynk.id integration
- **Deployment**: Vercel-ready

### **Key Features**
- **Responsive Design** - Mobile-first approach
- **Offline Capability** - localStorage for workout tracking
- **Type Safety** - Complete TypeScript coverage
- **Component Library** - shadcn/ui for consistent design
- **SEO Optimized** - Static generation where possible

### **Data Models**
- **User System**: Stats, progress, booking profiles
- **Program System**: Structured workouts, week/day organization
- **Booking System**: Availability, sessions, revenue tracking
- **Trainer System**: Profiles, certifications, earnings

---

## 📊 Current Status Summary

| Epic | Features | Completion | Status |
|------|----------|------------|---------|
| **Epic 1**: Workout Programs | 8/10 | 70% | 🟡 In Progress |
| **Epic 2**: Workout Tracker | 10/10 | 95% | 🟢 Nearly Complete |
| **Epic 3**: Gamification | 9/10 | 90% | 🟢 Nearly Complete |
| **Epic 4**: Booking PT | 15/15 | 100% | ✅ Complete |
| **Epic 5**: Business Revenue | 6/10 | 40% | 🟡 In Progress |
| **Epic 6**: Community | 8/10 | 80% | 🟢 Nearly Complete |

**Overall Platform Completion: ~79%**

---

## 🎯 Next Priority Tasks

### **High Priority** (Critical for Full MVP):
1. **User Program Dashboard** - "My Programs" page for purchased programs
2. **Program Ownership System** - Verification and access control
3. **Admin Revenue Interface** - Configuration and payout management

### **Medium Priority** (Polish & Enhancement):
4. **Badge Notifications** - Real-time achievement pop-ups
5. **Form Backend Integration** - Partnership application processing
6. **Dynamic Program Upload** - Trainer content management

### **Low Priority** (Future Enhancements):
7. **Advanced Analytics** - Detailed performance insights
8. **Mobile App** - React Native implementation
9. **AI Recommendations** - Smart program and trainer suggestions

---

## 🚀 Getting Started

### **Development Setup**

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

### **Key Directories**
```
src/
├── app/                    # Next.js App Router pages
│   ├── booking/           # PT booking system
│   ├── marketing/         # Program marketplace
│   ├── personal_trainer/  # Trainer dashboard
│   ├── gym/              # Gym owner dashboard
│   └── user/             # User features
├── components/           # Reusable UI components
├── lib/                 # Business logic & utilities
│   ├── types.ts         # TypeScript definitions
│   ├── constants.ts     # Static data & configuration
│   ├── storage.ts       # localStorage management
│   └── programs.ts      # Workout program logic
```

### **Environment Setup**
No environment variables required for core functionality. Payment integration uses Lynk.id external links.

---

## 📈 Business Metrics

### **Current Scale** (Mock Data)
- **2,500+** Active Members
- **89%** Program Completion Rate
- **50+** Partner Gyms
- **5** Certified Trainers
- **12** Professional Programs

### **Revenue Model**
- **Program Sales**: Direct purchase via Lynk.id
- **PT Bookings**: Revenue sharing model
  - Trainer: 70%
  - Gym: 20% (if applicable)
  - PRPS: 10%

---

## 🤝 Contributing

PRPS is focused on the Indonesian fitness market, specifically:
- **Primary Market**: Malang, East Java
- **Language**: Bahasa Indonesia
- **Currency**: Indonesian Rupiah (IDR)
- **Payment**: Lynk.id integration

### **Development Guidelines**
- Follow existing TypeScript patterns
- Use shadcn/ui components for consistency
- Maintain responsive design principles
- Add proper error handling and loading states

---

## 📞 Contact & Support

- **Platform**: [PRPS Landing](https://prps-landing.vercel.app)
- **Social Media**: [@prps.sport](https://tiktok.com/@prps.sport)
- **Community**: WhatsApp & Instagram groups
- **Partnership**: `/marketing/collab` page

---

**PRPS - Transforming fitness journeys in Indonesia, one workout at a time.** 💪

*Your plan. Your pace. #KeepShowing*