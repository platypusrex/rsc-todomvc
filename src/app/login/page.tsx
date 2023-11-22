import { signIn } from '~/auth';
import { SubmitButton } from '~/components/SubmitButton';

export default function Login () {
  return (
    <div className="bg-gray-100 flex flex-col items-center justify-center h-screen w-full">
      <h1 className="text-4xl mb-8 font-bold">Next.js 14 TodoMVC</h1>
      <form action={async () => {
        'use server';
        await signIn('github', { redirectTo: '/' });
      }}>
        <SubmitButton className="login-btn-github" loadingText="Beep bop boop...">
          Sign in with Github
        </SubmitButton>
      </form>

      <form action={async () => {
        'use server';
        await signIn('google', { redirectTo: '/' });
      }}>
        <SubmitButton className="login-btn-google mt-4 group" loadingText="Beep bop boop...">
          <span
            className="bg-gradient-to-r from-blue-600 via-green-500
             to-indigo-400 duration-200 hover:animate-none text-transparent bg-clip-text
             group-hover:text-white group-hover:bg-clip-[unset]"
          >
            Sign in with Google
          </span>
        </SubmitButton>
      </form>
    </div>
  );
}
