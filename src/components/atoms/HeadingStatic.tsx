import clsx from 'clsx';
import { CircleIcon } from '../atoms/Icon';
import Spacer from '../atoms/Spacer';
import Textlink from '../atoms/Textlink';

// 型定義
type TextSize = '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
type Hierarchy = 'primary' | 'secondary' | 'tertiary';
type SpacerSize = '4xs' | '3xs' | '2xs';

interface HeadingProps {
  title?: string;
  more?: string;
  hierarchy?: Hierarchy;
  href?: string;
  id?: string;
  subText?: string;
  className?: string;
  classNameH3?: string;
  size?: TextSize;
}

interface HeadingPageProps {
  title?: string;
  hierarchy?: Hierarchy;
  id?: string;
  className?: string;
  size?: TextSize;
}

interface HeadingSearchResultProps {
  value?: string;
  keyword?: string;
  keyword2?: string;
  keyword3?: string;
  keyword4?: string;
  keyword5?: string;
  keyword6?: string;
  keyword7?: string;
  keyword8?: string;
  keyword9?: string;
  hierarchy?: Hierarchy;
  id?: string;
  className?: string;
  size?: TextSize;
}

interface HeadingSectionProps {
  title?: string;
  hierarchy?: Hierarchy;
  id?: string;
  className?: string;
  size?: TextSize;
}

interface HeadingStaticProps {
  title?: string;
  className?: string;
  size?: TextSize;
  lastRevisedDate?: Date;
  establishedDate?: Date;
  updateDate?: Date;
  presentDate?: Date;
}

interface HeadingContactProps {
  title?: string;
  hierarchy?: Hierarchy;
  id?: string;
  className?: string;
  size?: TextSize;
}

const textSizeStyles: Record<TextSize, string> = {
  '2xs': 'type-2xs',
  xs: 'type-xs',
  sm: 'type-sm',
  md: 'type-md',
  lg: 'type-lg',
  xl: 'type-xl',
  '2xl': 'type-2xl',
};

const subTextSizeStyles = (size: TextSize): string => {
  switch (size) {
    case 'xs':
      return 'type-2xs';
    case 'sm':
      return 'type-xs';
    case 'md':
      return 'type-xs';
    case 'lg':
      return 'type-sm';
    case 'xl':
      return 'type-md';
    case '2xl':
      return 'type-md';
    default:
      return 'type-md';
  }
};

const keywordTextSizeStyles = (size: TextSize): string => {
  switch (size) {
    case 'xs':
      return 'type-2xs';
    case 'sm':
      return 'type-xs';
    case 'md':
      return 'type-sm';
    case 'lg':
      return 'type-md';
    case 'xl':
      return 'type-lg';
    case '2xl':
      return 'type-lg';
    default:
      return 'type-lg';
  }
};

const spacerSizeStyles = (spacerSize: TextSize): SpacerSize => {
  switch (spacerSize) {
    case 'xs':
      return '4xs';
    case 'sm':
      return '4xs';
    case 'md':
      return '4xs';
    case 'lg':
      return '3xs';
    case 'xl':
      return '3xs';
    case '2xl':
      return '3xs';
    default:
      return '2xs';
  }
};

const hierarchyStyles: Record<Hierarchy, string> = {
  primary: 'text-pri',
  secondary: 'text-sec',
  tertiary: 'text-sec-l',
};

