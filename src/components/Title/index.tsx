import classNames from 'classNames';

type Props = {
  children: React.ReactNode;
  className?: string;
};

const Title = ({ children, className }: Props) => {
  return (
    <h1
      className={classNames(
        'text-4xl font-extrabold leading-none tracking-tight',
        className
      )}
    >
      {children}
    </h1>
  );
};

export default Title;
