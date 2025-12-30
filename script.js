/**
 * שליחות שוק רמלה - Map Initialization Script
 * 
 * This script initializes the Leaflet map with service areas and handles
 * interactive legend toggling for visibility control.
 */

// Map configuration constants
const MAP_CONFIG = {
    center: [31.9292, 34.8656], // Ramla city general center
    zoom: 13,
    tileLayer: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19
};

// Service area configurations with polygons
// Using accurate coordinates - polygons represent service coverage areas
const SERVICE_AREAS = {
    ramla: {
        // Ramla city general area - bigger to west to meet ג'ואריש, bigger to east to contain city center
        center: [31.9292, 34.8656],
        polygon: [
            [31.938900, 34.842900],  // North-West – Road 44 area
            [31.943300, 34.859300],  // North – near Bilu Junction direction
            [31.941100, 34.873900],  // North-East
            [31.934300, 34.889000],  // East – near Ganne Aviv area
            [31.928400, 34.893700],  // South-East
            [31.917500, 34.887900],  // South – near old Lod Road
            [31.915900, 34.875000],  // South-West
            [31.919800, 34.858400],  // West – industrial zone
            [31.926200, 34.846900],  // West-Northwest
        ],
        color: '#FF6B35',
        label: 'רמלה',
        labelPosition: [31.9292, 34.8720]
    },
    center: {
        // Central Ramla - City Hall / central market area (~400m radius)
        center: [31.9261, 34.8674],
        polygon: [
            [31.9235, 34.8650], // Southwest
            [31.9230, 34.8685], // West
            [31.9240, 34.8705], // Northwest
            [31.9270, 34.8715], // North
            [31.9300, 34.8705], // Northeast
            [31.9310, 34.8685], // East
            [31.9305, 34.8655], // Southeast
            [31.9275, 34.8645], // South
            [31.9235, 34.8650]  // Close polygon
        ],
        color: '#F7931E',
        label: 'מרכז רמלה',
        labelPosition: [31.9261, 34.8700]
    },
    juarish: {
        // ג'ואריש / Qaryat Jawarish neighborhood (~600-700m radius)
        center: [31.92312, 34.84561],
        polygon: [
            [31.9185, 34.8400], // Southwest
            [31.9180, 34.8430], // West
            [31.9185, 34.8500], // Northwest
            [31.9210, 34.8520], // North
            [31.9275, 34.8515], // Northeast
            [31.9300, 34.8490], // East
            [31.9295, 34.8415], // Southeast
            [31.9255, 34.8395], // South
            [31.9185, 34.8400]  // Close polygon
        ],
        color: '#4ECDC4',
        label: 'ג\'ואריש',
        labelPosition: [31.92312, 34.8500]
    }
};

// Store location configuration
const STORE_LOCATION = {
    coordinates: [31.92442, 34.87358], // רח פסטר 7 רמלה - Accurate coordinates
    address: 'רח פסטר 7 רמלה',
    popupTitle: 'רח פסטר 7 רמלה',
    popupSubtitle: 'מיקום החנות',
    // Building footprint area (small square highlight)
    buildingFootprint: [
        [31.92470, 34.87330],  // NW corner
        [31.92470, 34.87385],  // NE corner
        [31.92415, 34.87385],  // SE corner
        [31.92415, 34.87330]   // SW corner
    ]
};

// Ramle Market configuration
const MARKET_LOCATION = {
    coordinates: [31.925777, 34.874382], // Official center of Ramle Market
    name: 'שוק רמלה',
    popupTitle: 'שוק רמלה',
    popupSubtitle: 'השוק המרכזי',
    // Market polygon - expanded even more to cover much larger area
    polygon: [
        [31.926600, 34.873200],  // North-West corner (expanded further)
        [31.926700, 34.874800],  // North side – market entrance (expanded further)
        [31.926500, 34.875500],  // North-East edge (expanded further)
        [31.925200, 34.875800],  // East edge (expanded further)
        [31.924600, 34.875500],  // South-East edge (expanded further)
        [31.924500, 34.874000],  // South side (expanded further)
        [31.924700, 34.873200],  // South-West internal corner (expanded further)
        [31.925200, 34.873000]   // West edge (expanded further)
    ]
};


/**
 * Creates a custom label icon for service areas
 * @param {string} label - The label text
 * @param {string} color - The gradient start color
 * @param {string} colorEnd - The gradient end color
 * @param {number} width - Icon width
 * @returns {L.DivIcon} Custom Leaflet icon
 */
function createAreaLabelIcon(label, color, colorEnd, width) {
    return L.divIcon({
        className: 'area-label',
        html: `<div style="background: linear-gradient(135deg, ${color} 0%, ${colorEnd} 100%); color: white; padding: 8px 16px; border-radius: 20px; font-weight: 800; font-size: 14px; white-space: nowrap; box-shadow: 0 3px 10px rgba(0,0,0,0.3); border: 2px solid white; font-family: 'Assistant', sans-serif; text-align: center;">${label}</div>`,
        iconSize: [width, 35],
        iconAnchor: [width / 2, 17]
    });
}

