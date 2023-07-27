type Props = {
  children: React.ReactNode;
  isLoading: boolean;
  fallback: React.ReactNode;
};

const Loading = ({ children, fallback, isLoading }: Props) => {
  return isLoading ? fallback : children;
};

export default Loading;
