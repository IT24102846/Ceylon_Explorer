// API Configuration
const API_BASE_URL = 'http://localhost:8080/api';

document.addEventListener('DOMContentLoaded', function () {

    // ═══════════════════════════════════════
    // AUTH STATE — navbar update
    // ═══════════════════════════════════════
    checkAuthState();

    function checkAuthState() {
        let user = null;
        try { user = JSON.parse(localStorage.getItem('ceylon_current_user')); } catch {}

        const loginLi  = document.getElementById('navLoginLi');
        const signupLi = document.getElementById('navSignupLi');
        const userLi   = document.getElementById('navUserLi');

        if (!loginLi) return;

        if (user) {
            loginLi.style.display  = 'none';
            signupLi.style.display = 'none';
            userLi.style.display   = 'list-item';

            const nameEl   = document.getElementById('navUserName');
            const avatarEl = document.getElementById('navUserAvatar');
            const dashLink = document.getElementById('dashboardLink');

            if (nameEl)   nameEl.textContent  = user.name ? user.name.split(' ')[0] : 'User';
            if (avatarEl) avatarEl.textContent = (user.name || 'U')[0].toUpperCase();
            if (dashLink) dashLink.href = user.role === 'admin' ? 'admin-dashboard.html' : 'user-dashboard.html';
        } else {
            loginLi.style.display  = 'list-item';
            signupLi.style.display = 'list-item';
            userLi.style.display   = 'none';
        }
    }

    // ═══════════════════════════════════════
    // MOBILE HAMBURGER
    // ═══════════════════════════════════════
    const hamburger = document.getElementById('hamburger');
    const navMenu   = document.getElementById('navMenu');

    if (hamburger) {
        hamburger.addEventListener('click', function () {
            navMenu.classList.toggle('open');
            hamburger.classList.toggle('open');
        });
    }

    // Close menu when a nav link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu) navMenu.classList.remove('open');
            if (hamburger) hamburger.classList.remove('open');
        });
    });

    // ═══════════════════════════════════════
    // CLOSE USER DROPDOWN ON OUTSIDE CLICK
    // ═══════════════════════════════════════
    document.addEventListener('click', function (e) {
        const btn = document.getElementById('userMenuBtn');
        const dd  = document.getElementById('userDropdown');
        if (dd && btn && !btn.contains(e.target) && !dd.contains(e.target)) {
            dd.classList.remove('open');
        }
    });

    // ═══════════════════════════════════════
    // CHATBOT
    // ═══════════════════════════════════════
    const chatbot       = document.getElementById('chatbot');
    const chatbotToggle = document.getElementById('chatbotToggle');
    const chatbotClose  = document.getElementById('chatbotClose');
    const chatbotInput  = document.getElementById('chatbotInput');
    const chatbotSend   = document.getElementById('chatbotSend');

    if (chatbotToggle) {
        chatbotToggle.addEventListener('click', () => {
            chatbot.classList.add('active');
            chatbotToggle.style.display = 'none';
        });
    }

    if (chatbotClose) {
        chatbotClose.addEventListener('click', () => {
            chatbot.classList.remove('active');
            chatbotToggle.style.display = 'flex';
        });
    }

    if (chatbotSend)  chatbotSend.addEventListener('click', sendMessage);
    if (chatbotInput) chatbotInput.addEventListener('keypress', e => { if (e.key === 'Enter') sendMessage(); });

    // ═══════════════════════════════════════
    // SMOOTH SCROLL
    // ═══════════════════════════════════════
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ═══════════════════════════════════════
    // VEHICLE TYPE FILTER
    // ═══════════════════════════════════════
    document.querySelectorAll('.vehicle-type-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            document.querySelectorAll('.vehicle-type-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            filterVehiclesByType(this.getAttribute('data-type'));
        });
    });

    // ═══════════════════════════════════════
    // LOAD DATA
    // ═══════════════════════════════════════
    loadHotels();
    loadVehicles();
    loadGuides();
});

// ═══════════════════════════════════════
// USER DROPDOWN TOGGLE (global — called from HTML)
// ═══════════════════════════════════════
function toggleUserMenu() {
    const dd = document.getElementById('userDropdown');
    if (dd) dd.classList.toggle('open');
}

