import { Link, LinkProps } from 'react-router-dom';
import { prefetchOnHover } from '../hooks/usePrefetch';

interface PrefetchLinkProps extends LinkProps {
  children: React.ReactNode;
}

export function PrefetchLink({ to, children, ...props }: PrefetchLinkProps) {
  const handleMouseEnter = () => {
    prefetchOnHover(to.toString());
  };

  return (
    <Link to={to} onMouseEnter={handleMouseEnter} {...props}>
      {children}
    </Link>
  );
}
