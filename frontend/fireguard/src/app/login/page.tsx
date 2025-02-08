"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Input from '@/app/components/form/input';
import Button from '@/app/components/button';

interface LoginForm {
  email: string;
  password: string;
}

export default function LoginPage() {
  const [formData, setFormData] = useState<LoginForm>({
    email: '',
    password: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError(null);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    //if (!validateForm()) return;

    setIsLoading(true);
    setError(null);

    try {
      // TODO: Add your authentication logic here
      // const response = await loginUser(formData);
      console.log(JSON.stringify(formData))
      const response = await fetch("http://127.0.0.1:8000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "text/plain",
        },
        body: JSON.stringify(formData)
      })
      
      router.push('/dispatcher/dashboard');
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Invalid email or password';
      setError(errorMessage);
  } finally {
      setIsLoading(false);
  }

  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4 overflow-hidden fixed inset-0">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#ffdbbb] mb-2 font-[family-name:var(--font-eb-garamond)]">
            Welcome Back
          </h1>
          <p className="text-gray-400 font-[family-name:var(--font-eb-garamond)]">
            Sign in to your account
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-800/50 text-red-100 rounded-lg text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-gray-800 rounded-lg shadow-xl p-8 space-y-6">
          <Input
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="you@example.com"
            labelClassName="text-lg"
          />

          <Input
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="••••••••"
            labelClassName="text-lg"
          />

          <Button
            type="submit"
            disabled={isLoading}
            className={`
              w-full
              px-6
              py-3
              bg-[#ffdbbb]
              text-gray-900
              rounded-lg
              font-bold
              transition-opacity
              ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'}
            `}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </Button>

          <div className="text-center mt-4">
            <p className="text-gray-400 font-[family-name:var(--font-eb-garamond)]">
              Don&apos;t have an account?{' '}
              <Link 
                href="/signup" 
                className="text-[#ffdbbb] hover:underline font-[family-name:var(--font-eb-garamond)]"
              >
                Sign up here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}