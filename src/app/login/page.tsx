import { signIn } from '~/auth';
import { SubmitButton } from '~/components/SubmitButton';
import { Spinner } from '~/components/Spinner';

export default function Login() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-gray-100 px-2 md:px-0">
      <h1 className="mb-4 text-center text-5xl font-extrabold md:text-6xl">Next.js 14 TodoMVC</h1>
      <p className="mb-4 font-light text-gray-600">Sign in with</p>

      <div className="flex flex-col items-center gap-4 md:flex-row">
        <form
          action={async () => {
            'use server';
            await signIn('github', { redirectTo: '/' });
          }}
        >
          <SubmitButton
            className="login-btn-github"
            loading={<Spinner variant="black" text="Beep bop boop..." />}
          >
            Github
          </SubmitButton>
        </form>

        <p className="font-light text-gray-600">or</p>

        <form
          action={async () => {
            'use server';
            await signIn('google', { redirectTo: '/' });
          }}
        >
          <SubmitButton
            className="login-btn-google group"
            loading={
              <Spinner
                variant="gradient"
                text="Beep bop boop..."
                textClassName="login-btn-google-text"
              />
            }
          >
            <span className="login-btn-google-text">Google</span>
          </SubmitButton>
        </form>
      </div>
    </div>
  );
}