// ═══════════════════════════════════════
// MOBILE MENU TOGGLE (global — called from HTML)
// ═══════════════════════════════════════
function toggleMobileMenu() {
    const menu = document.getElementById('navMenu');
    const ham  = document.getElementById('hamburger');
    if (menu) menu.classList.toggle('open');
    if (ham)  ham.classList.toggle('open');
}

// ═══════════════════════════════════════
// LOGOUT
// ═══════════════════════════════════════
function logoutUser() {
    localStorage.removeItem('ceylon_current_user');
    window.location.href = 'index.html';
}

// ═══════════════════════════════════════
// CHATBOT
// ═══════════════════════════════════════
function sendMessage() {
    const input   = document.getElementById('chatbotInput');
    const message = input.value.trim();
    if (!message) return;

    addChatMessage(message, 'user');
    input.value = '';

    // Simple local responses (no backend needed)
    const responses = {
        'hello': "Hello! Welcome to Ceylon Explorer 🌴 How can I help you explore Sri Lanka?",
        'hi':    "Hi there! I'm Ceylon Helper. Ask me about hotels, activities, or destinations!",
        'hotel': "We have 500+ hotels across Sri Lanka! Check our Hotels section for amazing deals. 🏨",
        'guide': "Our professional tour guides speak English, French, German, Chinese & more! 🗣️",
        'vehicle': "We offer cars, vans, bikes and luxury vehicles for rent. 🚗",
        'activity': "From safari tours to water sports — Sri Lanka has it all! 🏄",
        'emergency': "Emergency? Call 119 (Police/Ambulance) or Tourist Police: +94 11 242 1052 🚨",
        'default': "Great question! Please explore our sections for Hotels, Vehicles, Tour Guides, Activities and more. How else can I help? 😊"
    };

    const key = Object.keys(responses).find(k => message.toLowerCase().includes(k)) || 'default';
    setTimeout(() => addChatMessage(responses[key], 'bot'), 600);
}

function addChatMessage(message, sender) {
    const container = document.getElementById('chatbotMessages');
    const div = document.createElement('div');
    div.className = sender === 'user' ? 'user-message' : 'bot-message';
    div.innerHTML = `<p>${message}</p>`;
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
}

// ═══════════════════════════════════════
// HOTELS — load from localStorage (admin data) or sample
// ═══════════════════════════════════════
function loadHotels() {
    const stored = getStoredData('ceylon_hotels');
    if (stored.length > 0) {
        displayHotels(stored.map(h => ({
            id: h.id, name: h.name, location: h.location,
            price: h.price, rating: parseInt(h.stars) || 4,
            image: `https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400`,
            status: h.status
        })).filter(h => h.status === 'active'));
    } else {
        displayHotels(sampleHotels());
    }
}

function sampleHotels() {
    return [
        { id:1, name:'Cinnamon Grand Colombo', location:'Colombo', price:150, rating:5, image:'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400' },
        { id:2, name:'Heritance Kandalama',    location:'Kandy',   price:200, rating:5, image:'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400' },
        { id:3, name:'Jetwing Lighthouse',     location:'Galle',   price:180, rating:4, image:'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400' }
    ];
}

function displayHotels(hotels) {
    const grid = document.getElementById('hotelsGrid');
    if (!grid) return;
    if (!hotels.length) { grid.innerHTML = '<p style="text-align:center;color:#999;grid-column:1/-1;">No hotels available yet.</p>'; return; }
    grid.innerHTML = hotels.map(h => `
        <div class="card">
            <div class="card-image" style="background-image:url('${h.image}')"></div>
            <div class="card-content">
                <h3>${h.name}</h3>
                <p><i class="fas fa-map-marker-alt"></i> ${h.location}</p>
                <div class="card-info">
                    <span class="price">$${h.price}/night</span>
                    <span class="rating">${'⭐'.repeat(Math.min(h.rating,5))}</span>
                </div>
                <button class="btn-primary full-width" onclick="bookHotel('${h.id}')">Book Now</button>
            </div>
        </div>`).join('');
}

function bookHotel(id) { alert('Booking system coming soon! Hotel ID: ' + id); }

// ═══════════════════════════════════════
// VEHICLES
// ═══════════════════════════════════════
function loadVehicles() {
    const stored = getStoredData('ceylon_vehicles');
    if (stored.length > 0) {
        displayVehicles(stored.map(v => ({
            id:v.id, name:v.name, type:v.type, capacity:v.seats,
            price:v.price, rating:4,
            image:'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400',
            status:v.status
        })).filter(v => v.status === 'active'));
    } else {
        displayVehicles(sampleVehicles());
    }
}

