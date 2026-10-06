// ============================================================
// IFRE CERTIFICATE VERIFICATION
// Checks certificatehtml/<NUMBER>.html and opens in a NEW tab
// ============================================================

document.getElementById('verifyForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const input = document.getElementById('certNumber');
    const result = document.getElementById('result');
    const certNum = input.value.trim().toUpperCase();

    // Clear previous result
    result.innerHTML = '';

    // ---- Validation ----
    if (!certNum) {
        result.innerHTML = '<p class="error-msg">⚠️ Please enter a certificate number.</p>';
        return;
    }

    if (!/^[A-Z0-9_-]+$/.test(certNum)) {
        result.innerHTML = '<p class="error-msg">⚠️ Invalid format. Use only letters, numbers, dashes, or underscores.</p>';
        return;
    }

    // ---- Show loading ----
    result.innerHTML = '<p class="loading-msg">🔎 Verifying...</p>';

    // ---- Build path ----
    const certPath = 'certificatehtml/' + certNum + '.html';

    // ---- Check if the certificate file exists ----
    fetch(certPath, { method: 'HEAD' })
        .then(response => {
            if (response.ok) {
                // SUCCESS
                result.innerHTML = `
                    <p class="success-msg">✅ Certificate verified successfully!</p>
                    <a href="${certPath}" target="_blank" rel="noopener" class="btn" style="margin-top:10px;">
                        📄 Open Certificate
                    </a>
                    <p class="open-note">If the certificate didn't open automatically, click the button above.</p>
                `;

                // Auto-open in NEW tab
                window.open(certPath, '_blank', 'noopener');
            } else {
                // NOT FOUND
                result.innerHTML = `
                    <p class="error-msg">❌ Certificate not found. Please check the number and try again.</p>
                    <p class="open-note">Certificate ID you entered: <strong>${certNum}</strong></p>
                `;
            }
        })
        .catch(() => {
            // Fallback (e.g., file:// protocol where HEAD may fail)
            result.innerHTML = `
                <p class="error-msg">⚠️ Could not verify automatically. Try opening the certificate manually:</p>
                <a href="${certPath}" target="_blank" rel="noopener" class="btn" style="margin-top:10px;">
                    📄 Try to Open Certificate
                </a>
            `;
        });
});