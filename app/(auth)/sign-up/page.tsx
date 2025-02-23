import { redirect } from 'next/navigation';
import { playfair_display } from '@/lib/fonts';
import { auth } from '@/auth';
import SignUpForm from './sign-up-form';

type SignUpPageProps = {
  searchParams: Promise<{
    callbackUrl: string;
  }>;
};

const SignUpPage = async (props: SignUpPageProps) => {
  const { callbackUrl } = await props.searchParams;

  const session = await auth();

  if (session) {
    return redirect(callbackUrl || '/');
  }

  return (
    <div className='w-full max-w-md mx-auto'>
      <h2
        className={`${playfair_display.className} text-4xl text-center font-semibold mb-12`}
      >
        Sign Up
      </h2>
      <SignUpForm />
    </div>
  );
};

export default SignUpPage;
