/**
 * ═══════════════════════════════════════════════════════
 *  CEYLON EXPLORER — PAGE DATA LOADER
 *  ceylon-loader.js
 *
 *  Add <script src="ceylon-data.js"></script> FIRST
 *  Then add <script src="ceylon-loader.js"></script>
 *  before </body> in each page listed below.
 *
 *  Pages covered:
 *    hotel-complete.html
 *    vehicle-complete.html
 *    tourguide-complete.html
 *    activity-complete.html
 *    touristlocation-complete.html
 *    emergency-healthcare.html
 * ═══════════════════════════════════════════════════════
 */

document.addEventListener('DOMContentLoaded', function () {

    const page = location.pathname.split('/').pop() || 'index.html';

    const isHome = (page === 'index.html' || page === '');

    // ────────────────────────────────────────────────────
    // HOTELS PAGE
    // ────────────────────────────────────────────────────
    if (page === 'hotel-complete.html' || isHome) {
        overrideHotelPage(isHome);
    }

    // ────────────────────────────────────────────────────
    // VEHICLES PAGE
    // ────────────────────────────────────────────────────
    if (page === 'vehicle-complete.html' || isHome) {
        overrideVehiclePage(isHome);
    }

    // ────────────────────────────────────────────────────
    // TOUR GUIDES PAGE
    // ────────────────────────────────────────────────────
    if (page === 'tourguide-complete.html' || isHome) {
        overrideGuidePage(isHome);
    }

    // ────────────────────────────────────────────────────
    // ACTIVITIES PAGE
    // ────────────────────────────────────────────────────
    if (page === 'activity-complete.html' || isHome) {
        overrideActivityPage(isHome);
    }

    // ────────────────────────────────────────────────────
    // LOCATIONS PAGE
    // ────────────────────────────────────────────────────
    if (page === 'touristlocation-complete.html' || isHome) {
        overrideLocationPage(isHome);
    }

    // ────────────────────────────────────────────────────
    // EMERGENCY PAGE
    // ────────────────────────────────────────────────────
    if (page === 'emergency-healthcare.html') {
        injectEmergencyAdminData();
    }
});


