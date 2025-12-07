// Component to display individual Pokémon details in a card format
export function Card({ pokemon }) {
    return (
        <div className="pokemon-card">
            <h2>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
            <img 
                src={pokemon.sprites?.front_default || 'https://via.placeholder.com/120?text=No+Image'} 
                alt={pokemon.name} 
                width="120" 
                height="120" 
            />
            <p>ID: {pokemon.id}</p>
            <p>Type: {pokemon.types.map(typeInfo => typeInfo.type.name.charAt(0).toUpperCase() + typeInfo.type.name.slice(1)).join(', ')}</p>
            <p>Height: {pokemon.height / 10} m</p>
            <p>Weight: {pokemon.weight / 10} kg</p>
        </div>
    );
}