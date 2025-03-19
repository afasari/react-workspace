import type { PokemonDetailed } from "../../types/pokemon";

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

export function PokemonDetail({ pokemon }: { pokemon: PokemonDetailed }) {
  const mainType = pokemon.types[0].type.name;
  const gradientClass = typeColors[mainType as keyof typeof typeColors];

  return (
    <div className={`rounded-2xl shadow-xl overflow-hidden bg-gradient-to-br ${gradientClass}`}>
      <div className="p-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/2">
            <div className="relative aspect-square bg-white/20 rounded-xl p-4 backdrop-blur-sm">
              <img
                src={pokemon.sprites.other['official-artwork'].front_default}
                alt={pokemon.name}
                className="w-full h-full object-contain drop-shadow-lg animate-float"
              />
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-4xl font-bold capitalize text-white">
                  {pokemon.name}
                </h1>
                <span className="text-2xl font-bold text-white/70">
                  #{String(pokemon.id).padStart(3, '0')}
                </span>
              </div>

              <div className="flex gap-2 mb-8">
                {pokemon.types.map((type) => (
                  <span
                    key={type.type.name}
                    className="px-4 py-1 rounded-full bg-white/30 text-white text-sm font-medium capitalize"
                  >
                    {type.type.name}
                  </span>
                ))}
              </div>

              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-semibold mb-4 text-white">Base Stats</h2>
                  {pokemon.stats.map((stat) => (
                    <div key={stat.stat.name} className="mb-3">
                      <div className="flex justify-between mb-1">
                        <span className="capitalize text-white/80">
                          {stat.stat.name.replace('-', ' ')}
                        </span>
                        <span className="text-white font-medium">
                          {stat.base_stat}
                        </span>
                      </div>
                      <div className="h-2 bg-black/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-white/70 rounded-full transition-all duration-1000"
                          style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-white/10 rounded-lg p-4">
                    <h3 className="text-sm text-white/70 mb-1">Height</h3>
                    <p className="text-2xl font-medium text-white">
                      {(pokemon.height / 10).toFixed(1)}m
                    </p>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4">
                    <h3 className="text-sm text-white/70 mb-1">Weight</h3>
                    <p className="text-2xl font-medium text-white">
                      {(pokemon.weight / 10).toFixed(1)}kg
                    </p>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-4 text-white">Abilities</h2>
                  <div className="flex gap-2 flex-wrap">
                    {pokemon.abilities.map((ability) => (
                      <span
                        key={ability.ability.name}
                        className="px-4 py-2 bg-white/10 rounded-lg text-white text-sm capitalize"
                      >
                        {ability.ability.name.replace('-', ' ')}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}