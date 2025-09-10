'use client';
import clsx from 'clsx';
import { type ReactNode } from 'react';

interface HeadingSectionProps {
  /** 英語のタイトル */
  titleEn: string;
  /** 日本語のタイトル */
  titleJa: string;
  /** チャプター番号 */
  chapter?: string;
  /** 追加のクラス名 */
  className?: string;
  /** 子要素 */
  children?: ReactNode;
}

/**
 * ヘッディングセクションコンポーネント
 */
const HeadingSection: React.FC<HeadingSectionProps> = ({
  titleEn,
  titleJa,
  className,
  chapter,
  children,
}) => {
  return (
    <div className={clsx('border-border border-t', className)}>
      <div className="xs:flex-row xs:justify-between xs:gap-0 flex flex-col justify-start gap-2">
        <div className="flex flex-wrap items-baseline gap-1 text-gray-800 sm:gap-2">
          <h2 className="type-md -mt-px border-t pt-2 font-serif font-bold">
            <span
              className={clsx('type-md mr-2 font-serif font-bold', {
                hidden: !chapter,
              })}
            >
              {chapter}.
            </span>
            {titleEn}
          </h2>
          <svg
            aria-hidden="true"
            aria-label="罫線"
            viewBox="0 0 16 1"
            className="group-hover:fill-hover aspect-[16/1] h-[1px] w-[16px] fill-current"
            role="img"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M16 2H0V0H16V2Z"
              className="text-gray-400"
            />
          </svg>
          <h3 className="type-md autoPhrase">{titleJa}</h3>
        </div>
        {children}
      </div>
    </div>
  );
};

export default HeadingSection;

