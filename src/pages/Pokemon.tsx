import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Card, CardContent } from '@/components/ui/card';

interface Pokemon {
  id: number;
  name: string;
  image_url: string;
  types: string[];
  height: number;
  weight: number;
  abilities: string[];
  stats: {
    hp: number;
    attack: number;
    defense: number;
    special_attack: number;
    special_defense: number;
    speed: number;
  };
}

export default function Pokemon() {
  const { id } = useParams<{ id: string }>();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPokemon() {
      if (!id) return;

      const { data, error } = await supabase
        .from('pokemon')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching pokemon:', error);
        return;
      }

      setPokemon(data);
      setLoading(false);
    }

    fetchPokemon();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!pokemon) {
    return <div>Pokémon not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <img
                src={pokemon.image_url}
                alt={pokemon.name}
                className="w-full h-auto"
              />
            </div>
            <div>
              <h1 className="text-4xl font-bold capitalize mb-4">{pokemon.name}</h1>
              
              <div className="flex gap-2 mb-6">
                {pokemon.types.map((type) => (
                  <span
                    key={type}
                    className="px-3 py-1 rounded-full text-sm bg-primary/10 text-primary"
                  >
                    {type}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <h3 className="text-sm text-muted-foreground">Height</h3>
                  <p className="text-lg">{pokemon.height / 10} m</p>
                </div>
                <div>
                  <h3 className="text-sm text-muted-foreground">Weight</h3>
                  <p className="text-lg">{pokemon.weight / 10} kg</p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-sm text-muted-foreground mb-2">Abilities</h3>
                <div className="flex flex-wrap gap-2">
                  {pokemon.abilities.map((ability) => (
                    <span
                      key={ability}
                      className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground"
                    >
                      {ability}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm text-muted-foreground mb-2">Stats</h3>
                <div className="space-y-2">
                  {Object.entries(pokemon.stats).map(([stat, value]) => (
                    <div key={stat}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm capitalize">
                          {stat.replace('_', ' ')}
                        </span>
                        <span className="text-sm">{value}</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${(value / 255) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}