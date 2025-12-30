# שליחות שוק רמלה - Landing Page

A modern, SEO-optimized landing page for Shuk Ramla delivery service with interactive map functionality.

## 📋 Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [File Descriptions](#file-descriptions)
- [Technologies Used](#technologies-used)
- [Browser Support](#browser-support)
- [Customization](#customization)

## ✨ Features

- **SEO Optimized**: Comprehensive meta tags, Open Graph, Twitter Cards, and JSON-LD structured data
- **RTL Support**: Full right-to-left support for Hebrew content
- **Responsive Design**: Mobile-first approach with breakpoints for tablet and mobile devices
- **Interactive Map**: Leaflet.js integration with service area visualization
- **Modern UI/UX**: Glassmorphism effects, gradient backgrounds, and premium design patterns
- **Dynamic Animations**: Animated motorcycle delivery track and floating decorative logos
- **Advanced Language Switcher**: Modern dropdown language selector with glassmorphism and animations
- **Integrated Branding**: Custom logos integrated into header and hero sections
- **Accessibility**: Semantic HTML5 structure and proper ARIA labels
- **Performance**: Optimized fonts loading and asset delivery
- **Mobile Optimized**: Responsive header with row-layout for logos and text on small screens

## 📁 Project Structure

```
shuk2/
├── index.html      # Main HTML file
├── styles.css      # Stylesheet with CSS variables and animations
├── script.js       # JavaScript for map initialization and interactions
└── README.md       # Project documentation
```

## 🚀 Setup Instructions

### Prerequisites

- Web server (XAMPP, WAMP, or any local server)
- Modern web browser

### Installation

1. **Clone or download** the project files to your web server directory
   - For XAMPP: `C:\xampp\htdocs\shuk2\`
   - For WAMP: `C:\wamp64\www\shuk2\`

2. **Start your web server** (if using XAMPP/WAMP)

3. **Access the site**:
   - Via localhost: `http://localhost/shuk2/`
   - Or open `index.html` directly in your browser (map may require server)

### Quick Start

Simply place all files in your web server's document root and navigate to the `index.html` file.

## 📄 File Descriptions

### `index.html`
- Semantic HTML5 structure
- SEO meta tags and structured data
- RTL (right-to-left) language support
- External script and stylesheet references

### `styles.css`
- CSS custom properties (variables) for easy theming
- Responsive design with mobile-first approach
- Smooth animations and transitions
- Organized into logical sections with comments

### `script.js`
- Map initialization using Leaflet.js
- Service area configuration and rendering
- Interactive legend for toggling service areas
- Error handling for missing dependencies

## 🛠 Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS variables, animations, and gradients
- **JavaScript (ES6+)**: Map functionality and interactions
- **Leaflet.js v1.9.4**: Interactive map library
- **OpenStreetMap**: Map tiles provider
- **Google Fonts**: Assistant, Rubik, Heebo, Varela Round, Secular One

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🎨 Customization

### Changing Colors

Edit CSS variables in `styles.css`:

```css
:root {
    --primary-color: #FF6B35;
    --secondary-color: #F7931E;
    --accent-color: #4ECDC4;
    /* ... */
}
```

### Modifying Service Areas

Edit the `SERVICE_AREAS` object in `script.js`:

```javascript
const SERVICE_AREAS = {
    ramla: {
        center: [31.9254, 34.8668],
        radius: 2500,
        color: '#FF6B35',
        // ...
    }
};
```

### Updating Business Information

1. **Contact Information**: Update phone number in `index.html` (line 153)
2. **Address**: Update in multiple locations:
   - Meta description (line 6)
   - Structured data (line 44)
   - Store location config in `script.js`
3. **Business Hours**: Update in structured data (lines 49-55)

## 📝 Code Quality

- **Clean Code**: Well-organized, commented, and maintainable
- **Separation of Concerns**: HTML, CSS, and JavaScript in separate files
- **Documentation**: Comprehensive comments throughout codebase
- **Best Practices**: Semantic HTML, CSS variables, ES6+ JavaScript

## 🔍 SEO Features

- Meta description and keywords
- Open Graph tags for social media sharing
- Twitter Card metadata
- JSON-LD structured data (LocalBusiness schema)
- Semantic HTML5 elements
- Proper heading hierarchy

## 📱 Responsive Breakpoints

- **Desktop**: Default styles (> 768px)
- **Tablet**: `@media (max-width: 768px)`
- **Mobile**: `@media (max-width: 480px)`

## 🐛 Troubleshooting

### Map Not Loading
- Ensure you're accessing via a web server (not `file://`)
- Check browser console for errors
- Verify Leaflet.js CDN is accessible

### Fonts Not Loading
- Check internet connection (Google Fonts requires connection)
- Verify font URLs in HTML head section

### Styling Issues
- Clear browser cache
- Verify `styles.css` is linked correctly
- Check browser console for CSS errors

## 📄 License

© 2024 שליחות שוק רמלה. All rights reserved.

## 👥 Support

For issues or questions, contact: **054-5814659**

---

**Last Updated**: 2025
