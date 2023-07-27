import classNames from 'classnames';
import Image from 'next/image';
import Loading from '../Loading';

export enum ButtonVariants {
  primary = 'primary',
  danger = 'danger',
}

type Props = React.HTMLProps<HTMLButtonElement> & {
  className?: string;
  children: React.ReactNode;
  variant?: ButtonVariants;
  isLoading?: boolean;
  loadingFallback?: React.ReactNode;
};

type FallbackProps = {
  variant?: ButtonVariants;
};

const DefaultFallback = ({ variant }: FallbackProps) => {
  const variants = {
    [ButtonVariants.primary]: 'icons/loading-spinner-white.svg',
    [ButtonVariants.danger]: 'icons/loading-spinner-white.svg',
  };

  const src = variants[variant ?? ButtonVariants.primary];

  return (
    <Image
      src={src}
      alt="Loading spinner moving"
      className="fill-blue-500"
      fill
    />
  );
};

const Button = ({
  className,
  children,
  isLoading,
  loadingFallback,
  variant = ButtonVariants.primary,
  ...buttonProps
}: Props) => {
  return (
    <button
      {...buttonProps}
      className={classNames(
        {
          'bg-blue-400 hover:bg-blue-500': variant === ButtonVariants.primary,
          'hover:bg-blue-400': variant === ButtonVariants.primary && isLoading,
          'bg-red-400': variant === ButtonVariants.danger,
        },
        `relative px-4 py-2 text-white rounded flex justify-center hover:shadow-lg`,
        className
      )}
      type="button"
      disabled={!!isLoading || buttonProps.disabled}
    >
      <Loading
        isLoading={!!isLoading}
        fallback={loadingFallback ?? <DefaultFallback variant={variant} />}
      >
        {children}
      </Loading>
    </button>
  );
};

export default Button;