/**
 * Creates a popup HTML for service areas
 * @param {string} title - Popup title
 * @param {string} subtitle - Popup subtitle
 * @param {string} color - Color for the title
 * @returns {string} HTML string
 */
function createAreaPopup(title, subtitle, color) {
    return `
        <div style="text-align: center; font-family: 'Assistant', sans-serif;">
            <div style="font-weight: 700; font-size: 16px; color: ${color}; margin-bottom: 5px;">${title}</div>
            <div style="font-size: 12px; color: #666;">${subtitle}</div>
        </div>
    `;
}

/**
 * Creates a service area polygon on the map
 * @param {Object} areaConfig - Service area configuration
 * @param {L.Map} map - Leaflet map instance
 * @returns {L.Polygon} Leaflet polygon layer
 */
function createServiceAreaPolygon(areaConfig, map) {
    const polygon = L.polygon(areaConfig.polygon, {
        color: areaConfig.color,
        fillColor: areaConfig.color,
        fillOpacity: 0.35,
        weight: 3,
        opacity: 0.85,
        className: 'service-area-polygon'
    }).addTo(map);
    
    // Add hover effect for better interactivity
    polygon.on('mouseover', function(e) {
        this.setStyle({
            fillOpacity: 0.5,
            weight: 4,
            opacity: 1
        });
    });
    
    polygon.on('mouseout', function(e) {
        this.setStyle({
            fillOpacity: 0.35,
            weight: 3,
            opacity: 0.85
        });
    });
    
    polygon.bindPopup(createAreaPopup(areaConfig.label, 'אזור שירות', areaConfig.color));
    return polygon;
}

/**
 * Creates a service area label on the map
 * @param {Object} areaConfig - Service area configuration
 * @param {L.Map} map - Leaflet map instance
 * @returns {L.Marker} Leaflet marker layer
 */
function createServiceAreaLabel(areaConfig, map) {
    const colorEnd = areaConfig.color === '#FF6B35' ? '#FF8C5A' :
                     areaConfig.color === '#F7931E' ? '#FFB84D' : '#6EDDD6';
    const width = areaConfig.label === 'מרכז רמלה' ? 100 : 
                  areaConfig.label === 'ג\'ואריש' ? 85 : 70;
    
    const label = L.marker(areaConfig.labelPosition, {
        icon: createAreaLabelIcon(areaConfig.label, areaConfig.color, colorEnd, width),
        zIndexOffset: 500
    }).addTo(map);
    
    return label;
}

/**
 * Toggles visibility of a service area on the map
 * @param {string} areaName - Name of the area ('ramla', 'center', 'juarish')
 * @param {L.Polygon} polygon - Polygon layer for the area
 * @param {L.Marker} label - Label marker for the area
 * @param {L.Map} map - Leaflet map instance
 * @param {Object} areaVisibility - Object tracking visibility state
 */
function toggleAreaVisibility(areaName, polygon, label, map, areaVisibility) {
    areaVisibility[areaName] = !areaVisibility[areaName];
    const legendElement = document.getElementById(`legend-${areaName}`);
    const toggleIcon = legendElement.querySelector('.toggle-icon');
    
    if (areaVisibility[areaName]) {
        // Show area
        map.addLayer(polygon);
        map.addLayer(label);
        legendElement.classList.add('active');
        toggleIcon.textContent = '👁️';
    } else {
        // Hide area
        map.removeLayer(polygon);
        map.removeLayer(label);
        legendElement.classList.remove('active');
        toggleIcon.textContent = '👁️‍🗨️';
    }
}

/**
 * Initializes the map and all interactive features
 */
