import { redirect } from 'next/navigation';
import { playfair_display } from '@/app/layout';
import { auth } from '@/auth';
import { Metadata } from 'next';
import CredentialsSignInForm from './credentials-signin-form';

export const metaData: Metadata = {
  title: 'Sign In',
};

type SignInPageProps = {
  searchParams: Promise<{
    callbackUrl: string;
  }>;
};

const SignInPage = async (props: SignInPageProps) => {
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
        Sign In
      </h2>
      <CredentialsSignInForm />
    </div>
  );
};

export default SignInPage;
