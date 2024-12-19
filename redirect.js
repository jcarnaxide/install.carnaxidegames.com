const baseUrl = window.location.origin; // Gets "https://username.github.io"
const gamesMetadata = {
    knight_adventure: {
        title: "Knight Adventure",
        description: "A fun and engaging platformer game developed by Carnaxide Games.",
        image: `${baseUrl}/assets/knight_adventure_icon.png`,
        urls: {
            android: "https://play.google.com/store/apps/details?id=com.carnaxide_games.knight_adventure",
            ios: "https://www.apple.com",
            // ios: "https://apps.apple.com/app/id1234567890",
            default: "https://www.carnaxidegames.com/games"
        }
    },
    puzzle: {
        title: "Carnaxide Games Puzzle Adventure",
        description: "Relax and unwind with our Nature Exploration puzzle game.",
        image: `${baseUrl}/assets/knight_adventure_icon.png`,
        urls: {
            android: "https://play.google.com/store/apps/details?id=com.carnaxide_games.knight_adventure",
            ios: "https://www.apple.com",
            default: "https://www.carnaxidegames.com/games"
        }
    }
};

function detectPlatform() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    if (/android/i.test(userAgent)) {
        return "android";
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return "ios";
    } else {
        return "default";
    }
}

function setMetaTags(metadata, platform) {
    const head = document.querySelector('head');

    // Remove any existing meta tags to avoid duplication
    const existingMetaTags = head.querySelectorAll('meta[property^="og:"]');
    existingMetaTags.forEach(tag => tag.remove());

    // Add new meta tags
    const metaTags = [
        { property: "og:title", content: metadata.title },
        { property: "og:description", content: metadata.description },
        { property: "og:image", content: metadata.image },
        { property: "og:url", content: metadata.urls[platform] || metadata.urls.default },
        { property: "og:type", content: "website" }
    ];

    metaTags.forEach(({ property, content }) => {
        const meta = document.createElement('meta');
        meta.setAttribute('property', property);
        meta.setAttribute('content', content);
        head.appendChild(meta);
    });
}

function redirectToGame(gameKey) {
    const platform = detectPlatform();
    const gameMetadata = gamesMetadata[gameKey];

    if (gameMetadata) {
        setMetaTags(gameMetadata, platform);
        setTimeout(() => {
            window.location.href = gameMetadata.urls[platform] || gameMetadata.urls.default;
        }, 1000); // Delay to ensure meta tags are parsed
    } else {
        console.error("Invalid game specified.");
        document.body.innerHTML = "Invalid game specified.";
    }
}

// Run the script
const gameKey = new URLSearchParams(window.location.search).get('game');
redirectToGame(gameKey);
