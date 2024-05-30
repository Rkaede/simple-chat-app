'use server';
import { cookies } from 'next/headers';
import { sha256, getCookieKeyValue } from './util';
import { redirect } from 'next/navigation';

export async function authenticate(
  state: string | undefined,
  formData: FormData,
): Promise<string | undefined> {
  const appPassword = process.env.APP_PASSWORD;
  const password = formData.get('password');

  if (!appPassword) {
    throw new Error('No password set');
  }

  if (!password) {
    return 'No password provided.';
  }

  const hashedPassword = await sha256(password.toString());
  const hashedAppPassword = await sha256(appPassword);

  if (hashedPassword === hashedAppPassword) {
    console.log('Authenticated');

    const cookieKeyValue = await getCookieKeyValue(appPassword);
    cookies().set('auth', cookieKeyValue, { maxAge: 60 * 60 * 24 * 7 });
    redirect('/');
  } else {
    return 'Invalid password.';
  }
}