export const Heading = ({
  title,
  more,
  hierarchy = 'primary',
  href,
  id,
  subText,
  className,
  classNameH3,
  size = 'md',
}: HeadingProps): JSX.Element => {
  return (
    <div className={clsx('text-pri flex w-full flex-col items-start justify-start', className)}>
      <div id={id} className={clsx('flex justify-between font-bold', classNameH3)}>
        <h3 className={clsx(textSizeStyles[size], hierarchyStyles[hierarchy], '')}>
          {title || '見出し・大'}
        </h3>
        {more ? (
          <Textlink
            href={href || '/list/'}
            underline="ppp"
            size="xs"
            className="text-sec leading-none"
          >
            {more || 'もっと見る'}
          </Textlink>
        ) : null}
      </div>
      {subText ? (
        <>
          <Spacer size={spacerSizeStyles(size)} />
          <h4 className={clsx(subTextSizeStyles(size), 'text-normal text-txt-l truncate')}>
            {subText || '見出し・サブテキスト'}
          </h4>
        </>
      ) : null}
    </div>
  );
};
export const HeadingPage = ({
  title,
  hierarchy = 'primary',
  id,
  className,
  size = 'md',
}: HeadingPageProps): JSX.Element => {
  return (
    <div className={clsx('text-pri flex w-full flex-col items-start justify-start', className)}>
      <div
        id={id}
        className={clsx('relative flex w-full justify-center px-4 py-4 font-bold md:px-0 md:py-8')}
      >
        <CircleIcon className="absolute top-0 left-0 h-[6px] w-[6px] md:h-[8px] md:w-[8px]" />
        <CircleIcon className="absolute top-0 right-0 h-[6px] w-[6px] md:h-[8px] md:w-[8px]" />
        <h3 className={clsx(textSizeStyles[size], hierarchyStyles[hierarchy])}>
          {title || '見出し・大'}
        </h3>
        <CircleIcon className="absolute bottom-0 left-0 h-[6px] w-[6px] md:h-[8px] md:w-[8px]" />
        <CircleIcon className="absolute right-0 bottom-0 h-[6px] w-[6px] md:h-[8px] md:w-[8px]" />
      </div>
    </div>
  );
};
export const HeadingPageS = ({
  title,
  hierarchy = 'primary',
  id,
  className,
  size = 'xs',
}: HeadingPageProps): JSX.Element => {
  return (
    <div className={clsx('text-pri flex w-full flex-col items-start justify-start', className)}>
      <div
        id={id}
        className={clsx('relative flex w-full justify-center px-4 py-4 font-bold md:px-0 md:py-8')}
      >
        <CircleIcon className="absolute top-0 left-0 h-[3px] w-[3px] md:h-[6px] md:w-[6px]" />
        <CircleIcon className="absolute top-0 right-0 h-[3px] w-[3px] md:h-[6px] md:w-[6px]" />
        <h3 className={clsx(textSizeStyles[size], hierarchyStyles[hierarchy])}>
          {title || '見出し・大'}
        </h3>
        <CircleIcon className="absolute bottom-0 left-0 h-[3px] w-[3px] md:h-[6px] md:w-[6px]" />
        <CircleIcon className="absolute right-0 bottom-0 h-[3px] w-[3px] md:h-[6px] md:w-[6px]" />
      </div>
    </div>
  );
};

export const HeadingSection = ({
  title,
  hierarchy = 'primary',
  id,
  className,
  size = 'md',
}: HeadingSectionProps): JSX.Element => {
  return (
    <div className={clsx('text-pri flex w-full flex-col items-start justify-start', className)}>
      <div
        id={id}
        className={clsx(
          'border-pri font-romanCon flex w-full justify-start border-t-2 pt-6 font-semibold md:border-t-4 md:pt-10',
        )}
      >
        <h3 className={clsx(textSizeStyles[size], hierarchyStyles[hierarchy], 'tracking-wide')}>
          {title || 'Information & Topics'}
        </h3>
      </div>
    </div>
  );
};

export const HeadingSectionMin = ({
  title,
  hierarchy = 'primary',
  id,
  className,
  size = 'md',
}: HeadingSectionProps): JSX.Element => {
  return (
    <div className={clsx('text-pri flex w-full flex-col items-start justify-start', className)}>
      <div id={id} className={clsx('font-romanCon flex w-full justify-start font-semibold')}>
        <h3 className={clsx(textSizeStyles[size], hierarchyStyles[hierarchy], 'tracking-wide')}>
          {title || 'Information & Topics'}
        </h3>
      </div>
    </div>
  );
};
export const HeadingStatic = ({
  title,
  className,
  size = 'md',
  lastRevisedDate,
  establishedDate,
  updateDate,
  presentDate,
}: HeadingStaticProps): JSX.Element => {
  return (
    <div className={clsx('text-txt flex w-full flex-col items-start justify-start', className)}>
      <div className={clsx('flex w-full justify-start border-b border-gray-300 font-semibold')}>
        <h3 className={clsx(textSizeStyles[size], 'tracking-wide text-brand-500')}>
          {title || 'ページタイトル'}
        </h3>
      </div>
      {lastRevisedDate && (
        <div className="flex w-full flex-row justify-end gap-2">
          <p className="type-xs text-txt-l">
            最終改訂日：
            <time datetime={lastRevisedDate.toISOString().split('T')[0]}>
              {lastRevisedDate.toLocaleDateString('ja-JP', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </p>
        </div>
      )}
      {establishedDate && (
        <div className="flex w-full flex-row justify-end gap-2">
          <p className="type-xs text-txt-l">
            制定日：
            <time datetime={establishedDate.toISOString().split('T')[0]}>
              {establishedDate.toLocaleDateString('ja-JP', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </p>
        </div>
      )}
      {updateDate && (
        <div className="flex w-full flex-row justify-end gap-2">
          <p className="type-xs text-txt-l">
            更新日：
            <time datetime={updateDate.toISOString().split('T')[0]}>
              {updateDate.toLocaleDateString('ja-JP', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </p>
        </div>
      )}
      {presentDate && (
        <div className="flex w-full flex-row justify-end gap-2">
          <p className="type-xs text-txt-l">
            <time datetime={presentDate.toISOString().split('T')[0]}>
              {presentDate.toLocaleDateString('ja-JP', {
                year: 'numeric',
                month: 'long',
              })}
              現在
            </time>
          </p>
        </div>
      )}
    </div>
  );
};
