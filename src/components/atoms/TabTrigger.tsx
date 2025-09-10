import clsx from 'clsx';
import type { ReactNode } from 'react';

interface TabTriggerProps {
  className?: string;
  isActive?: boolean;
  href: string;
  children: ReactNode;
}

export const TabTrigger = ({ className, isActive = false, href, children }: TabTriggerProps) => {
  return (
    <a
      href={href}
      className={clsx(
        'max-w-auto sm:max-w-auto h-full max-h-full min-h-full w-auto min-w-auto gap-2 !px-4 py-3 whitespace-nowrap hover:text-sub-300 2xs:px-4 sm:h-full sm:max-h-full sm:min-h-full sm:w-auto sm:min-w-auto md:px-6',
        {
          'pointer-events-none border-x-0 border-t-0 border-b-2 border-gray-400 text-gray-400':
            isActive,
          'border-none text-gray-600': !isActive,
        },
        className,
      )}
    >
      {children}
    </a>
  );
};
