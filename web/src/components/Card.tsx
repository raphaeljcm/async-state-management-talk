import { ComponentProps } from 'react';

interface CardProps extends ComponentProps<'button'> {
  title: string;
  description: string;
}

export function Card({ title, description, ...rest }: CardProps) {
  return (
    <button
      type="button"
      className="rounded-[10px] h-[260px] bg-base-post p-8 flex flex-col gap-5 hover:ring-2 hover:ring-base-label hover:-translate-y-2 cardTransition text-start"
      {...rest}
    >
      <h2 className="text-xl text-base-title font-bold leading-relaxed">
        {title}
      </h2>
      <p className="leading-relaxed text-base-text line-clamp-5">
        {description}
      </p>
    </button>
  );
}
