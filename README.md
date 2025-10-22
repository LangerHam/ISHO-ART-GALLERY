# Platforms Art Gallery - Frontend Implementation

[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.2-7952B3?logo=bootstrap)](https://getbootstrap.com/)
[![Accessibility](https://img.shields.io/badge/WCAG-2.1%20AA-green)](https://www.w3.org/WAI/WCAG21/quickref/)

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Browser Support](#browser-support)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Component Inventory](#component-inventory)
- [Design Specifications](#design-specifications)
- [Accessibility](#accessibility)
- [Performance](#performance)
- [Development](#development)
- [Deployment](#deployment)
- [Known Deviations](#known-deviations)
- [Contributing](#contributing)
- [License](#license)

---

## Project Overview

This project is a conversion of Figma designs (desktop 1366px and mobile 390px) into a fully responsive, accessible, and production-ready website for **Platforms**, an online art gallery and marketplace.

### Tech Stack

- **HTML5** - Semantic markup with ARIA labels
- **CSS3** - Modern styling with CSS Grid and Flexbox
- **Bootstrap 5.3.2** - Responsive framework (no jQuery)
- **SCSS** - Modular stylesheet architecture
- **Vanilla JavaScript** - Pure ES6+ for interactivity
- **Bootstrap Icons** - Icon library

### Design Source

- Desktop Design: `1366px × 3562px`
- Mobile Design: `390px × 5822px`
- Original Figma exports: `01 Platforms Hompage.json`, `Platforms homepage mob.json`

---

## Features

### Core Functionality

- **Responsive Design** - Mobile-first approach with breakpoints at 576px, 768px, 992px, 1200px, 1400px
- **Hero Carousel** - 4-slide auto-rotating banner with custom circular controls
- **Artwork Gallery** - Grid layout with hover effects and wishlist functionality
- **Artist Profiles** - Filterable by category (All, Printmaking, Painting, Photography, Sculpture)
- **Category Navigation** - Browse by Popular, Classical, Modern, Vintage, Abstract
- **Search Functionality** - Modal-based search with keyboard shortcuts
- **Newsletter Signup** - Email validation and subscription form

### Advanced Features

- **Lazy Loading** - Images load progressively for better performance
- **WCAG 2.1 AA Compliant** - Full keyboard navigation, ARIA labels, focus states
- **Performance Optimized** - Target Lighthouse scores: 85+ Performance, 90+ Accessibility
- **Touch-Friendly** - Optimized for mobile gestures and interactions
- **Smooth Animations** - CSS transitions with `prefers-reduced-motion` support
- **Print Styles** - Clean printable layouts

---

## 🌐 Browser Support

| Browser        | Minimum Version |
| -------------- | --------------- |
| Chrome         | 90+             |
| Safari         | 14+             |
| Firefox        | 88+             |
| Edge           | 90+             |
| iOS Safari     | 16+             |
| Android Chrome | 12+             |

---

## Quick Start

### Direct Open (No Build Required)

Since this project uses compiled CSS, you can open it directly in a browser:

```bash
# Clone or download the project
cd ISHO

# Open in your default browser
start index.html  # Windows
open index.html   # macOS
xdg-open index.html  # Linux
```

---

## Project Structure

```
ISHO/
├── index.html                 # Main homepage
├── css/
│   └── main.css              # Compiled production CSS
├── scss/
│   ├── _variables.scss       # Design tokens (colors, fonts, spacing)
│   ├── _mixins.scss          # Reusable SCSS patterns
│   ├── _components.scss      # Component-specific styles
│   └── main.scss             # Main entry point (imports all partials)
├── js/
│   └── main.js               # Interactive features & utilities
├── assets/
│   ├── images/               # Artwork, hero, category images
│   │   ├── hero/            # Carousel slides (4 images)
│   │   ├── artworks/        # Gallery artwork images (8+ images)
│   │   ├── artists/         # Artist profile photos (5 images)
│   │   ├── categories/      # Category thumbnails
│   │   └── features/        # Blog/article images
│   └── icons/
│       └── logo.svg         # Platforms logo (light & dark versions)
├── 01 Platforms Hompage.json      # Original Figma export (desktop)
├── Platforms homepage mob.json    # Original Figma export (mobile)
└── README.md                      # This file
```

---

## Component Inventory

### 1. **Header/Navigation**

- **File:** `index.html` (lines 45-99)
- **Styles:** `css/main.css` (Navigation section)
- **Features:**
  - Fixed-top navbar with shadow on scroll
  - Logo (35px height)
  - Navigation links: Home, Artworks, Artists, Auctions, Marketplace
  - Search button (opens modal)
  - Login/Register links
  - Shopping cart icon with badge
  - Responsive collapse menu for mobile
- **Accessibility:** ARIA labels, focus-visible states, keyboard navigation

### 2. **Hero Carousel**

- **File:** `index.html` (lines 104-158)
- **Styles:** `css/main.css` (.hero-carousel)
- **JavaScript:** `js/main.js` (Carousel Auto-play)
- **Features:**
  - 4 full-width slides
  - Auto-rotate (5s interval)
  - Custom circular indicators (10px)
  - Circular control buttons (42px) with white background
  - Pause on hover/focus
  - Touch/swipe enabled
  - Responsive heights: 588px (mobile) / 695px (desktop)
- **Images Required:** 4 hero images (1366×695px recommended)

### 3. **Popular Searches Section**

- **File:** `index.html` (lines 163-179)
- **Styles:** `css/main.css` (.filter-tags)
- **Features:**
  - Filter tag buttons with 15px border-radius
  - Hover state with gold background (#e5cc9b)
  - Letter-spacing: 0.04em
  - Active state styling
- **Tags:** All, Abstract, Photography, Paintings, Printmaking

### 4. **Art by Price Section**

- **File:** `index.html` (lines 184-203)
- **Styles:** `css/main.css` (.filter-tags)
- **Features:**
  - White background tag buttons
  - Same styling as popular searches
  - Responsive horizontal scroll on mobile
- **Price Ranges:** Under $500, $500 - $1000, $1000 - $5000, $5000 - $10,000, $10,000+

### 5. **Artwork Gallery Grid**

- **File:** `index.html` (lines 208-352)
- **Styles:** `css/main.css` (.artwork-card)
- **JavaScript:** `js/main.js` (Wishlist functionality)
- **Features:**
  - 8 artwork cards in responsive grid
  - Image height: 250px with object-fit: cover
  - Hover lift effect (translateY -4px)
  - Wishlist heart button (appears on hover)
  - Card info: Title, Artist name, Price
  - Border: 1px solid #afafaf
  - LocalStorage integration for favorites
- **Grid:** 1 col (mobile) → 2 cols (576px) → 3 cols (768px) → 4 cols (992px)
- **Images Required:** 8+ artwork images (250×250px minimum)

### 6. **Meet Our Artists Section**

- **File:** `index.html` (lines 357-488)
- **Styles:** `css/main.css` (.artist-card)
- **JavaScript:** `js/main.js` (Artist filter tabs)
- **Features:**
  - 5 artist profiles with circular images (230px desktop / 180px mobile)
  - Filter tabs: All, Printmaking, Painting, Photography, Sculpture
  - Underlined name links
  - Hover scale effect (1.05)
  - ARIA live regions for tab changes
- **Images Required:** 5 artist photos (230×230px minimum)

### 7. **Shop by Category Carousel**

- **File:** `index.html` (lines 493-577)
- **Styles:** `css/main.css` (.category-card)
- **JavaScript:** `js/main.js` (Category carousel)
- **Features:**
  - 5 category cards with gradient overlays
  - Image height: 289px (desktop) / 200px (mobile)
  - Zoom effect on hover (scale 1.1)
  - Dark gradient overlay for text legibility
  - Auto-rotate carousel (4s interval)
- **Categories:** Popular, Classical, Modern, Vintage, Abstract
- **Images Required:** 5 category images (minimum 289px height)

### 8. **Features/Blog Section**

- **File:** `index.html` (lines 582-703)
- **Styles:** `css/main.css` (.feature-card)
- **Features:**
  - 5 blog/article cards
  - Image height: 272px (desktop) / 200px (mobile)
  - Badge labels (TRENDING, TRENDING TODAY, etc.)
  - Hover lift effect
  - Underlined title links
- **Images Required:** 5 feature images (minimum 272px height)

### 9. **Footer**

- **File:** `index.html` (lines 708-815)
- **Styles:** `css/main.css` (.footer)
- **JavaScript:** `js/main.js` (Newsletter validation)
- **Features:**
  - Dark background (#000000)
  - 4-column layout (responsive: stacks on mobile)
  - **Column 1:** Logo, tagline, contact info (phone, email, address)
  - **Column 2:** Quick Links (About, Browse Artists, Sell Your Work, etc.)
  - **Column 3:** Customer Support (FAQs, Shipping, Returns, Terms)
  - **Column 4:** Newsletter signup with email validation
  - Bottom bar with copyright and legal links
  - White logo filter effect
- **Form Validation:** Email regex, success/error notifications

### 10. **Search Modal**

- **File:** `index.html` (lines 820-841)
- **Styles:** `css/main.css` (.modal)
- **JavaScript:** `js/main.js` (Search functionality)
- **Features:**
  - Centered modal overlay
  - Auto-focus on input when opened
  - Search form submission handling
  - Close on Escape key
  - Clear input on modal close
- **Keyboard:** Focus trap within modal

---

## Development

### Prerequisites

- Modern code editor (VS Code recommended)
- Node.js 14+ (if using SCSS compilation)
- Git

### Setup for SCSS Development

```bash
# Install Sass compiler
npm install -g sass

# Watch for changes
sass --watch scss:css --style compressed

# Or use VS Code extension
# Install "Live Sass Compiler" by Glenn Marks
```

### Testing Checklist

#### Responsive Testing

- [ ] Mobile portrait (375px)
- [ ] Mobile landscape (667px)
- [ ] Tablet portrait (768px)
- [ ] Tablet landscape (1024px)
- [ ] Desktop (1366px)
- [ ] Large desktop (1920px)

#### Browser Testing

- [ ] Chrome (latest)
- [ ] Safari (latest)
- [ ] Firefox (latest)
- [ ] Edge (latest)
- [ ] iOS Safari 16+
- [ ] Android Chrome 12+

#### Functionality Testing

- [ ] Hero carousel auto-play and controls
- [ ] Wishlist add/remove functionality
- [ ] Artist filter tabs
- [ ] Search modal open/close
- [ ] Newsletter form validation
- [ ] All navigation links
- [ ] Responsive menu collapse
- [ ] Smooth scrolling

#### Accessibility Testing

- [ ] Keyboard navigation (Tab, Enter, Esc)
- [ ] Screen reader (NVDA/JAWS/VoiceOver)
- [ ] Focus indicators visible
- [ ] Color contrast (WebAIM checker)
- [ ] HTML validation (W3C validator)
- [ ] Lighthouse audit (90+ accessibility)

---

## Deployment

#### **Netlify Hosted Link**

Link: https://isho-art-gallery.netlify.app

## Deviations

### From Original Figma Design

1. **Font Fallbacks**

   - **Figma:** Specific font files embedded
   - **Implementation:** Google Fonts CDN with system font fallbacks
   - **Reason:** Better performance, cross-browser compatibility

2. **Placeholder Images**

   - **Figma:** High-resolution artwork images
   - **Implementation:** Placeholder images (to be replaced)
   - **Reason:** Copyright considerations, client to provide final assets

3. **Hero Carousel Indicators**

   - **Figma:** May show different indicator style
   - **Implementation:** Circular 10px indicators with gold active state
   - **Reason:** Better accessibility, clearer visual feedback

4. **Hover States**

   - **Figma:** Limited hover state definitions
   - **Implementation:** Enhanced hover effects on all interactive elements
   - **Reason:** Improved UX, modern web standards

5. **Search Functionality**

   - **Figma:** Search input in navbar
   - **Implementation:** Search button that opens modal
   - **Reason:** Better mobile UX, cleaner navbar layout

6. **Responsive Breakpoints**

   - **Figma:** Only shows 1366px (desktop) and 390px (mobile)
   - **Implementation:** Full responsive system with 6 breakpoints
   - **Reason:** Cover all device sizes, not just design breakpoints

7. **Button Interactions**
   - **Figma:** Static design
   - **Implementation:** Added loading states, disabled states, animations
   - **Reason:** Production-ready interactive elements
