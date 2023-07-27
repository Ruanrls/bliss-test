import { twMerge } from 'tailwind-merge';

type Props = {
  children: React.ReactNode;
  className?: string;
};

const Container = ({ children, className }: Props) => {
  return (
    <div
      className={twMerge(
        'flex flex-col w-full max-w-[1920px] items-center',
        className
      )}
    >
      {children}
    </div>
  );
};

export default Container;
