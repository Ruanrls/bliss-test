import classNames from 'classNames';

type Props = {
  children: React.ReactNode;
  className?: string;
};

const Container = ({ children, className }: Props) => {
  return (
    <div
      className={classNames(
        className,
        'flex flex-col w-full max-w-[1920px] items-center'
      )}
    >
      {children}
    </div>
  );
};

export default Container;
