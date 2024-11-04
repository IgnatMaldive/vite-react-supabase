import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface PokemonCardProps {
  id: number;
  name: string;
  image: string;
  types: string[];
}

export default function PokemonCard({ id, name, image, types }: PokemonCardProps) {
  return (
    <Link to={`/pokemon/${id}`}>
      <Card className="overflow-hidden transition-all hover:shadow-lg">
        <CardHeader className="p-4">
          <CardTitle className="capitalize text-lg">{name}</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <AspectRatio ratio={1}>
            <img
              src={image}
              alt={name}
              className="object-contain w-full h-full"
            />
          </AspectRatio>
          <div className="flex gap-2 mt-4">
            {types.map((type) => (
              <span
                key={type}
                className="px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary"
              >
                {type}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}