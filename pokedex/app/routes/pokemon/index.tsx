import { useLoaderData } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { PokemonCard } from "../../components/pokemon/PokemonCard";
import type { Pokemon } from "../../types/pokemon";

async function fetchWithRetry(url: string, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
}

export async function loader() {
  try {
    const data = await fetchWithRetry('https://pokeapi.co/api/v2/pokemon?limit=20');
    const pokemonUrls = data.results.map((pokemon: { url: string }) => pokemon.url);
    const pokemonDetails = await Promise.all(
      pokemonUrls.map(url => fetchWithRetry(url).catch(() => null))
    );
    const validPokemon = pokemonDetails.filter((pokemon): pokemon is Pokemon => pokemon !== null);
    
    return { 
      pokemon: validPokemon,
      nextOffset: 20,
      total: 151 
    };
  } catch (error) {
    console.error('Error fetching Pokemon list:', error);
    throw new Error('Failed to load Pokemon list. Please try again later.');
  }
}

export default function PokemonList() {
  const { pokemon: initialPokemon, nextOffset, total } = useLoaderData() as { 
    pokemon: Pokemon[], 
    nextOffset: number,
    total: number 
  };
  const [pokemon, setPokemon] = useState(initialPokemon);
  const [offset, setOffset] = useState(nextOffset);
  const [loading, setLoading] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      async (entries) => {
        const target = entries[0];
        if (target.isIntersecting && !loading && offset < total) {
          setLoading(true);
          try {
            const data = await fetchWithRetry(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`);
            const newPokemonDetails = await Promise.all(
              data.results.map((p: { url: string }) => fetchWithRetry(p.url).catch(() => null))
            );
            const validNewPokemon = newPokemonDetails.filter((p): p is Pokemon => p !== null);
            setPokemon(prev => [...prev, ...validNewPokemon]);
            setOffset(prev => prev + 20);
          } catch (error) {
            console.error('Error loading more Pokemon:', error);
          } finally {
            setLoading(false);
          }
        }
      },
      { threshold: 0.1 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [offset, loading]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6 bg-black/20 p-4 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-white">Generation I</h2>
        <span className="text-white bg-black/20 px-3 py-1 rounded-full text-sm">
          {pokemon.length} / {total} Pokémon
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {pokemon.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
      {offset < total && (
        <div 
          ref={loaderRef} 
          className="mt-8 p-4 text-center"
        >
          {loading ? (
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-white/20 border-t-white"/>
          ) : (
            <div className="h-8" />
          )}
        </div>
      )}
    </div>
  );
}