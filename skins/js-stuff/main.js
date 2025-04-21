fetch('skin.json')
    .then(response => response.json())
    .then(data => {
        const updatedSkins = data.skins.map(skin => {
            if (skin.bulletvfx === undefined) {
                skin.bulletvfx = false;
            }
            return skin;
        });

        console.log(updatedSkins);
    })
    .catch(error => console.error('Error updating skin data:', error));
    
const searchBar = document.getElementById('search-bar');
        const searchButton = document.getElementById('search-button');

        function handleSearch() {
            const query = searchBar.value.trim();
            if (query) {
                console.log(`Searching for: ${query}`);
            }
        }

        searchButton.addEventListener('click', handleSearch);