// ════════════════════════════════════════════════════════
// ════════════════════════════════════════════════════════
//  HOTEL PAGE OVERRIDE
// ════════════════════════════════════════════════════════
function overrideHotelPage(isHome = false) {
    // Override the existing loadHotels function
    window.loadHotels = async function (location = '', priceRange = '', rating = '') {
        try {
            const res = await fetch('http://localhost:8080/api/hotels');
            if (!res.ok) throw new Error('API Error');
            let hotels = await res.json();
            if (location)    hotels = hotels.filter(h => h.location && h.location.toLowerCase().includes(location.toLowerCase()));
            if (rating)      hotels = hotels.filter(h => (h.rating || parseInt(h.stars) || 0) >= parseInt(rating));
            if (priceRange)  hotels = priceFilterHotels(hotels, priceRange);
            renderHotels(hotels);
        } catch (e) {
            console.warn('Fallback to local data due to API error', e);
            let hotels = CeylonData.getHotels();
            if (location)    hotels = hotels.filter(h => h.location && h.location.toLowerCase().includes(location.toLowerCase()));
            if (rating)      hotels = hotels.filter(h => (h.rating || parseInt(h.stars) || 0) >= parseInt(rating));
            if (priceRange)  hotels = priceFilterHotels(hotels, priceRange);
            renderHotels(hotels);
        }
    };

    window.searchHotels = function () {
        const location   = document.getElementById('filterLocation')?.value || '';
        const priceRange = document.getElementById('filterPrice')?.value || '';
        const rating     = document.getElementById('filterRating')?.value || '';
        window.loadHotels(location, priceRange, rating);
    };

    function priceFilterHotels(hotels, range) {
        if (range === '200+') return hotels.filter(h => (h.pricePerNight || h.price || 0) >= 200);
        const [min, max] = range.split('-').map(Number);
        return hotels.filter(h => { const p = h.pricePerNight || h.price || 0; return p >= min && p <= max; });
    }

    function renderHotels(hotels) {
        const grid = document.getElementById('hotelsGrid');
        const count = document.getElementById('resultsCount');
        if (!grid) return;
        
        let displayList = hotels;
        if (isHome) displayList = displayList.slice(0, 4);

        count && (count.textContent = `${displayList.length} hotel${displayList.length !== 1 ? 's' : ''} found`);
        if (!displayList.length) { grid.innerHTML = '<p class="no-results">No hotels found matching your criteria.</p>'; return; }
        grid.innerHTML = '';
        displayList.forEach(h => grid.appendChild(buildHotelCard(h)));
    }

    function buildHotelCard(h) {
        const price  = h.pricePerNight || h.price || 0;
        const rating = h.rating || parseInt(h.stars) || 3;
        const safeH  = { ...h, pricePerNight: price, rating };
        const card   = document.createElement('div');
        card.className = 'hotel-card';
        card.onclick = () => openBookingModal(safeH);
        card.innerHTML = `
            <div class="hotel-image" style="background-image:url('${h.imageUrl || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400'}')">
                <span class="hotel-badge">${rating} <i class="fas fa-star"></i></span>
            </div>
            <div class="hotel-content">
                <h3>${h.name}</h3>
                <p class="hotel-location"><i class="fas fa-map-marker-alt"></i> ${h.location || ''}</p>
                <p class="hotel-desc">${h.description || 'Comfortable accommodation with modern amenities'}</p>
                <div class="hotel-amenities">${amenityIcons(h.amenities)}</div>
                <div class="hotel-footer">
                    <div class="hotel-price">
                        <span class="price-label">From</span>
                        <span class="price-value">$${price}</span>
                        <span class="price-unit">/ night</span>
                    </div>
                    <button class="btn-book-now" onclick="event.stopPropagation();openBookingModal(${esc(safeH)})">
                        <i class="fas fa-calendar-check"></i> Book Now
                    </button>
                </div>
            </div>`;
        return card;
    }

    function amenityIcons(amenities) {
        if (!amenities) return '';
        const map = { 'WiFi':'fa-wifi','Pool':'fa-swimming-pool','Spa':'fa-spa','Restaurant':'fa-utensils','Gym':'fa-dumbbell','Parking':'fa-parking','AC':'fa-snowflake' };
        return amenities.split(',').map(a => { const i = map[a.trim()]; return i ? `<i class="fas ${i}" title="${a.trim()}"></i>` : ''; }).join(' ');
    }

    // Initial load
    window.loadHotels();
}


// ════════════════════════════════════════════════════════
// ════════════════════════════════════════════════════════
//  VEHICLE PAGE OVERRIDE
// ════════════════════════════════════════════════════════
function overrideVehiclePage(isHome = false) {
    window.loadVehicles = async function (type = 'all') {
        try {
            const res = await fetch('http://localhost:8080/api/vehicles');
            if (!res.ok) throw new Error('API Error');
            let vehicles = await res.json();
            if (type !== 'all') vehicles = vehicles.filter(v => (v.type || '').toLowerCase() === type.toLowerCase());
            renderVehicles(vehicles);
        } catch (e) {
            console.warn('Fallback to local data due to API error', e);
            let vehicles = CeylonData.getVehicles();
            if (type !== 'all') vehicles = vehicles.filter(v => (v.type || '').toLowerCase() === type.toLowerCase());
            renderVehicles(vehicles);
        }
    };

    window.filterByType = function (type, btn) {
        document.querySelectorAll('.type-tab').forEach(b => b.classList.remove('active'));
        btn && btn.classList.add('active');
        window.loadVehicles(type);
    };

    window.searchVehicles = function () { window.loadVehicles('all'); };

    function renderVehicles(vehicles) {
        const grid = document.getElementById('vehiclesGrid');
        const count = document.getElementById('resultsCount');
        if (!grid) return;

        let displayList = vehicles;
        if (isHome) displayList = displayList.slice(0, 4);

        count && (count.textContent = `${displayList.length} vehicle${displayList.length !== 1 ? 's' : ''} found`);
        if (!displayList.length) { grid.innerHTML = '<p class="no-results">No vehicles found.</p>'; return; }
        grid.innerHTML = '';
        displayList.forEach(v => grid.appendChild(buildVehicleCard(v)));
    }

    function buildVehicleCard(v) {
        const price = v.pricePerDay || v.price || 0;
        const seats = v.capacity || v.seats || 4;
        const safeV = { ...v, pricePerDay: price, capacity: seats };
        const card  = document.createElement('div');
        card.className = 'vehicle-card';
        card.onclick = () => openRentalModal(safeV);
        card.innerHTML = `
            <div class="vehicle-image" style="background-image:url('${v.imageUrl || 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400'}')">
                <span class="vehicle-badge">${v.type || 'Vehicle'}</span>
            </div>
            <div class="vehicle-content">
                <h3>${v.name}</h3>
                <p class="vehicle-type"><i class="fas fa-car"></i> ${v.model || v.brand || v.type || ''}</p>
                <div class="vehicle-features">
                    <span><i class="fas fa-users"></i> ${seats} seats</span>
                    <span><i class="fas fa-user-tie"></i> With Driver</span>
                </div>
                <div class="vehicle-footer">
                    <div class="vehicle-price">
                        <span class="price-value">$${price}</span>
                        <span class="price-unit">/ day</span>
                    </div>
                    <button class="btn-rent-now" onclick="event.stopPropagation();openRentalModal(${esc(safeV)})">
                        <i class="fas fa-key"></i> Rent Now
                    </button>
                </div>
            </div>`;
        return card;
    }

    window.loadVehicles('all');
}