function sampleVehicles() {
    return [
        { id:1, name:'Toyota KDH Van',  type:'van',    capacity:8, price:80,  rating:5, image:'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400' },
        { id:2, name:'Toyota Premio',   type:'car',    capacity:4, price:50,  rating:4, image:'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400' },
        { id:3, name:'Luxury Sedan',    type:'luxury', capacity:4, price:120, rating:5, image:'https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=400' }
    ];
}

function displayVehicles(vehicles) {
    const grid = document.getElementById('vehiclesGrid');
    if (!grid) return;
    if (!vehicles.length) { grid.innerHTML = '<p style="text-align:center;color:#999;grid-column:1/-1;">No vehicles available yet.</p>'; return; }
    grid.innerHTML = vehicles.map(v => `
        <div class="card" data-type="${v.type}">
            <div class="card-image" style="background-image:url('${v.image}')"></div>
            <div class="card-content">
                <h3>${v.name}</h3>
                <p><i class="fas fa-users"></i> Capacity: ${v.capacity} persons</p>
                <div class="card-info">
                    <span class="price">$${v.price}/day</span>
                    <span class="rating">${'⭐'.repeat(Math.min(v.rating,5))}</span>
                </div>
                <button class="btn-primary full-width" onclick="bookVehicle('${v.id}')">Rent Now</button>
            </div>
        </div>`).join('');
}

function filterVehiclesByType(type) {
    document.querySelectorAll('#vehiclesGrid .card').forEach(card => {
        card.style.display = (type === 'all' || card.dataset.type === type) ? 'block' : 'none';
    });
}

function bookVehicle(id) { alert('Vehicle booking coming soon! Vehicle ID: ' + id); }

// ═══════════════════════════════════════
// GUIDES
// ═══════════════════════════════════════
function loadGuides() {
    const stored = getStoredData('ceylon_guides');
    if (stored.length > 0) {
        displayGuides(stored.map(g => ({
            id:g.id, name:g.name,
            languages: g.languages ? g.languages.split(',').map(l => l.trim()) : ['English'],
            specialty:g.specialty, experience:g.experience,
            rating:4, price:g.rate,
            image:`https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400`,
            status:g.status
        })).filter(g => g.status === 'active'));
    } else {
        displayGuides(sampleGuides());
    }
}

function sampleGuides() {
    return [
        { id:1, name:'Nimal Perera',  languages:['English','French'],  specialty:'Cultural Tours',  experience:10, rating:5, price:60, image:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400' },
        { id:2, name:'Sandun Silva',  languages:['English','German'],  specialty:'Wildlife Safari', experience:8,  rating:5, price:70, image:'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400' },
        { id:3, name:'Kasun Fernando',languages:['English','Spanish'], specialty:'Adventure Tours', experience:6,  rating:4, price:55, image:'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400' }
    ];
}

function displayGuides(guides) {
    const grid = document.getElementById('guidesGrid');
    if (!grid) return;
    if (!guides.length) { grid.innerHTML = '<p style="text-align:center;color:#999;grid-column:1/-1;">No guides available yet.</p>'; return; }
    grid.innerHTML = guides.map(g => `
        <div class="card">
            <div class="card-image" style="background-image:url('${g.image}')"></div>
            <div class="card-content">
                <h3>${g.name}</h3>
                <p><i class="fas fa-language"></i> ${Array.isArray(g.languages) ? g.languages.join(', ') : g.languages}</p>
                <p><i class="fas fa-star"></i> ${g.specialty}</p>
                <p><i class="fas fa-briefcase"></i> ${g.experience} years experience</p>
                <div class="card-info">
                    <span class="price">$${g.price}/day</span>
                    <span class="rating">${'⭐'.repeat(Math.min(g.rating,5))}</span>
                </div>
                <button class="btn-primary full-width" onclick="hireGuide('${g.id}')">Hire Guide</button>
            </div>
        </div>`).join('');
}

function hireGuide(id) { alert('Guide booking coming soon! Guide ID: ' + id); }

// ═══════════════════════════════════════
// HELPER — get data from localStorage
// ═══════════════════════════════════════
function getStoredData(key) {
    try { return JSON.parse(localStorage.getItem(key) || '[]'); } catch { return []; }
}