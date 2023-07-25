type Props = React.HTMLProps<HTMLButtonElement> & {
  className: string;
  children: React.ReactNode;
};

const Button = ({ className, children, ...buttonProps }: Props) => {
  <button
    {...buttonProps}
    className={`mt-4 px-4 py-2 text-white bg-red-500 rounded ${className}`}
    type="button"
  >
    {children}
  </button>;
};