// ════════════════════════════════════════════════════════
// ════════════════════════════════════════════════════════
//  GUIDE PAGE OVERRIDE
// ════════════════════════════════════════════════════════
function overrideGuidePage(isHome = false) {
    window.loadGuides = async function (language = '', specialty = '') {
        try {
            const res = await fetch('http://localhost:8080/api/tour-guides');
            if (!res.ok) throw new Error('API Error');
            let guides = await res.json();
            if (language)  guides = guides.filter(g => g.languages && g.languages.toLowerCase().includes(language.toLowerCase()));
            if (specialty) guides = guides.filter(g => g.specialty && g.specialty.toLowerCase().includes(specialty.toLowerCase().replace(/_/g,' ')));
            renderGuides(guides);
        } catch (e) {
            console.warn('Fallback to local data due to API error', e);
            let guides = CeylonData.getGuides();
            if (language)  guides = guides.filter(g => g.languages && g.languages.toLowerCase().includes(language.toLowerCase()));
            if (specialty) guides = guides.filter(g => g.specialty && g.specialty.toLowerCase().includes(specialty.toLowerCase().replace(/_/g,' ')));
            renderGuides(guides);
        }
    };

    window.searchGuides = function () {
        const lang = document.getElementById('filterLanguage')?.value || '';
        const spec = document.getElementById('filterSpecialty')?.value || '';
        window.loadGuides(lang, spec);
    };

    function renderGuides(guides) {
        const grid  = document.getElementById('guidesGrid');
        const count = document.getElementById('resultsCount');
        if (!grid) return;

        let displayList = guides;
        if (isHome) displayList = displayList.slice(0, 4);

        count && (count.textContent = `${displayList.length} guide${displayList.length !== 1 ? 's' : ''} found`);
        if (!displayList.length) { grid.innerHTML = '<p class="no-results">No guides found.</p>'; return; }
        grid.innerHTML = '';
        displayList.forEach(g => grid.appendChild(buildGuideCard(g)));
    }

    function buildGuideCard(g) {
        const price = g.pricePerDay || g.rate || 0;
        const exp   = g.experienceYears || g.experience || 0;
        const safeG = { ...g, pricePerDay: price, experienceYears: exp, rating: g.rating || 5, verified: true };
        const card  = document.createElement('div');
        card.className = 'guide-card';
        card.onclick = () => openBookingModal(safeG);
        card.innerHTML = `
            <div class="guide-image" style="background-image:url('${g.imageUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'}')">
                <span class="verified-badge"><i class="fas fa-check-circle"></i> Verified</span>
                <span class="guide-badge">${safeG.rating} <i class="fas fa-star"></i></span>
            </div>
            <div class="guide-content">
                <h3>${g.name}</h3>
                <p class="guide-specialty"><i class="fas fa-certificate"></i> ${g.specialty || ''}</p>
                <p class="guide-languages"><i class="fas fa-language"></i> ${g.languages || 'English'}</p>
                <div class="guide-experience">
                    <div class="experience-item"><span class="experience-value">${exp}</span><span class="experience-label">Years Exp.</span></div>
                    <div class="experience-item"><span class="experience-value">${safeG.rating}</span><span class="experience-label">Rating</span></div>
                </div>
                <div class="guide-footer">
                    <div class="guide-price">
                        <span class="price-value">$${price}</span>
                        <span class="price-unit">/ day</span>
                    </div>
                    <button class="btn-hire-now" onclick="event.stopPropagation();openBookingModal(${esc(safeG)})">
                        <i class="fas fa-user-plus"></i> Hire Guide
                    </button>
                </div>
            </div>`;
        return card;
    }

    window.loadGuides();
}


