import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Pokemon } from '@/lib/supabase';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

export default function PokemonDetail() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPokemon();
  }, [id]);

  async function fetchPokemon() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('pokemon')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        throw error;
      }

      setPokemon(data);
    } catch (error) {
      console.error('Error fetching pokemon:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <Card className="animate-pulse">
        <CardContent className="p-8">
          <div className="w-full h-64 bg-muted rounded-lg mb-4" />
          <div className="space-y-4">
            <div className="h-8 bg-muted rounded w-1/3" />
            <div className="h-4 bg-muted rounded w-1/4" />
            <div className="h-4 bg-muted rounded w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!pokemon) {
    return (
      <Card>
        <CardContent className="p-8">
          <p className="text-center text-muted-foreground">Pokemon not found</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <img
              src={pokemon.image_url}
              alt={pokemon.name}
              className="w-full h-64 object-contain"
            />
          </div>
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold capitalize mb-2">
                {pokemon.name}
              </h1>
              <div className="flex gap-2">
                {pokemon.types.map((type) => (
                  <Badge key={type} variant="secondary">
                    {type}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Height</p>
                <p className="font-medium">{pokemon.height} m</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Weight</p>
                <p className="font-medium">{pokemon.weight} kg</p>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Stats</h2>
              <div className="space-y-2">
                {Object.entries(pokemon.stats).map(([stat, value]) => (
                  <div key={stat}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm capitalize">
                        {stat.replace('_', ' ')}
                      </span>
                      <span className="text-sm">{value}</span>
                    </div>
                    <Progress value={(value / 255) * 100} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}