/**
 * ceylon-data.js
 * ─────────────────────────────────────────────
 * Include this file in every user-facing page.
 * It reads admin-added localStorage data and
 * merges with built-in sample data so pages always
 * have content even when backend is offline.
 * ─────────────────────────────────────────────
 */

const CeylonData = (() => {

    function get(key) {
        try { return JSON.parse(localStorage.getItem(key) || '[]'); } catch { return []; }
    }

    // ── HOTELS ──────────────────────────────────
    const sampleHotels = [
        { id:'s1', name:'Cinnamon Grand Colombo',    location:'Colombo',      stars:'5', price:150, category:'Luxury Resort',  status:'active', description:'Luxury 5-star hotel in the heart of Colombo.',                   imageUrl:'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400', amenities:'WiFi,Pool,Spa,Restaurant,Gym' },
        { id:'s2', name:'Heritance Kandalama',        location:'Kandy',        stars:'5', price:200, category:'Boutique Hotel', status:'active', description:'Eco-friendly luxury resort designed by Geoffrey Bawa.',            imageUrl:'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400', amenities:'WiFi,Pool,Spa,Restaurant' },
        { id:'s3', name:'Jetwing Lighthouse',         location:'Galle',        stars:'4', price:180, category:'Beach Hotel',    status:'active', description:'Beachfront boutique hotel in historic Galle.',                   imageUrl:'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400', amenities:'WiFi,Pool,Restaurant,Parking' },
        { id:'s4', name:'Grand Hotel Nuwara Eliya',   location:'Nuwara Eliya', stars:'4', price:120, category:'City Hotel',     status:'active', description:'Colonial-era luxury hotel in the hill country.',                  imageUrl:'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400', amenities:'WiFi,Restaurant,Gym,Parking' },
        { id:'s5', name:'98 Acres Resort & Spa',      location:'Ella',         stars:'5', price:160, category:'Boutique Hotel', status:'active', description:'Boutique resort with stunning mountain views.',                   imageUrl:'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400', amenities:'WiFi,Pool,Spa,Restaurant' },
        { id:'s6', name:'Anantara Peace Haven',       location:'Galle',        stars:'5', price:250, category:'Luxury Resort',  status:'active', description:'Beachfront luxury resort with world-class amenities.',            imageUrl:'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400', amenities:'WiFi,Pool,Spa,Restaurant,Gym' },
    ];

    function getHotels() {
        const admin = get('ceylon_hotels').filter(h => h.status === 'active').map(h => ({
            id: h.id, name: h.name, location: h.location,
            stars: h.stars || '4', price: parseFloat(h.price) || 0,
            category: h.category || 'Hotel', status: h.status,
            description: h.description || '',
            imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400',
            amenities: '',
            pricePerNight: parseFloat(h.price) || 0,
            rating: parseInt(h.stars) || 4,
        }));
        // merge: admin first, then samples not duplicated
        const names = admin.map(h => (h.name || '').toLowerCase());
        const samples = sampleHotels.filter(s => !names.includes((s.name || '').toLowerCase())).map(s => ({
            ...s, pricePerNight: s.price, rating: parseInt(s.stars)
        }));
        return [...admin, ...samples];
    }

    // ── VEHICLES ─────────────────────────────────
    const sampleVehicles = [
        { id:'sv1', name:'Toyota KDH Van',   type:'VAN',    seats:8,  price:80,  brand:'Toyota', status:'active', description:'Spacious van ideal for groups.',      imageUrl:'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400', features:'AC,Music System,WiFi,Luggage Space' },
        { id:'sv2', name:'Toyota Premio',    type:'Car',    seats:4,  price:50,  brand:'Toyota', status:'active', description:'Comfortable sedan for couples.',       imageUrl:'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400', features:'AC,Leather Seats,Music System' },
        { id:'sv3', name:'Mercedes S-Class', type:'Luxury', seats:4,  price:120, brand:'Mercedes',status:'active',description:'Premium luxury sedan.',               imageUrl:'https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=400', features:'AC,Premium Sound,WiFi,Leather' },
        { id:'sv4', name:'Toyota Coaster',   type:'Van',    seats:25, price:150, brand:'Toyota', status:'active', description:'Large bus for big groups.',            imageUrl:'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400', features:'AC,Reclining Seats,Music System' },
        { id:'sv5', name:'Honda CBR 250R',   type:'Bike',   seats:2,  price:30,  brand:'Honda',  status:'active', description:'Sporty motorcycle for adventurers.',   imageUrl:'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=400', features:'Helmet Included,GPS' },
        { id:'sv6', name:'Honda Vezel',      type:'Car',    seats:5,  price:60,  brand:'Honda',  status:'active', description:'Compact SUV for family trips.',        imageUrl:'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=400', features:'AC,Music System,Bluetooth' },
    ];

    function getVehicles() {
        const admin = get('ceylon_vehicles').filter(v => v.status === 'active').map(v => ({
            id: v.id, name: v.name, type: v.type || 'Car', seats: parseInt(v.seats) || 4,
            price: parseFloat(v.price) || 0, brand: v.brand || '',
            status: v.status, description: v.description || '',
            imageUrl: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400',
            features: '', capacity: parseInt(v.seats) || 4,
            pricePerDay: parseFloat(v.price) || 0, model: v.brand || v.type,
        }));
        const names = admin.map(v => (v.name || '').toLowerCase());
        const samples = sampleVehicles.filter(s => !names.includes((s.name || '').toLowerCase())).map(s => ({
            ...s, capacity: s.seats, pricePerDay: s.price, model: s.brand
        }));
        return [...admin, ...samples];
    }

    // ── GUIDES ───────────────────────────────────
    const sampleGuides = [
        { id:'sg1', name:'Nimal Perera',          languages:'English, French, German', specialty:'Cultural Tours', experience:10, rate:60, status:'active', description:'Passionate about Sri Lankan history and culture.',              imageUrl:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', certifications:'SLTDA Licensed,First Aid Certified', phone:'+94 77 100 0001' },
        { id:'sg2', name:'Sandun Silva',           languages:'English, German, Spanish',specialty:'Wildlife Safari', experience:8,  rate:70, status:'active', description:'Wildlife expert with extensive knowledge of national parks.',    imageUrl:'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400', certifications:'SLTDA Licensed,Wildlife Training', phone:'+94 77 100 0002' },
        { id:'sg3', name:'Kasun Fernando',         languages:'English, Spanish',         specialty:'Adventure',      experience:6,  rate:55, status:'active', description:'Adventure tour specialist for hiking and outdoor activities.',    imageUrl:'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400', certifications:'SLTDA Licensed,Mountain Guide', phone:'+94 77 100 0003' },
        { id:'sg4', name:'Priya Mendis',           languages:'English, Japanese, Chinese',specialty:'Photography',    experience:7,  rate:65, status:'active', description:'Professional photographer guiding photography tours.',           imageUrl:'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400', certifications:'SLTDA Licensed,Professional Photographer', phone:'+94 77 100 0004' },
        { id:'sg5', name:'Ravi Jayasinghe',        languages:'English, French',          specialty:'Food Tours',     experience:5,  rate:50, status:'active', description:'Culinary expert specializing in Sri Lankan cuisine.',            imageUrl:'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400', certifications:'SLTDA Licensed,Culinary Expert', phone:'+94 77 100 0005' },
        { id:'sg6', name:'Anjali Wickramasinghe',  languages:'English, German, Dutch',   specialty:'Cultural Tours', experience:12, rate:75, status:'active', description:'Historian with deep knowledge of UNESCO heritage sites.',         imageUrl:'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400', certifications:'SLTDA Licensed,Archaeology Degree', phone:'+94 77 100 0006' },
    ];

    function getGuides() {
        const admin = get('ceylon_guides').filter(g => g.status === 'active').map(g => ({
            id: g.id, name: g.name,
            languages: g.languages || 'English',
            specialty: g.specialty || 'Cultural Tours',
            experience: parseInt(g.experience) || 1,
            rate: parseFloat(g.rate) || 0,
            status: g.status, description: '',
            imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
            certifications: 'SLTDA Licensed',
            phone: g.phone || '',
            experienceYears: parseInt(g.experience) || 1,
            pricePerDay: parseFloat(g.rate) || 0,
            rating: 5, verified: true,
        }));
        const names = admin.map(g => (g.name || '').toLowerCase());
        const samples = sampleGuides.filter(s => !names.includes((s.name || '').toLowerCase())).map(s => ({
            ...s, experienceYears: s.experience, pricePerDay: s.rate, rating: 5, verified: true
        }));
        return [...admin, ...samples];
    }

    // ── ACTIVITIES ───────────────────────────────
    const sampleActivities = [
        { id:'sa1', name:'Yala Safari',                type:'Safari',       location:'Yala',            price:65,  duration:'4-5 hours', status:'active', description:'Wildlife safari in premier national park.',          imageUrl:'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=400', included:'Safari Jeep,Guide,Park Entry',  maxParticipants:6  },
        { id:'sa2', name:'Scuba Diving Hikkaduwa',     type:'Water Sports', location:'Hikkaduwa',       price:80,  duration:'3 hours',   status:'active', description:'Explore vibrant coral reefs.',                       imageUrl:'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400', included:'Equipment,Instructor',          maxParticipants:8  },
        { id:'sa3', name:"Adam's Peak Trek",           type:'Hiking',       location:'Central Highlands',price:45, duration:'6-7 hours', status:'active', description:'Sacred mountain sunrise trek.',                      imageUrl:'https://images.unsplash.com/photo-1551632811-561732d1e306?w=400', included:'Guide,Flashlight,Breakfast',    maxParticipants:12 },
        { id:'sa4', name:'Sigiriya Cultural Tour',     type:'Cultural',     location:'Central Province', price:70, duration:'Full Day',  status:'active', description:'UNESCO World Heritage site visit.',                  imageUrl:'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400', included:'Transport,Guide,Entry',         maxParticipants:15 },
        { id:'sa5', name:'White Water Rafting',        type:'Adventure',    location:'Kitulgala',        price:55, duration:'3-4 hours', status:'active', description:'Exciting rapids through rainforest.',                imageUrl:'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400', included:'Safety Gear,Guide,Lunch',       maxParticipants:10 },
        { id:'sa6', name:'Whale Watching Mirissa',     type:'Boat Ride',    location:'Mirissa',          price:60, duration:'4-5 hours', status:'active', description:'Spot blue whales and dolphins.',                     imageUrl:'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400', included:'Boat,Guide,Breakfast',          maxParticipants:20 },
    ];

    function getActivities() {
        const admin = get('ceylon_activities').filter(a => a.status === 'active').map(a => ({
            id: a.id, name: a.name, type: a.category || a.type || 'Activity',
            location: a.location || '', price: parseFloat(a.price) || 0,
            duration: a.duration || '', status: a.status,
            description: a.description || '',
            imageUrl: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400',
            included: 'Guide', maxParticipants: 10,
            pricePerPerson: parseFloat(a.price) || 0,
        }));
        const names = admin.map(a => (a.name || '').toLowerCase());
        const samples = sampleActivities.filter(s => !names.includes((s.name || '').toLowerCase())).map(s => ({
            ...s, pricePerPerson: s.price
        }));
        return [...admin, ...samples];
    }

    // ── LOCATIONS ─────────────────────────────────
    const sampleLocations = [
        { id:'sl1', name:'Sigiriya Rock Fortress',       type:'HISTORICAL', province:'Central Province',  openingHours:'7:00 AM - 5:30 PM', entryFee:'$30',  status:'active', description:'Ancient rock fortress, UNESCO World Heritage Site.', imageUrl:'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400', facilities:'Parking,Restrooms,Guide Services,Museum' },
        { id:'sl2', name:'Temple of Sacred Tooth Relic', type:'RELIGIOUS',  province:'Central Province',  openingHours:'5:30 AM - 8:00 PM', entryFee:'$10',  status:'active', description:'Sacred Buddhist temple in Kandy.',                    imageUrl:'https://images.unsplash.com/photo-1580837119756-563d608dd119?w=400', facilities:'Parking,Shoe Storage,Gift Shop' },
        { id:'sl3', name:'Yala National Park',           type:'WILDLIFE',   province:'Southern Province', openingHours:'6:00 AM - 6:00 PM', entryFee:'$25',  status:'active', description:'Most visited national park, home to leopards.',      imageUrl:'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=400', facilities:'Safari Jeeps,Camping,Restaurant' },
        { id:'sl4', name:'Galle Fort',                   type:'HISTORICAL', province:'Southern Province', openingHours:'Open 24 hours',      entryFee:'Free', status:'active', description:'Historic fortification, UNESCO World Heritage Site.', imageUrl:'https://images.unsplash.com/photo-1580836719058-a4fee33c0e5a?w=400', facilities:'Cafes,Shopping,Hotels,Museum' },
        { id:'sl5', name:'Horton Plains',                type:'NATURE',     province:'Central Province',  openingHours:'6:00 AM - 6:00 PM', entryFee:'$20',  status:'active', description:"Stunning highland park with World's End cliff.",      imageUrl:'https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?w=400', facilities:'Hiking Trails,Restrooms,Parking' },
        { id:'sl6', name:'Mirissa Beach',                type:'BEACH',      province:'Southern Province', openingHours:'Open 24 hours',      entryFee:'Free', status:'active', description:'Beautiful crescent beach for surfing and swimming.',  imageUrl:'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400', facilities:'Beach Bars,Water Sports,Restaurants' },
        { id:'sl7', name:'Dambulla Cave Temple',         type:'RELIGIOUS',  province:'Central Province',  openingHours:'7:00 AM - 7:00 PM', entryFee:'$10',  status:'active', description:'Cave temple with 150+ Buddha statues.',              imageUrl:'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400', facilities:'Parking,Guide Services,Gift Shop' },
        { id:'sl8', name:'Nine Arch Bridge Ella',        type:'HISTORICAL', province:'Uva Province',      openingHours:'Open 24 hours',      entryFee:'Free', status:'active', description:'Iconic railway bridge surrounded by tea plantations.', imageUrl:'https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?w=400', facilities:'Viewing Points,Photography' },
    ];

    function getLocations() {
        const admin = get('ceylon_locations').filter(l => l.status === 'active').map(l => ({
            id: l.id, name: l.name, type: 'HISTORICAL',
            province: l.province || '', openingHours: l.hours || 'Open Daily',
            entryFee: l.fee ? '$' + l.fee : 'Free',
            status: l.status, description: l.description || '',
            imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400',
            facilities: '',
        }));
        const names = admin.map(l => (l.name || '').toLowerCase());
        const samples = sampleLocations.filter(s => !names.includes((s.name || '').toLowerCase()));
        return [...admin, ...samples];
    }

    // ── EMERGENCY ─────────────────────────────────
    function getEmergency(typeFilter) {
        const admin = get('ceylon_emergency').filter(e => e.status === 'active');
        if (typeFilter) return admin.filter(e => e.type === typeFilter);
        return admin;
    }

    return { getHotels, getVehicles, getGuides, getActivities, getLocations, getEmergency };
})();