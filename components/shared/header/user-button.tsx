'use client';
import { Session } from 'next-auth';
import { LogOut, UserRoundIcon } from 'lucide-react';
import { getSession, signOutUser } from '@/lib/actions/user.actions';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import ButtonLink from '../button-link';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

const UserButton = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    getSession().then((data) => setSession(data));
  }, []);

  if (!session) {
    return (
      <ButtonLink href='/sign-in' className='hidden md:flex'>
        <UserRoundIcon /> Sign In
      </ButtonLink>
    );
  }

  const firstInitial = session.user?.name?.charAt(0).toUpperCase() ?? 'U';

  return (
    <div className='flex gap-2 items-center'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className='flex items-center'>
            <Button
              variant='ghost'
              className='relative w-8 h-8 rounded-full flex items-center bg-gray-200'
            >
              {firstInitial}
            </Button>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-56 p-3' align='end' forceMount>
          <DropdownMenuLabel className='font-normal'>
            <div className='flex flex-col space-y-1'>
              <div className='text-sm font-semibold leading-none'>
                {session.user?.name}
              </div>
              <div className='text-sm text-muted-foreground leading-none'>
                {session.user?.email}
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuItem className='p-0 mb-1'>
            <form action={signOutUser}>
              <Button variant='ghost'>
                <LogOut /> Sign Out
              </Button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserButton;
