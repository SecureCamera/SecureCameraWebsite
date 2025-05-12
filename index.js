// News data array
const newsData = [
    {
        title: "Border Control Denies Entry Over Deleted Photos",
        description: "A Brown University doctor was denied entry to the U.S. because of photos that had been deleted from her phone but were still recoverable.",
        link: "https://www.cbsnews.com/boston/news/brown-university-rasha-alawieh-denied-entry-us-hezbollah/",
        logo_image: "images/news_logo_cbs.png",
        header_image: "images/news_header_cbs.png"
    },
    {
        title: "Apple's \"Deleted\" Photos Persist for Years",
        description: "A bug in iOS revealed that photos users thought were deleted years ago were still stored on their devices, accessible through a glitch.",
        link: "https://www.theverge.com/2024/5/20/24160983/apple-iphone-ipad-deleted-photo-reappear-bug-ios-17-5-1",
        logo_image: "images/news_logo_verge.png",
        header_image: "images/news_verge_header.webp"
    },
    {
        title: "Google Account Termination Over Medical Photos",
        description: "Google refuses to reinstate man's account after he took medical images of son's groin",
        link: "https://www.theguardian.com/technology/2022/aug/22/google-csam-account-blocked",
        logo_image: "images/news_logo_guardian.png",
        header_image: "images/news_header_guardian.avif"
    }
];

// Function to generate news cards
function generateNewsCards() {
    const newsGrid = document.querySelector('.news-grid');

    // Clear any existing content
    newsGrid.innerHTML = '';

    // Generate cards from data
    newsData.forEach(news => {
        const card = document.createElement('a');
        card.href = news.link;
        card.className = 'news-card';

        // Create header
        const header = document.createElement('div');
        header.className = 'news-header';

        // Set background image or color
        if (news.header_image) {
            header.style.backgroundImage = `url('${news.header_image}')`;
        } else {
            header.style.backgroundColor = '#f5f5f5'; // Default background for cards without header image
        }

        // Create logo
        const logo = document.createElement('div');
        logo.className = 'news-logo';

        const logoImg = document.createElement('img');
        logoImg.src = news.logo_image;
        logoImg.alt = `${news.title} Logo`;

        logo.appendChild(logoImg);
        header.appendChild(logo);

        // Create content
        const content = document.createElement('div');
        content.className = 'news-content';

        const title = document.createElement('h3');
        title.textContent = news.title;

        const description = document.createElement('p');
        description.textContent = news.description;

        content.appendChild(title);
        content.appendChild(description);

        // Assemble card
        card.appendChild(header);
        card.appendChild(content);

        // Add to grid
        newsGrid.appendChild(card);
    });
}

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', generateNewsCards);
