import clsx from 'clsx';
import type { JSX, MouseEvent, ReactNode } from 'react';
import * as Icons from './Icon';

// Textlinkコンポーネントの基本型定義
export type TextlinkType = 'text' | 'rectangle';
export type TextlinkHierarchy = 'primary' | 'secondary' | 'tertiary' | 'inactive';
export type TextlinkSize = '3xs' | '2xs' | 'xs' | 'sm' | 'atMark' | 'md' | 'lg' | 'xl' | '2xl';
export type TextlinkUnderline = 'none' | 'ppp' | 'pp' | 'p' | 'f' | 'ff' | 'fff';
export type TextlinkAs = 'anchor' | 'button';
export type TextlinkIconPosition = 'left' | 'right';

// HTML標準属性の型定義（React用）
interface BaseHTMLAttributes {
  id?: string;
  className?: string;
  title?: string;
  role?: string;
  tabIndex?: number;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-hidden'?: boolean;
  'aria-expanded'?: boolean;
  'aria-pressed'?: boolean;
  'aria-current'?: boolean | 'page' | 'step' | 'location' | 'date' | 'time';
}

// アンカー固有の属性（React用）
interface AnchorAttributes extends BaseHTMLAttributes {
  href?: string;
  target?: '_blank' | '_self' | '_parent' | '_top' | string;
  rel?: 'noopener' | 'noreferrer' | 'nofollow' | 'external' | string;
  download?: boolean | string;
  hrefLang?: string;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
}

// ボタン固有の属性（React用）
interface ButtonAttributes extends BaseHTMLAttributes {
  buttonType?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  form?: string;
  formAction?: string;
  formEncType?: string;
  formMethod?: 'get' | 'post';
  formNoValidate?: boolean;
  formTarget?: string;
  name?: string;
  value?: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

// データ属性の型定義
type DataAttributes = Record<`data-${string}`, string | number | boolean>;

// Textlinkコンポーネントの基本Props
interface BaseTextlinkProps {
  type?: TextlinkType;
  hierarchy?: TextlinkHierarchy;
  size?: TextlinkSize;
  underline?: TextlinkUnderline;
  icon?: string;
  position?: TextlinkIconPosition;
  dangerouslySetInnerHTML?: { __html: string };
  children?: ReactNode;
}

// as="anchor"時のProps
interface TextlinkAnchorProps extends BaseTextlinkProps, AnchorAttributes, DataAttributes {
  as?: 'anchor';
}

// as="button"時のProps
interface TextlinkButtonProps extends BaseTextlinkProps, ButtonAttributes, DataAttributes {
  as: 'button';
  href?: never; // buttonの場合hrefは不要
}

// 最終的なProps型（条件付き型を使用）
export type TextlinkProps = TextlinkAnchorProps | TextlinkButtonProps;

const typeStyles = {
  text: 'inline-flex font-bold hover:text-hov active:opacity-70 transition-all duration-300 font-sans',
  rectangle:
    'inline-flex font-bold hover:text-hov active:opacity-70 transition-all duration-300 font-sans',
};
const textSizeStyles = {
  '3xs': { text: 'text-3xs', icon: 'h-3 w-3', other: 'gap-1 items-center' },
  '2xs': { text: 'text-2xs', icon: 'h-3 w-3', other: 'gap-1 items-center' },
  xs: { text: 'text-xs', icon: 'h-3 w-3', other: 'gap-1 items-center' },
  sm: { text: 'text-sm', icon: 'h-3.5 w-3.5', other: 'gap-1.5 items-center' },
  atMark: {
    text: 'text-md leading-none',
    icon: 'h-3.5 w-3.5',
    other: 'gap-0.5 items-center flex',
  },
  md: { text: 'text-md', icon: 'h-4 w-4', other: 'gap-1.5 items-center' },
  lg: { text: 'text-lg', icon: 'h-5 w-5', other: 'gap-2 items-center' },
  xl: { text: 'text-xl', icon: 'h-6 w-6', other: 'gap-2 items-center' },
  '2xl': { text: 'text-2xl', icon: 'h-6 w-6', other: 'gap-2 items-center' },
};
const underlineStyles = {
  none: 'no-underline',
  ppp: 'underline underline-offset-2 decoration-bd decoration-1 hover:no-underline',
  pp: 'underline underline-offset-2 decoration-bd-a decoration-1 hover:no-underline',
  p: 'underline underline-offset-2 decoration-bd-d decoration-2 hover:no-underline',
  f: 'underline underline-offset-2 decoration-bd-a decoration-2 hover:decoration-hov',
  ff: 'underline underline-offset-4 decoration-bd-d decoration-4 hover:decoration-hov',
  fff: 'underline underline-offset-4 decoration-bd-a decoration-4 hover:decoration-hov',
};
const hierarchyStyles = {
  text: {
    primary: 'text-primary hover:text-hover active:bg-hov/50',
    secondary: 'text-secondary hover:text-hover active:bg-hov/50',
    tertiary: 'text-gray-500 hover:text-hover active:bg-hov/50',
    inactive: 'pointer-events-none opacity-50',
  },
  default: {
    primary: 'text-primary hover:text-hover active:bg-hov/50',
    secondary: 'text-secondary hover:text-hover active:bg-hov/50',
    tertiary: 'text-gray-400 hover:text-hover active:bg-hov/50',
    inactive: 'pointer-events-none opacity-50',
  },
};

const Textlink = (props: TextlinkProps): JSX.Element => {
  const {
    type = 'text',
    hierarchy = 'primary',
    size = 'md',
    underline = 'none',
    href = '',
    className = '',
    onClick,
    icon = '',
    position = 'left',
    as = 'anchor',
    dangerouslySetInnerHTML,
    children,
    ...restProps
  } = props;

  // as="button"の場合のbuttonType取得
  const buttonType = 'buttonType' in props ? props.buttonType || 'button' : 'button';
  const SelectedIcon = icon ? (Icons as any)[icon] : null;
  const { text: textClass, icon: iconClass } = textSizeStyles[size];

  const content = dangerouslySetInnerHTML ? (
    <span className={textClass} dangerouslySetInnerHTML={dangerouslySetInnerHTML} />
  ) : (
    <>
      {position === 'left' && SelectedIcon && <SelectedIcon className={iconClass + 'mr-1'} />}
      <span className={textClass}>{children}</span>
      {position === 'right' && SelectedIcon && <SelectedIcon className={iconClass + 'ml-1'} />}
    </>
  );

  const hierarchyClass =
    type === 'text' ? hierarchyStyles.text[hierarchy] : hierarchyStyles.default[hierarchy];

  const commonClassNames = clsx(
    typeStyles[type],
    underlineStyles[underline],
    hierarchyClass,
    textSizeStyles[size]['other'],
    icon && 'flex items-center gap-1',
    className,
  );

  if (as === 'button') {
    return (
      <button
        type={buttonType}
        className={commonClassNames}
        onClick={onClick as (e: MouseEvent<HTMLButtonElement>) => void}
        {...restProps}
      >
        {content}
      </button>
    );
  }

  // anchor（デフォルト）
  return (
    <a
      href={href}
      className={commonClassNames}
      onClick={onClick as (e: MouseEvent<HTMLAnchorElement>) => void}
      {...restProps}
    >
      {content}
    </a>
  );
};

export default Textlink;
