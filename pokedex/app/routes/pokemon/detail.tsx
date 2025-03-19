import { useLoaderData, Link } from "react-router-dom";
import type { LoaderFunctionArgs } from "react-router-dom";
import { PokemonDetail } from "../../components/pokemon/PokemonDetail";
import type { PokemonDetailed } from "../../types/pokemon";

export async function loader({ params }: LoaderFunctionArgs) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.id}`);
  if (!response.ok) {
    throw new Error('Pokemon not found');
  }
  return { pokemon: await response.json() };
}

export default function Detail() {
  const { pokemon } = useLoaderData() as { pokemon: PokemonDetailed };

  return (
    <div>
      <Link 
        to="/pokemon"
        className="inline-flex items-center px-4 py-2 rounded-lg bg-black/20 text-white font-medium hover:bg-black/30 transition-all duration-200 mb-6 group shadow-lg"
      >
        <svg className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to List
      </Link>
      <PokemonDetail pokemon={pokemon} />
    </div>
  );
}