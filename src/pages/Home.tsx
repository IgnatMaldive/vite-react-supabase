import { useEffect, useState } from 'react';
import PokemonCard from '@/components/PokemonCard';
import SearchBar from '@/components/SearchBar';
import { supabase } from '@/lib/supabase';

interface Pokemon {
  id: number;
  name: string;
  image_url: string;
  types: string[];
}

export default function Home() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [filteredPokemon, setFilteredPokemon] = useState<Pokemon[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPokemon() {
      const { data, error } = await supabase
        .from('pokemon')
        .select('*')
        .order('id')
        .limit(151);

      if (error) {
        console.error('Error fetching pokemon:', error);
        return;
      }

      setPokemon(data || []);
      setFilteredPokemon(data || []);
      setLoading(false);
    }

    fetchPokemon();
  }, []);

  useEffect(() => {
    const filtered = pokemon.filter((p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPokemon(filtered);
  }, [searchQuery, pokemon]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="max-w-md mx-auto">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredPokemon.map((p) => (
          <PokemonCard
            key={p.id}
            id={p.id}
            name={p.name}
            image={p.image_url}
            types={p.types}
          />
        ))}
      </div>
    </div>
  );
}