import clsx from 'clsx';
import * as React from 'react';
import useSmoothScroll from '../scripts/useGsap';

interface PagetopProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const Pagetop: React.FC<PagetopProps> = ({ className, ...props }) => {
  useSmoothScroll({
    desktopOffset: 0,
    mobileOffset: 0,
    containerSelector: '#top',
  });
  return (
    <div id="pagetop" className={clsx('', className)} {...props}>
      <a
        href="#top"
        className="block cursor-pointer text-brand-500 hover:text-hover"
        aria-label="ページトップへ戻る"
        data-lenis-prevent
      >
        <svg
          aria-hidden="true"
          aria-label="ページトップ・矢印"
          viewBox="0 0 64 32"
          className="aspect-[2/1] fill-current"
          role="img"
        >
          <path d="M32 0H31V1H30V2H29V3H28V4H27V5H26V6H25V7H24V8H23V9H22V10H21V11H20V12H19V13H18V14H17V15H16V16H15V17H14V18H13V19H12V20H11V21H10V22H9V23H8V24H7V25H6V26H5V27H4V28H3V29H2V30H1V31H0V32H1H2V31H3V30H4V29H5V28H6V27H7V26H8V25H9V24H10V23H11V22H12V21H13V20H14V19H15V18H16V17H17V16H18V15H19V14H20V13H21V12H22V11H23V10H24V9H25V8H26V7H27V6H28V5H29V4H30V3H31V2H32H33V3H34V4H35V5H36V6H37V7H38V8H39V9H40V10H41V11H42V12H43V13H44V14H45V15H46V16H47V17H48V18H49V19H50V20H51V21H52V22H53V23H54V24H55V25H56V26H57V27H58V28H59V29H60V30H61V31H62V32H63H64V31H63V30H62V29H61V28H60V27H59V26H58V25H57V24H56V23H55V22H54V21H53V20H52V19H51V18H50V17H49V16H48V15H47V14H46V13H45V12H44V11H43V10H42V9H41V8H40V7H39V6H38V5H37V4H36V3H35V2H34V1H33V0H32Z" />
        </svg>
      </a>
    </div>
  );
};

export default Pagetop;
