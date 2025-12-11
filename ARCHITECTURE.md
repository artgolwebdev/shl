# Architecture Documentation

## Project Overview

This is a single-page application (SPA) landing page for a delivery service business. The project follows a clean, modular architecture with separation of concerns.

## Architecture Pattern

**Pattern**: Traditional Client-Side Rendering (CSR)

The application uses:
- Static HTML for structure
- CSS for presentation
- JavaScript for interactivity

## File Structure

```
shuk2/
├── index.html          # Main HTML structure
├── styles.css          # All styling and animations
├── script.js           # Map initialization and interactions
├── README.md           # Main documentation
├── CONTRIBUTING.md     # Contribution guidelines
└── ARCHITECTURE.md     # This file
```

## Component Breakdown

### 1. HTML Structure (`index.html`)

**Sections**:
- `<head>`: Meta tags, stylesheets, scripts, structured data
- `<header>`: Logo and tagline
- `<main>`: 
  - Hero section with map
  - Delivery times section
  - Business details section
  - Contact section
- `<footer>`: Copyright information

**Key Features**:
- Semantic HTML5 elements
- RTL (right-to-left) support
- SEO optimization
- Accessibility considerations

### 2. Styling (`styles.css`)

**Organization**:
1. Reset & Base Styles
2. CSS Variables (Custom Properties)
3. Header Section
4. Hero Section
5. Map Section
6. Delivery Info Section
7. Details Section
8. Contact Section
9. Footer Section
10. Responsive Design (Media Queries)

**Design System**:
- CSS Variables for theming
- Consistent spacing and typography
- Animation system
- Responsive breakpoints

### 3. JavaScript (`script.js`)

**Structure**:
- Configuration constants
- Helper functions
- Main initialization function

**Key Functions**:
- `initializeMap()`: Main entry point
- `createStoreIcon()`: Creates custom marker icon
- `createAreaLabelIcon()`: Creates area label icons
- `createServiceAreaCircle()`: Creates service area circles
- `createServiceAreaLabel()`: Creates area labels
- `toggleAreaVisibility()`: Handles legend interactions

**Dependencies**:
- Leaflet.js (external CDN)
- Browser DOM API

## Data Flow

```
Page Load
    ↓
DOM Ready
    ↓
Leaflet Library Loaded?
    ↓ Yes
Initialize Map
    ↓
Create Store Marker
    ↓
Create Service Areas
    ↓
Attach Event Listeners
    ↓
Ready for User Interaction
```

## State Management

**Current State**: Simple, no state management library needed

**State Variables**:
- `areaVisibility`: Object tracking which service areas are visible
- Managed locally in `script.js`

## External Dependencies

1. **Leaflet.js v1.9.4**
   - Purpose: Interactive map functionality
   - Loaded via: CDN
   - Usage: Map rendering, markers, circles

2. **Google Fonts**
   - Purpose: Typography
   - Fonts: Assistant, Rubik, Heebo, Varela Round, Secular One
   - Loaded via: Google Fonts API

3. **OpenStreetMap**
   - Purpose: Map tiles
   - Usage: Background map tiles for Leaflet

## Performance Considerations

1. **Font Loading**: Preconnect to Google Fonts for faster loading
2. **Map Tiles**: Served via CDN for optimal performance
3. **CSS**: Single file, minified in production (recommended)
4. **JavaScript**: Single file, ES6+ features

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES6+ JavaScript features used
- CSS Grid and Flexbox for layout
- CSS Custom Properties (Variables)

## Security Considerations

1. **CDN Resources**: Using integrity hashes for Leaflet.js
2. **No User Input**: No forms or user-generated content
3. **External Links**: Proper `rel` attributes where needed

## Future Enhancements

Potential improvements:
- Add form for order requests
- Integrate with backend API
- Add analytics tracking
- Implement service worker for offline support
- Add unit tests
- Consider a build process (webpack, vite, etc.)

## Maintenance

**Regular Updates Needed**:
- Business information (phone, address, hours)
- Service area coordinates (if coverage changes)
- Dependencies (Leaflet.js updates)

**Code Quality**:
- Well-commented code
- Consistent formatting
- Clear function names
- Separation of concerns

