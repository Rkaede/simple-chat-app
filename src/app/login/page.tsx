'use client';

import { Input } from '@/components/ui/input';
import { authenticate } from '../lib/actions';
import { Button } from '@/components/ui/button';
import { useFormState, useFormStatus } from 'react-dom';

export default function Login() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  return (
    <div className="grid place-items-center min-h-screen">
      <form action={dispatch} className="flex flex-col gap-4 w-72">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold">Login</h1>
          <p className="text-sm">Please enter your password to continue.</p>
        </div>
        <div className="flex flex-col gap-1">
          <Input name="password" type="password" placeholder="Enter password" />
          <p className="text-xs text-destructive min-h-4">
            {errorMessage ? <span>{errorMessage}</span> : null}
          </p>
        </div>
        <LoginButton />
      </form>
    </div>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    if (pending) {
      event.preventDefault();
    }
  }

  return (
    <Button aria-disabled={pending} type="submit" onClick={handleClick}>
      Sign In
    </Button>
  );
}
