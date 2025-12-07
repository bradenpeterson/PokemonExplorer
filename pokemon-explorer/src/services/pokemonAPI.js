// Gets a list of Pokémon with basic info
// Limit and offset can be adjusted for pagination
async function fetchPokemonList(limit = 151, offset = 0) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error("Failed to fetch Pokémon list:", error);
        return [];
    }
}

// Gets detailed info for a specific Pokémon by name
async function fetchPokemonDetails(name) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Failed to fetch details for Pokémon ${name}:`, error);
        return null;
    }
}

// Fetches detailed info for a batch of Pokémon
async function fetchBatchDetails(pokemonList) {
    try {
        const detailsPromises = pokemonList.map(pokemon => fetchPokemonDetails(pokemon.name));
        const detailedPokemonList = await Promise.all(detailsPromises);
        return detailedPokemonList.filter(Boolean);
    } catch (error) {
        console.error("Failed to fetch batch Pokémon details:", error);
        return [];
    }
}

export { fetchPokemonList, fetchPokemonDetails, fetchBatchDetails };