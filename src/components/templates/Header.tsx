import React, { useEffect, useRef, useState } from 'react';
import siteConfig from '../../site.config.json';
import Textlink from '../atoms/Textlink';
import VaulDrawer from '../templates/VaulDrawer';
import Logo from '../vi/Logo';

interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
}

const globalItems = Object.values(siteConfig.global) as {
  url: string;
  navLabelEng: string;
}[];

const Header: React.FC<HeaderProps> = ({ className = '', ...props }) => {
  const [show, setShow] = useState<boolean>(true);
  const lastScroll = useRef<number>(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (scrollY <= 0) {
            setShow(true);
          } else if (scrollY > lastScroll.current) {
            setShow(false);
          } else {
            setShow(true);
          }
          lastScroll.current = scrollY;
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`
        sticky top-0 z-40 mx-auto w-full max-w-(--container-5xl)
        transition-transform duration-300
        ${show ? `translate-y-0` : `-translate-y-full`}
        ${className}
      `}
      {...props}
    >
      <nav
        className={`
          flex items-center justify-between px-6 py-4
          lg:p-8
          4xl:px-0
        `}
        aria-label="Global"
      >
        <a href="#" className="-m-1.5 p-1.5">
      <span className="sr-only">Your Company</span>
      <Logo className="h-10 text-primary" />
    </a>
        <div>
          <ul
            className={`
              hidden items-start gap-x-6
              lg:flex
            `}
          >
            {globalItems.map((item) => (
              <li key={item.url}>
                <Textlink
                  a
                  href={item.url}
                  className={`
                    font-bold tracking-wider text-gray-900
                    lg:text-lg
                  `}
                >
                  {item.navLabelEng}
                </Textlink>
              </li>
            ))}
          </ul>
          <div
            className={`
              flex
              lg:hidden
            `}
          >
            <VaulDrawer className="h-auto" />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
