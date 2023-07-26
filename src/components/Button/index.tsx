import classNames from 'classnames';

export enum ButtonVariants {
  primary = 'primary',
  danger = 'danger',
}

type Props = React.HTMLProps<HTMLButtonElement> & {
  className?: string;
  children: React.ReactNode;
  variant?: ButtonVariants;
};

const Button = ({
  className,
  children,
  variant = ButtonVariants.primary,
  ...buttonProps
}: Props) => {
  return (
    <button
      {...buttonProps}
      className={classNames(
        {
          'bg-blue-400': variant === ButtonVariants.primary,
          'bg-red-400': variant === ButtonVariants.danger,
        },
        `mt-4 px-4 py-2 text-white rounded`,
        className
      )}
      type="button"
    >
      {children}
    </button>
  );
};

export default Button;
