import { useEffect, useRef } from 'react';

type Props = {
  id?: string;
  children: React.ReactNode;
  callback: (isIntersecting: boolean, observer: IntersectionObserver) => void;
  options?: IntersectionObserverInit;
};

const Observer = ({ children, id, callback, options }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const observer = useRef<IntersectionObserver>();

  useEffect(function mountObserver() {
    if (!ref.current) return;

    observer.current = new IntersectionObserver(([entry]) => {
      callback(entry.isIntersecting, observer.current!);
    }, options);
    observer.current.observe(ref.current);

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={ref} id={id}>
      {children}
    </div>
  );
};

export default Observer;
