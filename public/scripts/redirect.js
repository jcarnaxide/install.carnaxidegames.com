// Redirect Logic: Detect platform and redirect to the appropriate store
function detectPlatform() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    if (/android/i.test(userAgent)) {
        return "android";
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return "ios";
    } else {
        return "web";
    }
}

function redirectToPlatform(gameLinks) {
    const platform = detectPlatform();
    const redirectUrl = gameLinks[platform] || gameLinks["web"];

    if (redirectUrl) {
        window.location.href = redirectUrl;
    } else {
        console.error("No redirect URL defined for this platform.");
    }
}
