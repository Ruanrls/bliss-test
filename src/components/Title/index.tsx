import { twMerge } from 'tailwind-merge';

type Props = {
  children: React.ReactNode;
  className?: string;
};

const Title = ({ children, className }: Props) => {
  return (
    <h1
      className={twMerge(
        'text-4xl font-bold leading-none tracking-tight',
        className
      )}
    >
      {children}
    </h1>
  );
};

export default Title;
