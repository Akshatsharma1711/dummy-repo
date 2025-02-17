// Function to fetch JSON data from a given URL
async function fetchJsonData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching JSON data:", error);
    }
}

// Function to pick a random 'raw' URL from the 'results' array
function pickRandomUrl(data) {
    if (!data || !data.results || data.results.length === 0) {
        console.error("Invalid data structure or empty results array.");
        return null;
    }

    const randomIndex = Math.floor(Math.random() * data.results.length);
    const randomResult = data.results[randomIndex];
    const rawUrl = randomResult.urls.raw;
    return rawUrl;
}

// Function to fetch and display a random image based on search term
async function fetchAndDisplayRandomImage() {
    const search = document.getElementById('searchBox').value;
    const jsonUrl = `https://api.unsplash.com/search/photos?page=1&query=${search}&client_id=IEiBJyASM4wNrVzRziqnePqyxepNhIbHGiBY47CH6G4`; // Replace with the actual URL of your JSON data

    const jsonData = await fetchJsonData(jsonUrl);
    const randomRawUrl = pickRandomUrl(jsonData);
    if (randomRawUrl) {
        document.getElementById('random_image').src = randomRawUrl;
        console.log("Random Raw URL:", randomRawUrl);
    } else {
        console.log("Failed to pick a random URL.");
    }
}
