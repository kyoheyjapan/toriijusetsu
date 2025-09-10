import clsx from 'clsx';
import React, { memo, type CSSProperties } from 'react';

type KerningElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';

interface KerningValue {
  /** パディング値 (em) */
  p: number;
  /** マージン値 (em) */
  s: number;
}

interface KerningProps {
  /** 使用するHTML要素 */
  as?: KerningElement;
  /** 表示するテキスト */
  text: string;
  /** 文字ごとのカーニング値 */
  kerningValues: Record<number, KerningValue>;
  /** 追加のCSSクラス */
  className?: string;
  /** スクリーンリーダー用のラベル */
  'aria-label'?: string;
  /** 自動フレーズ分割を有効にするか */
  autoPhrase?: boolean;
  /** フレーズの区切り文字 */
  phraseDelimiter?: string;
}

const Kerning = memo<KerningProps>(
  ({
    as: Component = 'h3',
    text,
    kerningValues,
    className = 'text-2xl md:text-3xl xl:text-4xl',
    'aria-label': ariaLabel,
    autoPhrase = false,
    phraseDelimiter = ' ',
  }) => {
    // エラーハンドリング
    if (!text) {
      console.warn('Kerning: text prop is required');
      return null;
    }

    if (!kerningValues || typeof kerningValues !== 'object') {
      console.warn('Kerning: invalid kerningValues format');
      return <Component className={clsx('kerning', className)}>{text}</Component>;
    }

    return (
      <Component
        className={clsx('kerning text-boxes l leading-none', className, {
          'auto-phrase': autoPhrase,
        })}
        aria-label={ariaLabel || text}
      >
        {autoPhrase
          ? text.split(phraseDelimiter).map((phrase, phraseIndex) => (
              <span
                key={`phrase-${phraseIndex}`}
                className="phrase"
                style={
                  {
                    display: 'inline-block',
                    whiteSpace: 'nowrap',
                    marginRight:
                      phraseIndex !== text.split(phraseDelimiter).length - 1 ? '-0.25em' : 0,
                  } as React.CSSProperties
                }
              >
                {phrase.split('').map((char, charIndex) => {
                  const globalIndex =
                    text.split(phraseDelimiter).slice(0, phraseIndex).join('').length + charIndex;

                  const kerningStyle: React.CSSProperties = kerningValues[globalIndex]
                    ? ({
                        '--p': `${kerningValues[globalIndex].p}em`,
                        '--s': `${kerningValues[globalIndex].s}em`,
                        marginRight: `${kerningValues[globalIndex].s}em`,
                        paddingRight: `${kerningValues[globalIndex].p}em`,
                      } as React.CSSProperties)
                    : {};

                  return (
                    <span
                      key={`${char}-${charIndex}`}
                      style={kerningStyle}
                      className="character"
                      translate="no"
                      aria-hidden="true"
                    >
                      {char}
                    </span>
                  );
                })}
              </span>
            ))
          : text.split('').map((char, index) => {
              const kerningStyle: React.CSSProperties = kerningValues[index]
                ? ({
                    '--p': `${kerningValues[index].p}em`,
                    '--s': `${kerningValues[index].s}em`,
                    marginRight: `${kerningValues[index].s}em`,
                    paddingRight: `${kerningValues[index].p}em`,
                  } as React.CSSProperties)
                : {};

              return (
                <span
                  key={`${char}-${index}`}
                  style={kerningStyle}
                  className="character"
                  translate="no"
                  aria-hidden="true" // 文字単位での読み上げを防止
                >
                  {char}
                </span>
              );
            })}
      </Component>
    );
  },
);

Kerning.displayName = 'Kerning';

export default Kerning;
