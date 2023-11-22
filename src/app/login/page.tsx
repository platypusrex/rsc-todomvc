import { signIn } from '~/auth';

export default function Login () {
  return (
    <div className="bg-gray-100 flex flex-col items-center justify-center h-screen w-full">
      <h1 className="text-4xl mb-8 font-bold">Next.js 14 TodoMVC</h1>
      <form action={async () => {
        'use server';
        await signIn('github', { redirectTo: '/' });
      }}>
        <button type="submit" className="login-btn">
          Sign in with Github
        </button>
      </form>
    </div>
  );
}
