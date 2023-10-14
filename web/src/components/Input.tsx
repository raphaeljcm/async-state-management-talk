import { ComponentProps } from 'react';

interface InputProps extends ComponentProps<'input'> {}

export function Input(props: InputProps) {
  return (
    <input
      className="py-3 px-4 bg-base-input text-base-label border border-base-border rounded-md transition-colors outline-none focus-visible:ring-1 focus-visible:border-blue"
      {...props}
    />
  );
}
