import { APP_NAME } from '@/lib/constants';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='h-16 border-t flex items-center justify-center'>
      <div className='p-5 flex-center'>
        {currentYear} {APP_NAME}. All rights reserved
      </div>
    </footer>
  );
};

export default Footer;