// ════════════════════════════════════════════════════════
// ════════════════════════════════════════════════════════
//  ACTIVITY PAGE OVERRIDE
// ════════════════════════════════════════════════════════
function overrideActivityPage(isHome = false) {
    window.loadActivities = async function (category = 'all') {
        try {
            const res = await fetch('http://localhost:8080/api/activities');
            if (!res.ok) throw new Error('API Error');
            let acts = await res.json();
            if (category !== 'all') acts = acts.filter(a => (a.type || a.category || '').toLowerCase().includes(category.toLowerCase()));
            renderActivities(acts);
        } catch (e) {
            console.warn('Fallback to local data due to API error', e);
            let acts = CeylonData.getActivities();
            if (category !== 'all') acts = acts.filter(a => (a.type || a.category || '').toLowerCase().includes(category.toLowerCase()));
            renderActivities(acts);
        }
    };

    window.filterByCategory = function (category, el) {
        document.querySelectorAll('.category-card').forEach(c => c.classList.remove('active'));
        el && el.classList.add('active');
        window.loadActivities(category);
    };

    function renderActivities(acts) {
        const grid  = document.getElementById('activitiesGrid');
        const count = document.getElementById('resultsCount');
        if (!grid) return;

        let displayList = acts;
        if (isHome) displayList = displayList.slice(0, 4);

        count && (count.textContent = `${displayList.length} activit${displayList.length !== 1 ? 'ies' : 'y'} found`);
        if (!displayList.length) { grid.innerHTML = '<p class="no-results">No activities found.</p>'; return; }
        grid.innerHTML = '';
        displayList.forEach(a => grid.appendChild(buildActivityCard(a)));
    }

    function buildActivityCard(a) {
        const price = a.pricePerPerson || a.price || 0;
        const safeA = { ...a, pricePerPerson: price, maxParticipants: a.maxParticipants || 10 };
        const card  = document.createElement('div');
        card.className = 'activity-card';
        card.onclick = () => openBookingModal(safeA);
        card.innerHTML = `
            <div class="activity-image" style="background-image:url('${a.imageUrl || 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400'}')">
                <span class="activity-badge">${a.type || a.category || 'Activity'}</span>
            </div>
            <div class="activity-content">
                <h3>${a.name}</h3>
                <p class="activity-location"><i class="fas fa-map-marker-alt"></i> ${a.location || ''}</p>
                <div class="activity-details">
                    <div class="detail-item"><i class="fas fa-clock"></i><span>${a.duration || ''}</span></div>
                    <div class="detail-item"><i class="fas fa-users"></i><span>Max ${safeA.maxParticipants}</span></div>
                </div>
                <div class="activity-footer">
                    <div class="activity-price">
                        <span class="price-value">$${price}</span>
                        <span class="price-unit">/ person</span>
                    </div>
                    <button class="btn-book-activity" onclick="event.stopPropagation();openBookingModal(${esc(safeA)})">
                        <i class="fas fa-ticket-alt"></i> Book Now
                    </button>
                </div>
            </div>`;
        return card;
    }

    window.loadActivities('all');
}


