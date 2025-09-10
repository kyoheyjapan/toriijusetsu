import React from 'react';

interface MenuBarsProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

const MenuBars: React.FC<MenuBarsProps> = ({ className = '', ...props }) => (
  <svg
    aria-hidden="true"
    aria-label="ハンバーガーメニュー"
    viewBox="0 0 60 10"
    className={`
      aspect-[6/1] fill-primary-300
      group-hover:fill-hover
      ${className}
    `}
    role="img"
    {...props}
  >
    <rect width="60" height="2"></rect>
    <rect y="8" width="60" height="2"></rect>
  </svg>
);

export default MenuBars;
