import clsx from 'clsx';
import React, { type ReactNode } from 'react';

type ContainerSize =
  | '4xs'
  | '3xs'
  | '2xs'
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'
  | 'full'
  | 'auto';

type ContainerElement =
  | 'div'
  | 'section'
  | 'article'
  | 'main'
  | 'aside'
  | 'header'
  | 'footer'
  | 'nav';

interface ContainerProps extends Omit<React.HTMLAttributes<HTMLElement>, 'size'> {
  /** コンテナ内に表示するコンテンツ */
  children: ReactNode;
  /** コンテナサイズ */
  size?: ContainerSize;
  /** コンテナを中央揃えにするかどうか */
  center?: boolean;
  /** 追加のCSSクラス */
  className?: string;
  /** 使用するHTML要素 */
  as?: ContainerElement;
  /** 要素のID */
  id?: string;
}

/**
 * レスポンシブ対応のコンテナコンポーネント
 */
const Container: React.FC<ContainerProps> = ({
  children,
  size = 'lg',
  center = true,
  id,
  className,
  as: Component = 'section',
  ...rest
}) => {
  const containerSizes: Record<ContainerSize, string> = {
    '4xs': 'max-w-[var(--container-4xs)] px-4',
    '3xs': 'max-w-[var(--container-3xs)] px-4',
    '2xs': 'max-w-[var(--container-2xs)] px-4',
    xs: 'max-w-[var(--container-xs)] px-6',
    sm: 'max-w-[var(--container-sm)] px-6',
    md: 'max-w-[var(--container-md)] px-6',
    lg: 'max-w-[var(--container-lg)] px-8',
    xl: 'max-w-[var(--container-xl)] px-8',
    '2xl': 'max-w-[var(--breakpoint-2xl)] px-8 4xl:px-0',
    '3xl': 'max-w-[var(--container-3xl)] px-8 4xl:px-0',
    '4xl': 'max-w-[var(--container-4xl)] px-8 4xl:px-0',
    '5xl': 'max-w-[var(--container-5xl)] px-8 4xl:px-0',
    full: 'max-w-full',
    auto: 'max-w-none',
  };

  const containerClass = containerSizes[size] || containerSizes.lg;

  return (
    <Component
      id={id}
      className={clsx(
        'relative w-full self-stretch',
        containerClass,
        center && 'mx-auto',
        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default Container;
