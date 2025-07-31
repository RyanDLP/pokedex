const pokemonList = document.getElementById("pokemon-list");

async function getPokemon(limit = 20) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
    const data = await response.json();

    const pokemonDetailsPromises = data.results.map(async (pokemon) => {
      const res = await fetch(pokemon.url);
      const details = await res.json();

      const card = document.createElement("div");
      card.classList.add("pokemon-card");
      card.innerHTML = `
        <h3>${details.name}</h3>
        <h3>#${details.order}</h3>
        <img src="${details.sprites.front_default}" alt="${details.name}" />
      `;
      return { card, order: details.order };
    });


    const pkms = await Promise.all(pokemonDetailsPromises);


    const orderedPokemons = pkms.sort((a, b) => a.order - b.order);
    console.log({ orderedPokemons });


    orderedPokemons.forEach((pokemon) => {
      pokemonList.appendChild(pokemon.card);
    });

  } catch (error) {
    console.error("Erro ao buscar os pokémons:", error);
  }
}

getPokemon();
