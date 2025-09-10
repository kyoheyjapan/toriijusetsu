import React from 'react';

interface SymbolMinProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

const SymbolMin: React.FC<SymbolMinProps> = ({ className = '', ...props }) => (
  <svg
    aria-hidden="true"
    aria-label="Star SymbolMin"
    viewBox="0 0 137 193"
    className={`
      aspect-[137/193] fill-current
      ${className}
    `}
    {...props}
    role="img"
  >
    <path d="M6.82 116.47C8.66 107.96 20.18 104.08 28.51 105.85C33.92 107 39.81 110.66 45.01 117.68L0 192.09L53.92 154.18L35.78 144.26H68.03L78.7 136.62L60.56 126.7H92.81L103.12 119.31L84.98 109.39H117.23L136.06 96.04H84.84H70.29L90.13 86.12L101.25 65.27H86.79L106.51 55.41L117.66 34.5H103.09L122.96 24.56L136.06 0L76.05 42.36L86.41 48.02H68.03L6.53 91.43C2.66 95.15 0.09 99.94 0.05 104.88C0.05 107.29 0.62 109.76 1.98 112.2C2.51 113.16 5.7 117.38 6.82 116.47ZM25.23 87.82C27.99 87.82 30.23 90.06 30.23 92.82C30.23 95.58 27.99 97.82 25.23 97.82C22.47 97.82 20.23 95.58 20.23 92.82C20.23 90.06 22.47 87.82 25.23 87.82Z" />
  </svg>
);

export default SymbolMin;
