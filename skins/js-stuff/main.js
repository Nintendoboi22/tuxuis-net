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

document.addEventListener('DOMContentLoaded', () => {
    const searchBar = document.getElementById('search-bar');

    if (!searchBar) {
        console.error('Search bar not found in the DOM.');
    }
});
