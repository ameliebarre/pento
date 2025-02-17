import { X, CheckCheck } from 'lucide-react';
import { cva } from 'class-variance-authority';

type ToastProps = {
  title: string;
  subTitle: string | React.ReactNode;
  variant: 'success' | 'error';
};

const ToastIcon = ({ variant }: { variant: 'success' | 'error' }) => {
  return variant === 'success' ? (
    <CheckCheck className='w-5 h-5 text-white' />
  ) : (
    <X className='w-5 h-5 text-white' strokeWidth={2.5} />
  );
};

const Toast = ({ title, subTitle, variant }: ToastProps) => (
  <div className='flex items-center justify-center gap-3'>
    <div className={toastIconContainerVariants({ variant })}>
      <ToastIcon variant={variant} />
    </div>
    <div className='flex flex-col'>
      <p className={toastTitleVariants({ variant })}>{title}</p>
      <p className='text-gray-600 text-xs'>{subTitle}</p>
    </div>
  </div>
);

const toastIconContainerVariants = cva(
  'w-12 h-12 rounded-2xl flex items-center justify-center',
  {
    variants: {
      variant: {
        success: 'bg-slate-900',
        error: 'bg-red-600',
      },
    },
  }
);

const toastTitleVariants = cva('font-semibold text-sm', {
  variants: {
    variant: {
      success: 'text-slate-900',
      error: 'text-red-600',
    },
  },
});

export default Toast;
