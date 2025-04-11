import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils'; // Import the cn utility

// --- Define Button Variants using CVA ---
const buttonVariants = cva(
    // Base styles applied to all variants
    'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
    {
        variants: {
            // Different visual styles
            variant: {
                default: // Primary action button
                    'bg-blue-600 text-primary-foreground text-white shadow hover:bg-blue-600/90 dark:bg-blue-500 dark:hover:bg-blue-500/90',
                destructive: // Button for dangerous actions (like delete)
                    'bg-red-600 text-destructive-foreground text-white shadow-sm hover:bg-red-600/90 dark:bg-red-500 dark:hover:bg-red-500/90',
                outline: // Button with an outline, transparent background
                    'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground hover:bg-gray-100 dark:hover:bg-gray-800',
                secondary: // Less prominent button
                    'bg-gray-100 text-secondary-foreground shadow-sm hover:bg-gray-100/80 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-800/80',
                ghost: // Button with no background or border, used for icon buttons often
                    'hover:bg-accent hover:text-accent-foreground hover:bg-gray-100 dark:hover:bg-gray-800',
                link: // Button that looks like a link
                    'text-primary underline-offset-4 hover:underline dark:text-blue-400',
            },
            // Different sizes
            size: {
                default: 'h-10 px-4 py-2', // Standard size
                sm: 'h-9 rounded-md px-3', // Small size
                lg: 'h-11 rounded-md px-8', // Large size
                icon: 'h-10 w-10', // Square size for icon-only buttons
            },
        },
        // Default variants if none are specified
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {

}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    // Destructure props: className, variant, size, other props are collected in ...props
    ({ className, variant, size, ...props }, ref) => {
        return (
            <button
                // Use the cn utility to merge base styles, variant styles, and any custom className passed in
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref} // Forward the ref
                {...props} // Spread the rest of the props (like type, disabled, onClick, children)
            />
        );
    }
);
Button.displayName = 'Button'; // For better debugging names

// Export the component and variants
export { Button, buttonVariants };
