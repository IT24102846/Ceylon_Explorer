/**
 * navbar-fix.js
 * ─────────────────────────────────────────────────────────
 * Included in ALL pages to enforce 100% exact styling & layout.
 */

(function () {
    // ── 1. Inject Global CSS Fixes ───────────────────────
    const style = document.createElement('style');
    style.textContent = `
        /* Force modern font everywhere */
        body, input, textarea, select, button {
            font-family: 'Outfit', -apple-system, sans-serif !important;
        }

        /* Navbar container */
        .navbar {
            background: #FFFFFF !important;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1) !important;
            position: sticky !important;
            top: 0 !important;
            z-index: 2000 !important;
            padding: 0 !important;
            width: 100% !important;
        }

        .nav-container {
            max-width: 1400px !important;
            margin: 0 auto !important;
            padding: 0 2rem !important;
            height: 64px !important;
            display: flex !important;
            justify-content: space-between !important;
            align-items: center !important;
        }

        /* Logo — always orange */
        .logo, .logo span {
            color: #FF6B35 !important;
            font-size: 1.4rem !important;
            font-weight: bold !important;
            text-decoration: none !important;
            display: flex !important;
            align-items: center !important;
            flex-shrink: 0 !important;
        }
        .logo i { color: #FF6B35 !important; margin-right: 8px !important; font-size: 1.6rem !important; }

        /* Nav menu — exact layout */
        .nav-menu {
            display: flex !important;
            list-style: none !important;
            gap: 2px !important;
            align-items: center !important;
            margin: 0 !important;
            padding: 0 !important;
            flex-wrap: nowrap !important;
            background: #FFFFFF !important;
        }

        /* Nav links */
        .nav-link {
            text-decoration: none !important;
            color: #2C3E50 !important;
            font-weight: 500 !important;
            font-size: 13.5px !important;
            padding: 8px 10px !important;
            border-radius: 6px !important;
            white-space: nowrap !important;
            display: inline-block !important;
            transition: color 0.2s, background 0.2s !important;
            background: transparent !important;
            border: none !important;
        }
        .nav-link:hover, .nav-link.active {
            color: #FF6B35 !important;
            background: rgba(255,107,53,0.07) !important;
        }

        /* Special login btn */
        .nav-login-btn {
            color: #FF6B35 !important;
            border: 2px solid #FF6B35 !important;
            padding: 6px 14px !important;
            border-radius: 25px !important;
            font-weight: 600 !important;
            margin-left: 6px !important;
        }
        .nav-login-btn:hover { background: #FF6B35 !important; color: #fff !important; }

        /* Special signup btn */
        .nav-signup-btn {
            background: #FF6B35 !important;
            color: #fff !important;
            border: 2px solid #FF6B35 !important;
            padding: 6px 14px !important;
            border-radius: 25px !important;
            font-weight: 600 !important;
            margin-left: 4px !important;
        }
        .nav-signup-btn:hover { background: #E55A2A !important; border-color: #E55A2A !important; }

        /* Custom User Button Layout from Image */
        .custom-user-chip {
            display: flex !important;
            align-items: center !important;
            background: rgba(255, 107, 53, 0.1) !important;
            border: 1px solid #FFCDB5 !important;
            border-radius: 25px !important;
            padding: 4px 14px 4px 4px !important;
            cursor: pointer !important;
            transition: all 0.2s !important;
            margin-left: 8px !important;
            gap: 8px !important;
        }
        .custom-user-chip:hover {
            background: rgba(255, 107, 53, 0.15) !important;
            border-color: #FF6B35 !important;
        }
        .custom-user-chip .nav-avatar {
            width: 28px !important;
            height: 28px !important;
            background: #FF6B35 !important;
            color: #FFFFFF !important;
            border-radius: 50% !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            font-size: 13px !important;
            font-weight: bold !important;
        }
        .custom-user-chip .nav-name {
            color: #2C3E50 !important;
            font-size: 13.5px !important;
            font-weight: 600 !important;
        }
        .custom-user-chip i {
            color: #2C3E50 !important;
            font-size: 11px !important;
        }

        .nav-dropdown {
            position: absolute !important;
            top: 100% !important;
            right: 0 !important;
            background: #fff !important;
            border: 1px solid rgba(0,0,0,0.1) !important;
            border-radius: 10px !important;
            box-shadow: 0 5px 20px rgba(0,0,0,0.15) !important;
            min-width: 170px !important;
            padding: 6px !important;
            display: none;
            z-index: 2000 !important;
            margin-top: 10px !important;
        }
        .nav-dropdown.open { display: block !important; }
        .nav-dropdown a {
            display: flex !important;
            align-items: center !important;
            gap: 8px !important;
            padding: 9px 12px !important;
            color: #2C3E50 !important;
            text-decoration: none !important;
            font-size: 13px !important;
            border-radius: 7px !important;
        }
        .nav-dropdown a:hover {
            background: rgba(255, 107, 53, 0.08) !important;
            color: #FF6B35 !important;
        }

        /* Hamburger button */
        .ce-hamburger {
            display: none;
            flex-direction: column;
            cursor: pointer;
            gap: 5px;
            padding: 4px;
            background: none !important;
            border: none !important;
            margin-left: 10px;
        }
        .ce-hamburger span {
            display: block !important;
            width: 24px !important;
            height: 2px !important;
            background: #2C3E50 !important;
            border-radius: 2px !important;
            transition: 0.3s !important;
        }
        .ce-hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .ce-hamburger.open span:nth-child(2) { opacity: 0; }
        .ce-hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

        @media (max-width: 1050px) {
            .ce-hamburger { display: flex !important; }
            .nav-menu {
                position: fixed !important;
                top: 64px !important;
                left: 0 !important;
                right: 0 !important;
                flex-direction: column !important;
                align-items: stretch !important;
                padding: 12px 16px 20px !important;
                box-shadow: 0 5px 20px rgba(0,0,0,0.15) !important;
                gap: 2px !important;
                transform: translateY(-110%) !important;
                transition: transform 0.3s ease !important;
                z-index: 999 !important;
            }
            .nav-menu.ce-open { transform: translateY(0) !important; }
            .nav-link { font-size: 14px !important; padding: 11px 14px !important; }
        }
    `;
    document.head.appendChild(style);

    // ── 2. Add Google Font dynamically ───────────────────
    if (!document.querySelector('link[href*="Outfit"]')) {
        const fontLink = document.createElement('link');
        fontLink.href = "https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap";
        fontLink.rel = "stylesheet";
        document.head.appendChild(fontLink);
    }

    // ── 3. Wait for DOM and overwrite navbar ─────────────
    function init() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;

        let navMenu = navbar.querySelector('.nav-menu') || navbar.querySelector('#navMenu');
        
        // Exact structure requested by user
        if (navMenu) {
            navMenu.id = 'navMenu';
            navMenu.innerHTML = `
                <li><a href="index.html" class="nav-link">Home</a></li>
                <li><a href="hotel-complete.html" class="nav-link">Hotels</a></li>
                <li><a href="vehicle-complete.html" class="nav-link">Vehicles</a></li>
                <li><a href="tourguide-complete.html" class="nav-link">Tour Guides</a></li>
                <li><a href="activity-complete.html" class="nav-link">Activities</a></li>
                <li><a href="touristlocation-complete.html" class="nav-link">Locations</a></li>
                <li><a href="itinerary.html" class="nav-link">Itinerary</a></li>
                <li><a href="culture.html" class="nav-link">Culture&Calendar</a></li>
                <li><a href="emergency-healthcare.html" class="nav-link">Emergency</a></li>

                <li id="navLoginLi"><a href="login-complete.html" class="nav-link nav-login-btn">Login</a></li>
                <li id="navSignupLi"><a href="signup-complete.html" class="nav-link nav-signup-btn">Sign Up</a></li>

                <li id="navUserLi" style="display:none; position:relative;">
                    <div class="custom-user-chip" id="userMenuBtn" onclick="document.getElementById('userDropdown').classList.toggle('open')">
                        <div class="nav-avatar" id="navUserAvatar">U</div>
                        <span class="nav-name" id="navUserName">User</span>
                        <i class="fas fa-chevron-down"></i>
                    </div>
                    <div class="nav-dropdown" id="userDropdown">
                        <a href="user-dashboard.html" id="dashboardLink"><i class="fas fa-th-large"></i> Dashboard</a>
                        <a href="#" onclick="window.logoutUser?logoutUser():localLogout()"><i class="fas fa-sign-out-alt"></i> Logout</a>
                    </div>
                </li>
            `;
        }

        // Set active link
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            const href = (link.getAttribute('href') || '').split('/').pop();
            if (href === currentPage) link.classList.add('active');
            else link.classList.remove('active');
        });

        // Hamburger logic
        const navContainer = navbar.querySelector('.nav-container');
        if (navContainer && !document.querySelector('.ce-hamburger')) {
            const ham = document.createElement('button');
            ham.className = 'ce-hamburger';
            ham.innerHTML = '<span></span><span></span><span></span>';
            ham.addEventListener('click', () => {
                ham.classList.toggle('open');
                navMenu.classList.toggle('ce-open');
            });
            navContainer.appendChild(ham);
        }

        const oldHam = document.getElementById('hamburger');
        if (oldHam) oldHam.style.display = 'none';

        // Fix Auth State right now immediately before script.js!
        checkNavbarAuthState();
    }

    function checkNavbarAuthState() {
        let user = null;
        try { user = JSON.parse(localStorage.getItem('ceylon_current_user')); } catch {}

        const loginLi = document.getElementById('navLoginLi');
        const signupLi = document.getElementById('navSignupLi');
        const userLi = document.getElementById('navUserLi');

        if (!loginLi) return;

        if (user) {
            loginLi.style.setProperty('display', 'none', 'important');
            signupLi.style.setProperty('display', 'none', 'important');
            userLi.style.setProperty('display', 'list-item', 'important');

            const nameEl = document.getElementById('navUserName');
            const avatarEl = document.getElementById('navUserAvatar');
            const dashLink = document.getElementById('dashboardLink');

            if (nameEl) nameEl.textContent = user.name ? user.name.split(' ')[0].toUpperCase() : 'USER';
            if (avatarEl) avatarEl.textContent = (user.name || 'U')[0].toUpperCase();
            if (dashLink) dashLink.href = user.role === 'admin' ? 'admin-dashboard.html' : 'user-dashboard.html';
        } else {
            loginLi.style.setProperty('display', 'list-item', 'important');
            signupLi.style.setProperty('display', 'list-item', 'important');
            userLi.style.setProperty('display', 'none', 'important');
        }
    }

    window.localLogout = function() {
        localStorage.removeItem('ceylon_current_user');
        window.location.href = 'login-complete.html';
    };

    // Close user dropdown if clicking outside
    document.addEventListener('click', function (e) {
        const btn = document.getElementById('userMenuBtn');
        const dd  = document.getElementById('userDropdown');
        if (dd && btn && !btn.contains(e.target) && !dd.contains(e.target)) {
            dd.classList.remove('open');
        }
    });

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();