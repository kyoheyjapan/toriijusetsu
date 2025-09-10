import clsx from 'clsx';
import type { JSX, MouseEvent, ReactNode } from 'react';
import { memo, useCallback } from 'react';
import * as Icons from './Icon';

type ButtonType = 'rectangle' | 'square';
type ButtonHierarchy =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'transparent'
  | 'girls'
  | 'pirates'
  | 'breakshot';
type ButtonAs = 'anchor' | 'button' | 'buttonSubmit';
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface ButtonProps {
  type?: ButtonType;
  hierarchy?: ButtonHierarchy;
  size?: ButtonSize;
  href?: string;
  onClick?: (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  className?: string;
  icon?: string;
  as?: ButtonAs;
  disabled?: boolean;
  loading?: boolean;
  'aria-label'?: string;
  children?: ReactNode;
  target?: string;
  rel?: string;
  [key: string]: any;
}

// 共通化・簡素化したスタイル定義
const typeBase =
  'group border box-border flex items-center justify-center font-bold align-middle transition focus:outline-none';
const squareBase = 'aspect-square leading-none';

const sizeStyles: Record<ButtonType, Record<ButtonSize, string>> = {
  rectangle: {
    xs: 'h-8 px-4 text-xs',
    sm: 'h-10 px-5 text-sm',
    md: 'h-12 px-5 text-base',
    lg: 'h-14 px-6 text-lg',
    xl: 'h-16 px-8 text-xl',
  },
  square: {
    xs: 'h-8 w-8 text-xs',
    sm: 'h-10 w-10 text-sm',
    md: 'h-12 w-12 text-base',
    lg: 'h-14 w-14 text-lg',
    xl: 'h-16 w-16 text-xl',
  },
};

const hierarchyStyles = {
  primary: 'bg-primary text-white border-black/20 hover:bg-hover active:bg-hover/70',
  girls: 'bg-[#206f73] text-white border-black/20 hover:bg-hover active:bg-hover/70',
  pirates: 'bg-[#776E5C] text-white border-black/20 hover:bg-hover active:bg-hover/70',
  breakshot: 'bg-[#2d1b4e] text-white border-black/20 hover:bg-hover active:bg-hover/70',
  secondary:
    'bg-white text-primary border-primary hover:text-hover hover:bg-white active:opacity-60 hover:border-hover',
  tertiary:
    'bg-white text-txt border-border hover:text-hover hover:bg-white hover:border-hover active:opacity-60',
  transparent: 'bg-white/0 text-txt border-none hover:text-hover',
};

const iconColor = {
  primary: 'text-white',
  girls: 'text-white',
  pirates: 'text-white',
  breakshot: 'text-white',
  secondary: 'text-primary',
  tertiary: 'text-icon',
  transparent: 'text-icon',
};

const Button = memo(function Button({
  type = 'rectangle',
  hierarchy = 'primary',
  size = 'xs',
  href = '/',
  onClick,
  className,
  icon,
  as = 'anchor',
  disabled = false,
  loading = false,
  'aria-label': ariaLabel,
  children,
  ...props
}: ButtonProps): JSX.Element {
  const SelectedIcon = icon ? (Icons as any)[icon] : null;
  const sizeClass = sizeStyles[type][size] ?? sizeStyles.rectangle.xs;
  const baseClass = clsx(
    typeBase,
    type === 'square' && squareBase,
    sizeClass,
    hierarchyStyles[hierarchy],
    {
      'cursor-not-allowed opacity-50': disabled,
      relative: loading,
    },
    className,
  );

  const handleClick = useCallback(
    (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
      if (disabled || loading) {
        e.preventDefault();
        return;
      }
      onClick?.(e);
    },
    [disabled, loading, onClick],
  );

  const content = (
    <>
      {loading && (
        <span
          className={`
            absolute inset-0 flex items-center justify-center bg-white/50
          `}
        >
          <span
            className={`
              size-4 animate-spin rounded-full border-2 border-primary
              border-t-transparent
            `}
          />
        </span>
      )}
      {SelectedIcon && (
        <SelectedIcon
          className={clsx('mr-2', iconColor[hierarchy], {
            'opacity-50': disabled,
          })}
          aria-hidden="true"
        />
      )}
      <span className={clsx({ 'opacity-50': disabled })}>{children}</span>
    </>
  );

  const commonProps = {
    ...props,
    className: baseClass,
    onClick: handleClick,
    'aria-disabled': disabled,
    'aria-label': ariaLabel || (typeof children === 'string' ? children : undefined),
    'aria-busy': loading,
  };

  switch (as) {
    case 'buttonSubmit':
      return (
        <button type="submit" disabled={disabled} {...commonProps}>
          {content}
        </button>
      );
    case 'button':
      return (
        <button type="button" disabled={disabled} {...commonProps}>
          {content}
        </button>
      );
    case 'anchor':
    default:
      return (
        <a href={disabled ? '#' : href} {...commonProps}>
          {content}
        </a>
      );
  }
});

export default Button;
