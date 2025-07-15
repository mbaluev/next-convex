import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils/cn';

const buttonVariants = cva(
  cn(
    'inline-flex items-center justify-center gap-4',
    'whitespace-nowrap rounded-md font-medium cursor-pointer',
    'focus-visible:outline-none',
    'disabled:pointer-events-none disabled:opacity-50'
  ),
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        outline: 'border-2 border-input hover:bg-secondary hover:text-secondary-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        warning: 'bg-warning text-warning-foreground hover:bg-warning/90',
        success: 'bg-success text-success-foreground hover:bg-success/90',
        ghost: 'hover:bg-secondary hover:text-secondary-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        sidebar: 'hover:bg-secondary text-primary',
        static: 'text-foreground cursor-default',
      },
      size: {
        default: 'h-11 px-3',
        sm: 'h-8 px-2',
        md: 'h-11 px-3',
        lg: 'h-14 px-6',
        xl: 'h-14 px-6 text-2xl',
        icon: 'h-11 w-11 rounded-full',
        'icon-sm': 'h-8 w-8 rounded-full',
        'icon-lg': 'h-14 w-14 rounded-full',
        'icon-xl': 'h-14 w-14 rounded-full text-2xl',
        adornment: 'h-8 w-8 p-1.5 absolute right-1.5 top-1/2 -translate-y-1/2 rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
export type { ButtonProps };
