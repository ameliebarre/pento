import { playfair_display } from '@/app/layout';
import { Metadata } from 'next';
import CredentialsSignInForm from './credentials-signin-form';

export const metaDat: Metadata = {
  title: 'Sign In',
};

const SignInPage = () => {
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
