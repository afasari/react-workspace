import { Link } from "react-router";
import type { Pokemon } from "../../types/pokemon";

const typeColors = {
  normal: 'from-gray-400 to-gray-500',
  fire: 'from-orange-400 to-orange-600',
  water: 'from-blue-400 to-blue-600',
  grass: 'from-green-400 to-green-600',
  electric: 'from-yellow-300 to-yellow-500',
  ice: 'from-cyan-300 to-cyan-500',
  fighting: 'from-red-400 to-red-600',
  poison: 'from-purple-400 to-purple-600',
  ground: 'from-amber-400 to-amber-600',
  flying: 'from-indigo-300 to-indigo-500',
  psychic: 'from-pink-400 to-pink-600',
  bug: 'from-lime-400 to-lime-600',
  rock: 'from-stone-400 to-stone-600',
  ghost: 'from-violet-400 to-violet-600',
  dark: 'from-gray-600 to-gray-800',
  dragon: 'from-indigo-500 to-indigo-700',
  steel: 'from-slate-400 to-slate-600',
  fairy: 'from-pink-300 to-pink-500',
};

export function PokemonCard({ pokemon }: { pokemon: Pokemon }) {
  const mainType = pokemon.types[0].type.name;
  const gradientClass = typeColors[mainType as keyof typeof typeColors];

  return (
    <Link to={`/pokemon/${pokemon.id}`}>
      <div className={`relative rounded-2xl p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl bg-gradient-to-br ${gradientClass}`}>
        <span className="absolute top-3 right-3 text-lg font-bold text-white/70">
          #{String(pokemon.id).padStart(3, '0')}
        </span>
        <div className="relative aspect-square mb-4">
          <img
            src={pokemon.sprites.other['official-artwork'].front_default}
            alt={pokemon.name}
            className="w-full h-full object-contain drop-shadow-lg"
            loading="lazy"
          />
        </div>
        <div className="text-center">
          <h2 className="text-xl font-bold capitalize mb-2 text-white">
            {pokemon.name}
          </h2>
          <div className="flex gap-2 justify-center flex-wrap">
            {pokemon.types.map((type) => (
              <span
                key={type.type.name}
                className="px-3 py-1 rounded-full bg-white/20 text-white text-sm font-medium capitalize backdrop-blur-sm"
              >
                {type.type.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}