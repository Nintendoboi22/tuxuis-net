fetch('skin.json')
    .then(response => response.json())
    .then(data => {
        const skins = data.skins.map(skin => {
            if (skin.bulletvfx === undefined) {
                skin.bulletvfx = false;
            }
            return skin;
        });

        const searchBar = document.getElementById('search-bar');
        const autocompleteList = document.getElementById('autocomplete-list');
        const resultBox = document.createElement('div');
        resultBox.id = 'result-box';
        document.body.appendChild(resultBox);

        resultBox.style.position = 'fixed';
        resultBox.style.bottom = '20px';
        resultBox.style.left = '50%';
        resultBox.style.transform = 'translateX(-50%)';

        searchBar.addEventListener('input', () => {
            const query = searchBar.value.toLowerCase();
            autocompleteList.innerHTML = '';

            if (query) {
                const startsWithMatches = skins.filter(skin => skin.name.toLowerCase().startsWith(query));
                const containsMatches = skins.filter(skin => skin.name.toLowerCase().includes(query) && !skin.name.toLowerCase().startsWith(query));
                const matches = [...startsWithMatches, ...containsMatches];

                matches.forEach(match => {
                    const listItem = document.createElement('li');
                    listItem.textContent = match.name;
                    listItem.addEventListener('click', () => {
                        searchBar.value = match.name;
                        autocompleteList.innerHTML = '';
                        displaySkinDetails(match);

                        const searchContainer = document.querySelector('.search-container');
                        searchContainer.style.transition = 'transform 0.5s ease';
                        searchContainer.style.transform = 'translate(-100%, -50%)';
                        searchContainer.style.top = '200px';

                        resultBox.style.transition = 'transform 0.5s ease';
                        resultBox.style.transform = 'translate(100%, -50%)';
                        resultBox.style.top = '350px';
                        resultBox.style.left = 'calc(50% - 150px)';
                    });
                    autocompleteList.appendChild(listItem);
                });
            }
        });

        function displaySkinDetails(skin) {
            resultBox.innerHTML = '';
            resultBox.style.border = '1px solid #ccc';
            resultBox.style.padding = '10px';
            resultBox.style.marginTop = '20px';
            resultBox.style.backgroundColor = '#1f1f1f';
            resultBox.style.color = 'white';
            resultBox.style.borderRadius = '5px';
            resultBox.style.width = '300px';
            resultBox.style.height = '400px';
            resultBox.style.fontFamily = 'Arial, Helvetica, sans-serif';

            const rarityColors = {
                'Common': '#858886',
                'Rare': '#33a3dc',
                'Epic': '#9251c9',
                'Legendary': '#c4b934',
                'Special': '#14f461',
                'Limited': '#f54c5f'
            };

            const rarityColor = rarityColors[skin.rarity] || 'white';

            const rarityBox = document.createElement('div');
            rarityBox.style.backgroundColor = rarityColor;
            rarityBox.style.width = '100%';
            rarityBox.style.height = '20px';
            rarityBox.style.marginBottom = '10px';
            rarityBox.style.borderRadius = '5px';
            rarityBox.style.display = 'flex';
            rarityBox.style.alignItems = 'center';

            const skinDetails = `
                <h3 class="skin">${skin.name}</h3>
                <p class="skin"><strong>Average Price:</strong> ${skin.averageprice}</p>
                <p class="skin"><strong>Rarity:</strong> ${skin.rarity}</p>
                <p class="skin"><strong>How to Get:</strong> ${skin.howToGet}</p>
                <p class="skin"><strong>Tradeable:</strong> ${skin.tradeable ? 'Yes' : 'No'}</p>
                <p class="skin"><strong>Bullet VFX:</strong> ${skin.bulletvfx ? 'Yes' : 'No'}</p>
            `;

            if (!skin.image) {
                const noImageText = document.createElement('div');
                noImageText.textContent = 'No image yet';
                noImageText.style.textAlign = 'center';
                noImageText.style.fontWeight = 'bold';
                noImageText.style.marginBottom = '10px';
                resultBox.appendChild(noImageText);
            } else {
                const skinImage = document.createElement('img');
                skinImage.src = skin.image;
                skinImage.alt = `${skin.name} image`;
                skinImage.style.width = '100%';
                skinImage.style.borderRadius = '5px';
                skinImage.style.marginBottom = '10px';
                resultBox.appendChild(skinImage);
            }

            resultBox.appendChild(rarityBox);
            resultBox.innerHTML += skinDetails;
        }
    })
    .catch(error => console.error('Error fetching skin data:', error));