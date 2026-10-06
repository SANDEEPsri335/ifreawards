// ============================================
// IFRE COMMON HEADER + FOOTER
// ============================================

const headerHTML = `
<header class="site-header">
    <div class="header-top">

        <!-- LEFT LOGO (clickable → home) -->
        <div class="header-left">
            <a href="index.html" class="logo-link" title="Go to Home">
                <img src="assets/logo.png" alt="IFRE Logo" class="side-logo">
            </a>
        </div>

        <!-- CENTER: BRAND NAME (clickable → home) -->
        <div class="header-center">
            <a href="index.html" class="brand-link" title="Go to Home">
                <h1 class="brand-title">IFRE</h1>
                <p class="brand-subtitle">
                    <span class="hl">I</span>ndian 
                    <span class="hl">F</span>oundation for 
                    <span class="hl">R</span>esearch &amp; 
                    <span class="hl">E</span>xcellence
                </p>
            </a>
        </div>

        <!-- RIGHT IMAGE (ISO badge) -->
        <div class="header-right">
            <img src="assets/iso.png" alt="ISO Certified" class="side-logo">
        </div>

    </div>

    <!-- NAVIGATION TABS -->
    <nav class="site-nav">
        <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="about.html">About Us</a></li>
            <li><a href="awards.html">Awards</a></li>
            <li><a href="apply.html">Apply Now</a></li>
            <li><a href="benefits.html">Benefits</a></li>
            <li><a href="gallery.html">Gallery</a></li>
            <li><a href="verify.html">Verify Certificate</a></li>
            <li><a href="contact.html">Contact Us</a></li>
        </ul>
    </nav>
</header>
`;

const footerHTML = `
<footer class="site-footer">
    <div class="footer-inner">

        <div class="footer-col">
            <h4>IFRE</h4>
            <p>Indian Foundation for Research &amp; Excellence</p>
            <p class="footer-tag">Recognizing India's Finest Students, Teachers, Researchers, Scholars &amp; Academic Leaders</p>
        </div>

        <div class="footer-col">
            <h4>Contact</h4>
            <p>💬 WhatsApp: <a href="https://wa.me/919503593997" target="_blank" rel="noopener">+91 9503593997</a></p>
            <p>📧 Email: <a href="mailto:ifreceo@gmail.com">ifreceo@gmail.com</a></p>
            <p>📍 Nellore, Andhra Pradesh, India – 524305</p>
        </div>

    </div>

    <div class="footer-bottom">
        <p>© 2026 Indian Foundation for Research &amp; Excellence. All Rights Reserved.</p>
    </div>
</footer>
`;

document.addEventListener('DOMContentLoaded', function () {
    const headerMount = document.getElementById('site-header');
    const footerMount = document.getElementById('site-footer');

    if (headerMount) headerMount.innerHTML = headerHTML;
    if (footerMount) footerMount.innerHTML = footerHTML;

    // Load Google Fonts (Inter + Playfair Display)
    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&family=Inter:wght@300;400;500;600;700;800&display=swap';
    document.head.appendChild(fontLink);
});