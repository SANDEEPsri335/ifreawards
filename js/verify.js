// ============================================================
// IFRE CERTIFICATE VERIFICATION
// Loads certificatehtml/<NUMBER>.html in a NEW tab
// Folder name must match your actual folder (yours: certificatehtml)
// ============================================================

(function () {
    'use strict';

    // 👇 MUST match your actual folder name (yours is singular: certificatehtml)
    const CERT_FOLDER = 'certificatehtml/';

    const form   = document.getElementById('verifyForm');
    const input  = document.getElementById('certNumber');
    const result = document.getElementById('result');

    if (!form || !input || !result) return;

    // ---------- Helpers ----------
    const escapeHtml = (s) => String(s)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');

    function show(html, cls) {
        result.innerHTML = html;
        result.className = cls || '';
    }

    // ---------- Auto uppercase while typing ----------
    input.addEventListener('input', () => {
        const p = input.selectionStart;
        input.value = input.value.toUpperCase();
        input.setSelectionRange(p, p);
    });

    // ---------- Submit ----------
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const raw = input.value.trim().toUpperCase();
        result.innerHTML = '';
        result.className = '';

        // ---- Validation ----
        if (!raw) {
            show('<p class="error-msg">⚠️ Please enter a certificate number.</p>');
            input.focus();
            return;
        }
        if (!/^[A-Z0-9_-]+$/.test(raw)) {
            show('<p class="error-msg">⚠️ Invalid format. Use only letters, numbers, dashes, or underscores.</p>');
            return;
        }

        const certPath = CERT_FOLDER + raw + '.html';

        // ---- CRITICAL: open the tab SYNCHRONOUSLY so popup blocker allows it ----
        // NOTE: do NOT pass 'noopener' here — otherwise newTab is null and we
        // cannot navigate it, which leaves the user with a blank tab.
        const newTab = window.open('about:blank', '_blank');

        // Show loading state
        show('<p class="loading-msg">🔎 Verifying…</p>');

        // ---- Check if the file exists ----
        fetch(certPath, { method: 'HEAD', cache: 'no-store' })
            .then((res) => {
                if (res.ok) {
                    // ✅ Found
                    show(
                        '<p class="success-msg">✅ Certificate verified successfully!</p>' +
                        '<a href="' + certPath + '" target="_blank" rel="noopener" class="btn" ' +
                            'style="margin-top:10px;display:inline-block;">' +
                            '📄 Open Certificate' +
                        '</a>' +
                        '<p class="open-note">If the certificate didn\'t open automatically, click the button above.</p>',
                        'verify-result success'
                    );

                    // Send the pre-opened tab to the certificate
                    if (newTab && !newTab.closed) {
                        newTab.location.href = certPath;
                    } else {
                        // Popup was blocked → navigate the current tab
                        window.location.href = certPath;
                    }
                } else {
                    // ❌ Not found — close the blank tab
                    if (newTab && !newTab.closed) newTab.close();
                    show(
                        '<p class="error-msg">❌ Certificate not found. Please check the number and try again.</p>' +
                        '<p class="open-note">Certificate ID you entered: <strong>' +
                            escapeHtml(raw) +
                        '</strong></p>',
                        'verify-result error'
                    );
                }
            })
            .catch(() => {
                // file:// fallback — just navigate the blank tab
                if (newTab && !newTab.closed) {
                    newTab.location.href = certPath;
                    show('<p class="loading-msg">📄 Opening certificate…</p>');
                } else {
                    show(
                        '<p class="error-msg">⚠️ Could not verify automatically. ' +
                        'Try opening the certificate manually:</p>' +
                        '<a href="' + certPath + '" target="_blank" rel="noopener" class="btn" ' +
                            'style="margin-top:10px;display:inline-block;">' +
                            '📄 Try to Open Certificate' +
                        '</a>',
                        'verify-result error'
                    );
                }
            });
    });
})();