const fetchButton = document.getElementById('fetch-joke-btn');
const jokeSetupElement = document.getElementById('joke-setup');
const jokePunchlineElement = document.getElementById('joke-punchline');
const loadingMessage = document.getElementById('loading-message');
const errorMessage = document.getElementById('error-message');

// Use a free Joke API (no key required)
const API_URL = 'https://official-joke-api.appspot.com/random_joke';
// Alternative: https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=twopart

async function fetchJoke() {
    // Reset UI state
    loadingMessage.classList.remove('hidden');
    errorMessage.classList.add('hidden');
    jokeSetupElement.textContent = '';
    jokePunchlineElement.textContent = '';
    jokePunchlineElement.classList.add('hidden'); // Hide punchline initially
    fetchButton.disabled = true; // Disable button during fetch

    try {
        const response = await fetch(API_URL);

        // Check if the response was successful (status code 200-299)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`); // Throw error for bad responses
        }

        const data = await response.json(); // Parse the JSON response body

        // Display the joke data
        jokeSetupElement.textContent = data.setup;

        // Show punchline after a short delay (optional, for effect)
        setTimeout(() => {
             jokePunchlineElement.textContent = data.punchline;
             jokePunchlineElement.classList.remove('hidden');
        }, 1500); // 1.5 second delay

    } catch (error) {
        console.error("Failed to fetch joke:", error);
        // Display user-friendly error message
        errorMessage.textContent = `Failed to load joke. ${error.message}. Please try again.`;
        errorMessage.classList.remove('hidden');
        jokeSetupElement.textContent = ''; // Clear any potential partial text

    } finally {
        // This block always runs, regardless of success or error
        loadingMessage.classList.add('hidden');
        fetchButton.disabled = false; // Re-enable button
    }
}

// Add event listener to the button
fetchButton.addEventListener('click', fetchJoke);

// Fetch a joke when the page loads initially (optional)
// fetchJoke();