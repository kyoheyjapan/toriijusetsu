import clsx from 'clsx';
import React from 'react';

/**
 * ピクセル値をremに変換する関数
 * @param px - ピクセル値
 * @return rem値
 */
const rem = (px: number): string => `${px / 16}rem`;

/**
 * レスポンシブなサイズを計算する関数
 * @param minSize - 最小サイズ（px）
 * @param maxSize - 最大サイズ（px）
 * @param minWidth - 最小ビューポート幅（px）
 * @param maxWidth - 最大ビューポート幅（px）
 * @return CSS clamp関数を使用したレスポンシブサイズ
 */
const getFluidSize = (
  minSize: number,
  maxSize: number,
  minWidth: number = 640,
  maxWidth: number = 1440
): string => {
  const v = (100 * (maxSize - minSize)) / (maxWidth - minWidth);
  const r = (minWidth * maxSize - maxWidth * minSize) / (minWidth - maxWidth);
  return `clamp(${rem(minSize)}, ${v}vw + ${rem(r)}, ${rem(maxSize)})`;
};

type PredefinedSize =
  | '6xl'
  | '5xl'
  | '4xl'
  | '3xl'
  | '2xl'
  | 'xl'
  | 'lg'
  | 'ml'
  | 'md'
  | 'sm'
  | 'xs'
  | '2xs'
  | '3xs'
  | '4xs'
  | '5xs'
  | '6xs'
  | 'none';

type NumericSize = `size${number}`;
type SpacerSize = PredefinedSize | NumericSize;
type SpacerAxis = 'vertical' | 'horizontal';

// 事前定義されたサイズ（px単位）
const PREDEFINED_SIZES: Record<PredefinedSize, number> = {
  '6xl': 200,
  '5xl': 160,
  '4xl': 120,
  '3xl': 96,
  '2xl': 88,
  xl: 80,
  lg: 72,
  ml: 64,
  md: 56,
  sm: 48,
  xs: 32,
  '2xs': 24,
  '3xs': 16,
  '4xs': 12,
  '5xs': 8,
  '6xs': 4,
  none: 0,
};

interface SizeMultiplier {
  min: number;
  max: number;
}

// サイズごとの最小・最大倍率
const SIZE_MULTIPLIERS: Record<PredefinedSize, SizeMultiplier> = {
  '6xl': { min: 0.5, max: 1 },
  '5xl': { min: 0.5, max: 1 },
  '4xl': { min: 0.5, max: 1 },
  '3xl': { min: 0.5, max: 1 },
  '2xl': { min: 0.5, max: 1 },
  xl: { min: 0.5, max: 1.25 },
  lg: { min: 0.5, max: 1.25 },
  ml: { min: 0.5, max: 1.25 },
  md: { min: 0.5, max: 1.25 },
  sm: { min: 0.75, max: 1.25 },
  xs: { min: 0.75, max: 1.25 },
  '2xs': { min: 0.75, max: 1.25 },
  '3xs': { min: 0.5, max: 1 },
  '4xs': { min: 0.25, max: 1 },
  '5xs': { min: 0.25, max: 1 },
  '6xs': { min: 0.25, max: 1 },
  none: { min: 0, max: 0 },
};

// 数値サイズに基づく倍率を決定する関数
const getMultipliersForNumericSize = (size: number): SizeMultiplier => {
  if (size <= 0) return { min: 0, max: 0 };
  if (size <= 16) return { min: 0.25, max: 1 };
  if (size <= 48) return { min: 0.5, max: 1 };
  if (size <= 100) return { min: 0.5, max: 1.5 };
  if (size <= 200) return { min: 0.75, max: 1.25 };
  return { min: 1, max: 1.2 };
};

interface SizeCalculationResult extends SizeMultiplier {
  sizeValue: number;
}

/**
 * サイズ値とその倍率を計算する関数
 * @param size - サイズ指定（'lg'や'size100'など）
 * @return サイズ値と倍率を含むオブジェクト
 */
const calculateSizeAndMultipliers = (size: SpacerSize): SizeCalculationResult => {
  // 数値サイズの処理（'size100'形式）
  if (typeof size === 'string' && size.startsWith('size')) {
    const numericSize = parseInt(size.replace('size', ''), 10);
    if (isNaN(numericSize)) {
      console.warn(`Invalid size format: ${size}. Using default 'lg' size.`);
      return {
        sizeValue: PREDEFINED_SIZES.lg,
        ...SIZE_MULTIPLIERS.lg,
      };
    }
    return {
      sizeValue: numericSize,
      ...getMultipliersForNumericSize(numericSize),
    };
  }

  // 事前定義されたサイズの処理
  if (size in PREDEFINED_SIZES) {
    const predefinedSize = size as PredefinedSize;
    return {
      sizeValue: PREDEFINED_SIZES[predefinedSize],
      ...SIZE_MULTIPLIERS[predefinedSize],
    };
  }

  // 無効なサイズの場合はデフォルト値を使用
  console.warn(`Unknown size: ${size}. Using default 'lg' size.`);
  return {
    sizeValue: PREDEFINED_SIZES.lg,
    ...SIZE_MULTIPLIERS.lg,
  };
};

interface SpacerProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'size'> {
  /** 追加のCSSクラス */
  className?: string;
  /** スペースのサイズ */
  size?: SpacerSize;
  /** スペースの方向 */
  axis?: SpacerAxis;
  /** レスポンシブ計算の最小ビューポート幅 */
  minWidth?: number;
  /** レスポンシブ計算の最大ビューポート幅 */
  maxWidth?: number;
}

/**
 * スペーサーコンポーネント - レスポンシブな余白を提供します
 */
const Spacer: React.FC<SpacerProps> = ({
  className,
  size = 'lg',
  axis = 'vertical',
  minWidth = 640,
  maxWidth = 1440,
  ...delegated
}) => {
  // サイズと倍率を計算
  const {
    sizeValue,
    min: minMultiplier,
    max: maxMultiplier,
  } = calculateSizeAndMultipliers(size);

  // レスポンシブなサイズを計算
  const fluidSize = getFluidSize(
    sizeValue * minMultiplier,
    sizeValue * maxMultiplier,
    minWidth,
    maxWidth
  );

  // 軸に基づいてスタイルを設定
  const style: React.CSSProperties =
    axis === 'vertical'
      ? { width: '1px', height: fluidSize }
      : { height: '1px', width: fluidSize };

  return (
    <span className={clsx(className, 'block')} style={style} {...delegated} />
  );
};

export default Spacer;