function initializeMap() {
    // Check if Leaflet is loaded
    if (typeof L === 'undefined') {
        console.error('Leaflet library not loaded!');
        const mapElement = document.getElementById('map');
        if (mapElement) {
            mapElement.innerHTML = '<div style="padding: 20px; text-align: center; color: #666; font-family: Assistant, sans-serif;">טוען מפה... אנא רענן את הדף</div>';
        }
        return;
    }

    // Initialize map
    const map = L.map('map', {
        zoomControl: true,
        scrollWheelZoom: true
    }).setView(MAP_CONFIG.center, MAP_CONFIG.zoom);

    // Add tile layer
    L.tileLayer(MAP_CONFIG.tileLayer, {
        attribution: MAP_CONFIG.attribution,
        maxZoom: MAP_CONFIG.maxZoom
    }).addTo(map);

    // Add store location marker with accurate coordinates (standard marker)
    const storeMarker = L.marker(STORE_LOCATION.coordinates, {
        zIndexOffset: 1000
    }).addTo(map);
    
    // Open popup by default to make it visible
    storeMarker.bindPopup(`
        <div style="text-align: center; font-family: 'Assistant', sans-serif;">
            <div style="font-weight: 700; font-size: 16px; color: #FF0000; margin-bottom: 5px;">${STORE_LOCATION.popupTitle}</div>
            <div style="font-size: 12px; color: #666;">${STORE_LOCATION.popupSubtitle}</div>
        </div>
    `).openPopup();
    
    // Add building footprint highlight (small square)
    const buildingFootprint = L.polygon(STORE_LOCATION.buildingFootprint, {
        color: '#FF0000',
        weight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.2,
        zIndexOffset: 999
    }).addTo(map);
    
    buildingFootprint.bindPopup(`
        <div style="text-align: center; font-family: 'Assistant', sans-serif;">
            <div style="font-weight: 700; font-size: 14px; color: #FF0000; margin-bottom: 5px;">${STORE_LOCATION.popupTitle}</div>
            <div style="font-size: 11px; color: #666;">אזור משוער של הבניין</div>
        </div>
    `);

    // Add Ramle Market marker at official center
    const marketMarker = L.marker(MARKET_LOCATION.coordinates, {
        zIndexOffset: 1000
    }).addTo(map);
    
    marketMarker.bindPopup(`
        <div style="text-align: center; font-family: 'Assistant', sans-serif;">
            <div style="font-weight: 700; font-size: 16px; color: #25D366; margin-bottom: 5px;">${MARKET_LOCATION.popupTitle}</div>
            <div style="font-size: 12px; color: #666;">${MARKET_LOCATION.popupSubtitle}</div>
        </div>
    `);
    
    // Add Ramle Market polygon with accurate approximation
    const marketPolygon = L.polygon(MARKET_LOCATION.polygon, {
        color: '#25D366',
        weight: 3,
        fillColor: '#25D366',
        fillOpacity: 0.25,
        zIndexOffset: 998
    }).addTo(map);
    
    // Add hover effect to market polygon
    marketPolygon.on('mouseover', function(e) {
        this.setStyle({
            fillOpacity: 0.35,
            weight: 4
        });
    });
    
    marketPolygon.on('mouseout', function(e) {
        this.setStyle({
            fillOpacity: 0.25,
            weight: 3
        });
    });
    
    marketPolygon.bindPopup(`
        <div style="text-align: center; font-family: 'Assistant', sans-serif;">
            <div style="font-weight: 700; font-size: 16px; color: #25D366; margin-bottom: 5px;">${MARKET_LOCATION.popupTitle}</div>
            <div style="font-size: 12px; color: #666;">אזור השוק</div>
        </div>
    `);

    // Create service areas and labels
    const serviceAreaLayers = {};
    const areaVisibility = {
        ramla: true,
        center: true,
        juarish: true
    };

    // Create service areas with polygons
    function initializeServiceAreas() {
        // Create polygons and labels for each service area
        Object.keys(SERVICE_AREAS).forEach(areaName => {
            const areaConfig = SERVICE_AREAS[areaName];
            const polygon = createServiceAreaPolygon(areaConfig, map);
            const label = createServiceAreaLabel(areaConfig, map);
            
            serviceAreaLayers[areaName] = { polygon, label };
        });

        // Fit map bounds to show all service areas with padding
        if (Object.keys(serviceAreaLayers).length > 0) {
            const group = new L.featureGroup(Object.values(serviceAreaLayers).map(layer => layer.polygon));
            map.fitBounds(group.getBounds().pad(0.1));
        }

        // Add click event listeners to legend items
        Object.keys(SERVICE_AREAS).forEach(areaName => {
            const legendElement = document.getElementById(`legend-${areaName}`);
            if (legendElement) {
                legendElement.addEventListener('click', function() {
                    const { polygon, label } = serviceAreaLayers[areaName];
                    toggleAreaVisibility(areaName, polygon, label, map, areaVisibility);
                    
                    // Fit bounds to visible areas when toggling
                    const visibleLayers = Object.keys(serviceAreaLayers)
                        .filter(name => areaVisibility[name])
                        .map(name => serviceAreaLayers[name].polygon);
                    if (visibleLayers.length > 0) {
                        const group = new L.featureGroup(visibleLayers);
                        map.fitBounds(group.getBounds().pad(0.1));
                    }
                });
                
                // Initialize as visible
                legendElement.classList.add('active');
            }
        });
    }

    // Initialize service areas
    initializeServiceAreas();
}

/**
 * Handles the language dropdown toggle logic
 */
function initializeLanguageDropdown() {
    const dropBtn = document.getElementById('lang-drop-btn');
    const dropdown = document.querySelector('.language-dropdown');

    if (dropBtn && dropdown) {
        dropBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdown.classList.toggle('active');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove('active');
            }
        });
    }
}

// Initialize components when DOM is fully loaded
window.addEventListener('load', () => {
    initializeMap();
    initializeLanguageDropdown();
});

