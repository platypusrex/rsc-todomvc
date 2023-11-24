import { signIn } from '~/auth';
import { SubmitButton } from '~/components/SubmitButton';
import { Spinner } from '~/components/Spinner';

export default function Login() {
  return (
    <main className="pt-36 flex h-screen w-full flex-col items-center bg-gray-100 px-2 md:px-0">
      <h1 className="animate-bg-move mb-4 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-200 via-neutral-700 to-gray-200
       bg-clip-text text-center text-5xl font-black text-transparent"
      >
        Next.js 14 TodoMVC
      </h1>
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
    </main>
  );
}
