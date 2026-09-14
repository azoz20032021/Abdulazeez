import type { ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';

type Props = {
  href: string;
  children: ReactNode;
  /** Off for mailto: and tel:, which open in the same context. */
  external?: boolean;
  icon?: ReactNode;
};

/**
 * One underlined link with a trailing arrow. The arrow is drawn rather than set
 * as the ↗ character, which falls back to a different font on some systems.
 */
export default function ArrowLink({ href, children, external = true, icon }: Props) {
  const target = external ? { target: '_blank', rel: 'noreferrer' } : {};

  return (
    <a className="link-arrow" href={href} {...target}>
      {icon}
      {children}
      <ArrowUpRight size={14} strokeWidth={2} aria-hidden="true" />
    </a>
  );
}
