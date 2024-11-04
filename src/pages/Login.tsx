import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

export default function Login() {
  const { user, signIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Pokédex</h1>
        <p className="text-muted-foreground mb-8">
          Sign in with your Google account to access your Pokédex
        </p>
        <Button onClick={signIn} size="lg">
          Sign in with Google
        </Button>
      </div>
    </div>
  );
}