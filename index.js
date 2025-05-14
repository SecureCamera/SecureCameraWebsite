// Function to determine how many cards to show based on screen width
function getCardsToShow() {
    if (window.innerWidth <= 480) {
        return 1; // Mobile: show 1 card
    } else if (window.innerWidth <= 768) {
        return 2; // Tablet: show 2 cards
    } else {
        return 3; // Desktop: show 3 cards
    }
}

// Variables to track current state
let cardsToShow = getCardsToShow(); // Get initial number of cards to show
let displayedIndices = []; // Will be initialized based on cardsToShow
let previousIndex = -1; // Will be initialized based on cardsToShow
let previousCardChanged = -1;

// Initialize the arrays based on cardsToShow
function initializeArrays() {
    displayedIndices = [];
    previousIndex = 0;
    previousCardChanged = 0;

    // Fill displayedIndices with initial article indices
    for (let i = 0; i < cardsToShow; i++) {
        displayedIndices.push(i < newsData.length ? i : 0);
    }
}

// Function to generate news cards
function generateNewsCards() {
    const newsGrid = document.querySelector('.news-grid');

    // Clear any existing content
    newsGrid.innerHTML = '';

    // Generate cards for each displayed index
    for (let i = 0; i < cardsToShow; i++) {
        const newsIndex = displayedIndices[i];
        const news = newsData[newsIndex];

        // Create the card using the helper function
        const card = createNewsCard(news);

        // Add to grid
        newsGrid.appendChild(card);

        // Trigger fade-in animation after a small delay
        setTimeout(() => {
            card.style.transition = 'opacity 0.8s ease-in-out';
            card.style.opacity = '1';
        }, 50 * i); // Stagger the fade-in slightly
    }
}

// Function to handle window resize
function handleResize() {
    const newCardsToShow = getCardsToShow();

    // Only update if the number of cards to show has changed
    if (newCardsToShow !== cardsToShow) {
        cardsToShow = newCardsToShow;
        initializeArrays();
        generateNewsCards();
    }
}

// Function to cycle to the next set of news cards
function cycleNewsCards() {
    // Select a random position to swap out (0, 1, or 2)
    let positionToSwap = -1
    if(cardsToShow > 1) {
        do {
            positionToSwap = Math.floor(Math.random() * cardsToShow);
        } while (positionToSwap === previousCardChanged);
    } else {
        positionToSwap = 0;
    }


    // Get all the current cards
    const cards = document.querySelectorAll('.news-card');

    // Fade out only the selected card
    cards[positionToSwap].style.transition = 'opacity 0.8s ease-in-out';
    cards[positionToSwap].style.opacity = '0';

    // After fade out is complete, update the displayed indices and regenerate the card
    setTimeout(() => {
        // Store the current article index as the previous index before swapping
        const currentIndex = displayedIndices[positionToSwap];
        previousIndex = currentIndex;

        // Find a new article index that's not currently displayed, not the one just removed,
        // and not the one that was previously displayed in this position
        let newArticleIndex;
        do {
            newArticleIndex = Math.floor(Math.random() * newsData.length);
        } while (
            displayedIndices.includes(newArticleIndex) || // Not already displayed
            newArticleIndex === currentIndex || // Not the one just removed
            newArticleIndex === previousIndex // Not the one previously displayed in this position
        );

        // Update the displayed indices array
        displayedIndices[positionToSwap] = newArticleIndex;
        previousCardChanged = positionToSwap;

        // Create the new card
        const news = newsData[newArticleIndex];
        const card = createNewsCard(news);

        // Replace the old card with the new one
        const newsGrid = document.querySelector('.news-grid');
        newsGrid.replaceChild(card, cards[positionToSwap]);

        // Fade in the new card
        setTimeout(() => {
            card.style.transition = 'opacity 0.8s ease-in-out';
            card.style.opacity = '1';
        }, 50);
    }, 900); // Wait for fade-out to complete
}

// Helper function to create a news card
function createNewsCard(news) {
    const card = document.createElement('a');
    card.href = news.link;
    card.className = 'news-card';
    card.style.opacity = '0'; // Start with opacity 0 for fade-in effect

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

    return card;
}

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize arrays based on current screen size
    initializeArrays();

    // Generate initial news cards
    generateNewsCards();

    // Set up automatic cycling every 3-5 seconds with randomness
    setInterval(cycleNewsCards, 3000 + Math.random() * 2000);

    // Add window resize event listener
    window.addEventListener('resize', handleResize);
});
