import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

type ButtonLinkProps = {
  children: React.ReactNode;
  href: string;
  className?: string;
  fontSize?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  fontWeight?: 'normal' | 'bold';
};

const ButtonLink = ({
  children,
  href,
  className,
  fontSize = 'md',
  fontWeight = 'normal',
}: ButtonLinkProps) => {
  const size =
    fontSize === 'sm'
      ? 'text-sm'
      : fontSize === 'md'
      ? 'text-md'
      : fontSize === 'lg'
      ? 'text-lg'
      : fontSize === 'xl'
      ? 'text-xl'
      : 'text-2xl';

  return (
    <Button
      asChild
      variant='ghost'
      className={cn(
        'p-0 hover:bg-transparent flex items-center gap-2 font-normal',
        size,
        fontWeight === 'bold' ? 'font-bold' : 'font-normal',
        className
      )}
    >
      <Link href={href}>{children}</Link>
    </Button>
  );
};

export default ButtonLink;
