'use client';
import clsx from 'clsx';
import { type ReactNode } from 'react';

type ColorType = 'gray' | 'white' | 'primary';
type AlignType = 'default' | 'left' | 'center';

interface HeadingProps {
  /** 日本語のナビゲーションラベル */
  navLabel?: string;
  /** 英語のナビゲーションラベル */
  navLabelEng?: string;
  /** カラーテーマ */
  color?: ColorType;
  /** テキストの配置 */
  align?: AlignType;
  /** 追加のCSSクラス */
  className?: string;
  /** リンクのhref属性 */
  href?: string;
}

interface ColorMap {
  h2: string;
  h3: string;
  bd: string;
}

const Heading: React.FC<HeadingProps> = ({
  navLabel = '著者紹介',
  navLabelEng = 'AUTHOR',
  color = 'gray',
  align = 'default',
  className,
  href,
}) => {
  const colorMap: Record<ColorType, ColorMap> = {
    gray: {
      h2: 'text-brand-500',
      h3: 'text-brand-500',
      bd: 'fill-accent-50',
    },
    white: {
      h2: 'text-white',
      h3: 'text-white',
      bd: 'text-white',
    },
    primary: {
      h2: 'text-primary-600',
      h3: 'text-primary-600',
      bd: 'text-primary-600',
    },
  };

  const alignmentClass: Record<AlignType, string> = {
    default: 'text-center sm:text-left',
    left: 'text-left',
    center: 'text-center',
  };

  const justifyClass: Record<AlignType, string> = {
    default: 'justify-center sm:justify-start',
    left: 'justify-start',
    center: 'justify-center',
  };

  const textColorClass = colorMap[color] || colorMap.gray;

  const Content: React.FC = () => (
    <div className={clsx('block', alignmentClass[align], className)}>
      <h2
        className={`type-sm relative z-10 leading-none font-bold tracking-[6px] ${textColorClass.h2} text-box-ja group-hover:text-hover`}
      >
        {navLabel}
      </h2>
      <div className={clsx('relative z-0 mt-3 mb-4 flex', justifyClass[align])}>
        <svg
          aria-hidden="true"
          aria-label="罫線"
          viewBox="0 0 16 1"
          className="h-auto w-30 fill-current group-hover:fill-hover"
          role="img"
          style={{
            transform: 'rotate(-45deg)',
            border: '1px solid #e5e7eb',
          }}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M16 2H0V0H16V2Z"
            className={textColorClass.bd}
          />
        </svg>
      </div>
      <h3
        className={`type-md relative z-10 leading-none font-bold tracking-[6px] ${textColorClass.h3} text-box-en group-hover:text-hover`}
      >
        {navLabelEng}
      </h3>
    </div>
  );

  return href ? (
    <a href={href} className="group">
      <Content />
    </a>
  ) : (
    <Content />
  );
};

export default Heading;
