export interface Pokemon {
  id: number;
  name: string;
  sprites: {
    other: {
      'official-artwork': {
        front_default: string;
      }
    }
  };
  types: {
    type: {
      name: string;
    }
  }[];
}

export interface PokemonDetailed extends Pokemon {
  height: number;
  weight: number;
  stats: {
    base_stat: number;
    stat: {
      name: string;
    }
  }[];
  abilities: {
    ability: {
      name: string;
    }
  }[];
}