// ════════════════════════════════════════════════════════
// ════════════════════════════════════════════════════════
//  LOCATION PAGE OVERRIDE
// ════════════════════════════════════════════════════════
function overrideLocationPage(isHome = false) {
    window.loadLocations = async function (type = 'all') {
        try {
            const res = await fetch('http://localhost:8080/api/locations');
            if (!res.ok) throw new Error('API Error');
            let locs = await res.json();
            if (type !== 'all') locs = locs.filter(l => (l.type || '').toUpperCase() === type.toUpperCase());
            renderLocations(locs);
        } catch (e) {
            console.warn('Fallback to local data due to API error', e);
            let locs = CeylonData.getLocations();
            if (type !== 'all') locs = locs.filter(l => (l.type || '').toUpperCase() === type.toUpperCase());
            renderLocations(locs);
        }
    };

    window.filterLocations = function (type, el) {
        document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
        el && el.classList.add('active');
        window.loadLocations(type);
    };

    function renderLocations(locs) {
        const grid  = document.getElementById('locationsGrid');
        const count = document.getElementById('resultsCount');
        if (!grid) return;

        let displayList = locs;
        if (isHome) displayList = displayList.slice(0, 4);

        count && (count.textContent = `${displayList.length} location${displayList.length !== 1 ? 's' : ''} found`);
        if (!displayList.length) { grid.innerHTML = '<p class="no-results">No locations found.</p>'; return; }
        grid.innerHTML = '';
        displayList.forEach(l => grid.appendChild(buildLocationCard(l)));
    }

    function buildLocationCard(l) {
        const card = document.createElement('div');
        card.className = 'location-card';
        card.onclick = () => openDetailsModal(l);
        card.innerHTML = `
            <div class="location-image" style="background-image:url('${l.imageUrl || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400'}')">
                <span class="location-badge">${(l.type || '').replace(/_/g,' ')}</span>
            </div>
            <div class="location-content">
                <h3>${l.name}</h3>
                <p class="location-province"><i class="fas fa-map-marker-alt"></i> ${l.province || ''}</p>
                <div class="location-info">
                    <div class="info-item"><span class="info-label">Opening Hours</span><span class="info-value">${l.openingHours || 'Daily'}</span></div>
                    <div class="info-item"><span class="info-label">Entry Fee</span><span class="info-value">${l.entryFee || 'Free'}</span></div>
                </div>
                <button class="btn-view-details" onclick="event.stopPropagation();openDetailsModal(${esc(l)})">
                    <i class="fas fa-info-circle"></i> View Details
                </button>
            </div>`;
        return card;
    }

    window.loadLocations('all');
}


// ════════════════════════════════════════════════════════
//  EMERGENCY PAGE — inject admin data
// ════════════════════════════════════════════════════════
function injectEmergencyAdminData() {
    const hospitals = CeylonData.getEmergency('hospital');
    const spas      = CeylonData.getEmergency('spa');
    const ayurveda  = CeylonData.getEmergency('ayurveda');

    function buildCard(item, colorClass) {
        return `
        <div class="healthcare-card">
            <div class="healthcare-header ${colorClass}">
                <h3>${item.name}</h3>
                <p>${item.type.charAt(0).toUpperCase() + item.type.slice(1)} · ${item.location || ''}</p>
            </div>
            <div class="healthcare-body">
                ${item.location ? `<div class="location-info"><i class="fas fa-map-marker-alt"></i><span>${item.location}</span></div>` : ''}
                ${item.phone    ? `<div class="location-info"><i class="fas fa-phone"></i><a href="tel:${item.phone}">${item.phone}</a></div>` : ''}
                ${item.hours    ? `<div class="location-info"><i class="fas fa-clock"></i><span>${item.hours}</span></div>` : ''}
                ${item.description ? `<div class="package-item"><p>${item.description}</p></div>` : ''}
            </div>
        </div>`;
    }

    // Inject hospitals into hospitals tab
    if (hospitals.length) {
        const hosGrid = document.querySelector('#hospitals .cards-grid');
        if (hosGrid) {
            const adminSection = document.createElement('div');
            adminSection.innerHTML = `<h3 style="text-align:center;margin:2rem 0 1.5rem;color:#667eea;font-size:1.5rem"><i class="fas fa-plus-circle"></i> Recently Added Facilities</h3><div class="cards-grid">${hospitals.map(h => buildCard(h, '')).join('')}</div>`;
            hosGrid.parentElement.insertBefore(adminSection, hosGrid);
        }
    }

    // Inject spas
    if (spas.length) {
        const spaContent = document.querySelector('#spa .cards-grid');
        if (spaContent) {
            spas.forEach(s => { spaContent.insertAdjacentHTML('afterbegin', buildCard(s, 'spa')); });
        }
    }

    // Inject ayurveda
    if (ayurveda.length) {
        const ayurContent = document.querySelector('#ayurveda .cards-grid');
        if (ayurContent) {
            ayurveda.forEach(a => { ayurContent.insertAdjacentHTML('afterbegin', buildCard(a, 'ayurveda')); });
        }
    }
}


// ════════════════════════════════════════════════════════
//  UTILITY
// ════════════════════════════════════════════════════════
function esc(obj) {
    return JSON.stringify(obj).replace(/"/g, '&quot;');
}