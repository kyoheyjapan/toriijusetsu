import LogotypeEng from '@/components/vi/LogotypeEng.js';
import SymbolMin from '@/components/vi/SymbolMin.js';
import Logo from '../vi/Logo.tsx';
import Spacer from './Spacer.tsx';

interface LogoReactProps {
  /** 追加のCSSクラス */
  className?: string;
}

export const LogoReact: React.FC<LogoReactProps> = ({ className = '' }) => {
  return (
    <div
      className={`
        ${className}
        w-full
      `}
    >
      <div className="flex w-full flex-col items-center justify-center gap-2">
        <h1 className="mx-auto w-full max-w-[40px]">
          <SymbolMin className="h-auto w-[40px] fill-white text-white" />
        </h1>
        <h2
          className={`
            flex flex-col items-center justify-center text-lg font-bold
            text-white
          `}
        >
          <LogotypeEng className="h-[40px] w-auto fill-white text-white" />
        </h2>
        <Spacer size="5xs" />
        <div className="text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <g>
              <circle
                cx="12"
                cy="2.5"
                r="1.5"
                fill="currentColor"
                opacity="0.14"
              />
              <circle
                cx="16.75"
                cy="3.77"
                r="1.5"
                fill="currentColor"
                opacity="0.29"
              />
              <circle
                cx="20.23"
                cy="7.25"
                r="1.5"
                fill="currentColor"
                opacity="0.43"
              />
              <circle
                cx="21.5"
                cy="12"
                r="1.5"
                fill="currentColor"
                opacity="0.57"
              />
              <circle
                cx="20.23"
                cy="16.75"
                r="1.5"
                fill="currentColor"
                opacity="0.71"
              />
              <circle
                cx="16.75"
                cy="20.23"
                r="1.5"
                fill="currentColor"
                opacity="0.86"
              />
              <circle cx="12" cy="21.5" r="1.5" fill="currentColor" />
              <animateTransform
                attributeName="transform"
                calcMode="discrete"
                dur="0.75s"
                repeatCount="indefinite"
                type="rotate"
                values="0 12 12;30 12 12;60 12 12;90 12 12;120 12 12;150 12 12;180 12 12;210 12 12;240 12 12;270 12 12;300 12 12;330 12 12;360 12 12"
              />
            </g>
          </svg>
        </div>
        <p
          className={`
            font-roman animate-pulse text-xs font-extrabold text-white
          `}
        >
          Loading ...
        </p>
      </div>
    </div>
  );
};

export default LogoReact;
